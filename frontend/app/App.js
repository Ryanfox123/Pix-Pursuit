import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import Leaderboard from "./screens/Leaderboard";
import Icon from "react-native-vector-icons/AntDesign";
import { createStackNavigator } from "@react-navigation/stack";
import TermsScreen from "./screens/TermsScreen";
import { EmptyScreen } from "./screens/EmptyScreen";
import Header from "./components/Header";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { ChoosePursuitScreen } from "./screens/ChoosePursuitsScreen";
import CreatePursuitScreen from "./screens/CreatePursuitScreen";
import CameraScreen from "./screens/CameraScreen";
import { PhotoProvider } from "./context/Photo";
import { UserProvider } from "./context/UserContext";
import PursuitCompletedScreen from "./screens/PursuitCompletedScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ConfirmLogout from "./components/ConfirmLogout";
import { LogoutOutlined } from "@ant-design/icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabBarIcon = ({ name, color }) => {
  return <Icon name={name} size={24} color={color} />;
};

const screenOptions = (route, color) => {
  let iconName;
  switch (route.name) {
    case "Home":
      iconName = "home";
      break;
    case "Leaderboard":
      iconName = "Trophy";
      break;
    case "Log Out":
      iconName = "logout";
      break;
    default:
      iconName = "home";
      break;
  }
  return <TabBarIcon name={iconName} color={color} />;
};

const NavTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      options={{ header: () => <Header /> }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
      })}
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "#d9d9d9",
        style: {
          borderTopColor: "#66666666",
          backgroundColor: "transparent",
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Log Out"
        component={ConfirmLogout}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <PhotoProvider>
        <UserProvider>
          <Stack.Navigator
            initialRouteName="Terms"
            screenOptions={{
              headerShown: true,
            }}
          >
            <Stack.Screen
              name="Terms"
              component={TermsScreen}
              options={{
                gestureEnabled: false,
                header: () => <Header />,
              }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: true,
                gestureEnabled: false,
                header: () => <Header />,
              }}
            />
            <Stack.Screen
              name="ChoosePursuits"
              component={ChoosePursuitScreen}
              options={{
                headerShown: true,

                header: () => <Header />,
              }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{
                headerShown: true,
                gestureEnabled: false,
                header: () => <Header />,
              }}
            />
            <Stack.Screen
              name="Home"
              component={NavTab}
              options={{
                gestureEnabled: false,
                header: () => <Header />,
              }}
            />
            <Stack.Screen
              name="CreatePursuit"
              component={CreatePursuitScreen}
              options={{
                header: () => <Header />,
              }}
            />
            <Stack.Screen
              name="Camera"
              component={CameraScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Completed"
              component={PursuitCompletedScreen}
              options={{
                header: () => <Header />,
              }}
            />
            <Stack.Screen
              name="LogOut"
              component={ConfirmLogout}
              options={{
                header: () => <Header />,
              }}
            />
            <Stack.Screen name="Settings" component={EmptyScreen} />
          </Stack.Navigator>
        </UserProvider>
      </PhotoProvider>
    </NavigationContainer>
  );
}

export default App;
