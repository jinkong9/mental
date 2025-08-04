import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Festival from "./components/Festival/festival";
import Login from "./components/Login/login";
import ChatBot from "./components/ChatBot/chatbot";

function GoHome() {
  return (
    <View style={styles.container}>
      <Text>HOME</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

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
            } else if (route.name === "LOGIN") {
              iconName = "log-in";
            } else if (route.name === "CHATBOT") {
              iconName = "chatbubbles";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "black",
        })}
      >
        <Tab.Screen name="HOME" component={GoHome} />
        <Tab.Screen name="FESTIVAL" component={Festival} />
        <Tab.Screen name="LOGIN" component={Login} />
        <Tab.Screen name="CHATBOT" component={ChatBot} />
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
