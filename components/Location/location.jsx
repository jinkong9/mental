import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const attractions = [
  {
    id: "1",
    name: "남산타워",
    description: "서울 전경을 한눈에 볼 수 있는 전망대",
    image: "https://picsum.photos/200/150?random=1",
  },
  {
    id: "2",
    name: "경복궁",
    description: "조선시대의 역사와 건축을 느낄 수 있는 궁궐",
    image: "https://picsum.photos/200/150?random=2",
  },
  {
    id: "3",
    name: "부산 해운대",
    description: "한국에서 가장 유명한 해변 중 하나",
    image: "https://picsum.photos/200/150?random=3",
  },
];

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏙️ 지역 명소 안내</Text>
      <FlatList
        data={attractions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>설정 화면</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="홈" component={HomeScreen} />
        <Tab.Screen name="설정" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
  },
  cardContent: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
});
