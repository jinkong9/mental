import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Festival from "./components/Festival/festival";
import Login from "./components/Login/login";
import ChatBot from "./components/ChatBot/chatbot";
import Fcontent from "./components/Content/content1";
import Scontent from "./components/Content/content2";
import Tcontent from "./components/Content/content3";
import { createStackNavigator } from "@react-navigation/stack";

function GoHome() {
  return (
    <View style={styles.container}>
      <Text>HOME</Text>
    </View>
  );
}

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
      <FestivalStack.Screen name="First" component={Fcontent} />
      <FestivalStack.Screen name="Second" component={Scontent} />
      <FestivalStack.Screen name="Third" component={Tcontent} />
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
        <Tab.Screen
          name="FESTIVAL"
          component={FestivalNavigator}
          options={{ headerShown: false }}
        />
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
