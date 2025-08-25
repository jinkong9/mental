import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Festival from "./components/Festival/festival";
import Fcontent from "./components/Content/content1";
import Scontent from "./components/Content/content2";
import Tcontent from "./components/Content/content3";
import { createStackNavigator } from "@react-navigation/stack";
import Location from "./components/Location/location";
import Home from "./components/Home/home";
import ChatScreen from "./components/ChatBot/chatscreen";

const Tab = createBottomTabNavigator();
const FestivalStack = createStackNavigator();

function FestivalNavigator() {
  return (
    <FestivalStack.Navigator>
      <FestivalStack.Screen
        name="Festival"
        component={Festival}
        options={{ headerShown: false }}
      />
      <FestivalStack.Screen name="엑스포공원" component={Fcontent} />
      <FestivalStack.Screen name="한빛타워" component={Scontent} />
      <FestivalStack.Screen name="성심당" component={Tcontent} />
    </FestivalStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "HOME") {
              iconName = "home";
            } else if (route.name === "FESTIVAL") {
              iconName = "balloon-sharp";
            } else if (route.name === "LOCATION") {
              iconName = "navigate-circle";
            } else if (route.name === "CHATBOT") {
              iconName = "chatbubbles";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "black",
        })}
      >
        <Tab.Screen name="HOME" component={Home} />
        <Tab.Screen
          name="FESTIVAL"
          component={FestivalNavigator}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="LOCATION" component={Location} />
        <Tab.Screen name="CHATBOT" component={ChatScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
