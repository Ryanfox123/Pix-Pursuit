import React, { useContext } from "react";
import { useState, useEffect } from "react";
import MapView from "react-native-maps";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Colours from "../utils/Colours";
import { getLocation, getTrackedLocation } from "../utils/loaction";
import { useNavigation } from "@react-navigation/native";
import { PursuitOverlay } from "./PursuitOverlay";
import MapViewDirections from "react-native-maps-directions";
import { getCenter } from "geolib";
import { UserContext } from "../context/UserContext";
import { getPursuitbyPursuitID } from "../api";

export const MapViewer = ({ setPursuitImage }) => {
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({});
  const [coordinates, setCoordinates] = useState({
    random_lat: 0,
    random_long: 0,
  });
  const [trackedLocation, setTrackedLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [key, setKey] = useState(1);
  const { user } = useContext(UserContext);

  const navigation = useNavigation();

  useEffect(() => {
    let watchID = null;
    getTrackedLocation(setTrackedLocation).then((subscription) => {
      watchID = subscription;
    });
    return () => {
      if (watchID) {
        watchID.remove();
      }
    };
  }, []);

  useEffect(() => {
    getPursuitbyPursuitID(user.currentPursuit.pursuit_id)
      .then((res) => {
        const fetchedCoordinates = {
          random_lat: res.random_lat,
          random_long: res.random_long,
          difficulty: res.difficulty,
        };
        setPursuitImage(res.image);
        setCoordinates(fetchedCoordinates);
      })
      .catch((err) => {});
    getLocation(setLocation);
    setLoading(false);
  }, [user]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        trackedLocation={trackedLocation}
        region={region}
        key={key}
      >
        <TouchableOpacity onPress={() => setKey((currKey) => currKey * -1)}>
          <Image
            source={require("../../assets/center-map.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        {!loading ? (
          <MapViewDirections
            origin={trackedLocation}
            destination={{
              latitude: coordinates.random_lat,
              longitude: coordinates.random_long,
            }}
            onReady={() => {
              const { latitude, longitude } = getCenter([
                {
                  latitude: trackedLocation.latitude,
                  longitude: trackedLocation.longitude,
                },
                {
                  latitude: coordinates.random_lat,
                  longitude: coordinates.random_long,
                },
              ]);
              setRegion({
                latitude,
                longitude,
                latitudeDelta:
                  Math.abs(coordinates.random_lat - trackedLocation.latitude) +
                  0.04,
                longitudeDelta:
                  Math.abs(
                    coordinates.random_long - trackedLocation.longitude
                  ) + 0.04,
              });
            }}
            onError={(err) => {}}
            resetOnChange={false}
            apikey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor={Colours.RED}
          />
        ) : null}
        <PursuitOverlay
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          setLoading={setLoading}
          setPursuitImage={setPursuitImage}
        />
      </MapView>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    borderColor: "white",
  },
  infoContainer: {
    backgroundColor: "white",
    borderColor: "white",
  },
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
    gap: 20,
    width: "80%",
    borderRadius: 10,
    padding: 5,
    borderColor: "#D9D9D9",
    borderWidth: 2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: Colours.AQUA_BLUE,
    marginHorizontal: "auto",
  },
  image: {
    width: width * 0.08,
    height: width * 0.08,
  },
});
