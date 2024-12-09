import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import Colours from "../utils/Colours";
const { width, height } = Dimensions.get("window");

export const BigLeaderboardCard = ({ user }) => {
  const [cardStyle, setCardStyle] = useState({});
  useEffect(() => {
    if (user.user_id) {
      setCardStyle(BigLeaderboard.leaderboardCard);
    } else {
      setCardStyle(BigLeaderboard.miniLeaderboardCard);
    }
  }, [user]);

  return (
    <View style={BigLeaderboard.cardStyle}>
      <View style={BigLeaderboard.rowContainer}>
        <Text style={BigLeaderboard.cardTextUser}>User Name:</Text>
        <Text style={BigLeaderboard.cardTextUser}>{user.username}</Text>
      </View>

      <View style={BigLeaderboard.rowContainer}>
        <Text style={BigLeaderboard.cardTextPoints}>Pixels:</Text>
        <Text style={BigLeaderboard.cardTextPoints}>{user.points}</Text>
      </View>
    </View>
  );
};

export const BigLeaderboard = StyleSheet.create({
  leaderboardPageContainer: {
    alignItems: "center",
  },
  header: {
    width: width * 0.8,
    height: height * 0.08,
    resizeMode: "contain",
  },
  cardStyle: {
    margin: 6,
    width: 326,
    backgroundColor: Colours.GREY,
    borderRadius: 150,
    shadowColor: Colours.AQUA_BLUE,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    height: 70,
    justifyContent: "center",
    alignItems: "start",
  },
  //actual background
  leaderboardListContainer: {
    alignItems: "center",
    borderRadius: 3,
    width: 350,
    gap: 100,
    position: "centre",
    backgroundColor: Colours.PURPLEBLUE,
  },
  leaderboardCard: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    paddingTop: 5,
    borderWidth: 1,
    borderColor: Colours.GREY,
    borderBottomColor: "#c0e3e0",
    paddingBottom: 100,
  },
  cardTextPoints: {
    color: Colours.AQUA_BLUE,
    fontSize: 18,
    justifyContent: "space-between",
    margin: 2,
    fontWeight: "bold",
    padding: 5,
  },
  cardTextUser: {
    color: Colours.AQUA_BLUE,
    fontSize: 20,
    justifyContent: "space-between",
    margin: 2,
    fontWeight: "bold",
    padding: 5,
  },
  miniLeaderboardCard: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    borderWidth: 1,
    borderBottomColor: "#c0e3e0",
    borderColor: Colours.PURPLEBLUE,
  },
  rowContainer: {
    flexDirection: "row",
    marginBottom: 0.6,
    padding: 0.2,
    paddingLeft: 15,
  },
});
