import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const kkoomImage = require("../../assets/kom.png");
const han = require("../../assets/han.png");
const sung = require("../../assets/sung.png");

const { width } = Dimensions.get("window");
const card = [
  {
    id: "1",
    title: "홍보문구 도심을 누비다",
    subtitle: "DAEJEON",
    likes: "1,530",
    location: "엑스포타워",
    image: kkoomImage,
    ScreenName: "First",
  },
  {
    id: "2",
    title: "아름다운 도시의 야경",
    subtitle: "DAEJEON",
    likes: "1,530",
    location: "한빛타워",
    image: han,
    ScreenName: "Second",
  },
  {
    id: "3",
    title: "숨겨진 보석 같은 장소",
    subtitle: "DAEJEON",
    likes: "1,530",
    location: "성심당",
    image: sung,
    ScreenName: "Third",
  },
];

const Header = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerIcon}>
        <Ionicons name="menu-outline" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>여행지 탐색</Text>
      <TouchableOpacity style={styles.headerIcon}>
        <View style={styles.circleIcon}></View>
      </TouchableOpacity>
    </View>
  );
};
const DatePickerAndMap = () => {
  return (
    <View style={styles.dateMapContainer}>
      <TouchableOpacity style={styles.datePickerButton}>
        <Ionicons
          name="calendar-outline"
          size={20}
          color="#000"
          style={styles.iconMargin}
        />
        <View>
          <Text style={styles.datePickerLabel}>대전 여행 날짜</Text>
          <Text style={styles.datePickerText}>2025.08.27 - 2025.08.28</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.mapButton}>
        <Ionicons name="map-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const ContentCard = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate(item.ScreenName, { item: item })}
    >
      <ImageBackground
        source={
          typeof item.image === "string" ? { uri: item.image } : item.image
        }
        style={styles.cardImage}
        imageStyle={{ borderRadius: 20 }}
      >
        <TouchableOpacity style={styles.likeButton}>
          <Ionicons name="heart" size={24} color="red" />
        </TouchableOpacity>

        <View style={styles.cardTextContainer}>
          <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={styles.cardInfoRow}>
            <Ionicons
              name="heart"
              size={16}
              color="#fff"
              style={styles.iconMarginRight}
            />
            <Text style={styles.cardInfoText}>{item.likes}</Text>
            <Ionicons
              name="location"
              size={16}
              color="#fff"
              style={styles.iconMarginRight}
            />
            <Text style={styles.cardInfoText}>{item.location}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default function Festival({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <DatePickerAndMap />
        {card.map((item) => (
          <ContentCard key={item.id} item={item} navigation={navigation} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerIcon: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  circleIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#ccc",
    borderRadius: 12,
  },
  dateMapContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  datePickerButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
  },
  datePickerLabel: {
    fontSize: 12,
    color: "#666",
  },
  datePickerText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  mapButton: {
    width: 50,
    height: 50,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    width: width * 0.9,
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: width * 0.9 * 1.2,
    justifyContent: "space-between",
    padding: 1.0,
    borderRadius: 22,
    overflow: "hidden",
  },
  likeButton: {
    alignSelf: "flex-start",
    padding: 10,
    overflow: "hidden",
  },
  cardTextContainer: {
    backgroundColor: "rgba(0,0,0,0.3)", // 텍스트 가독성을 위한 투명한 오버레이
    borderRadius: 10,
    padding: 10,
  },
  cardSubtitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 4,
  },
  cardInfoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardInfoText: {
    color: "#fff",
    fontSize: 14,
    marginRight: 16,
  },
  iconMargin: {
    marginRight: 8,
  },
  iconMarginRight: {
    marginRight: 4,
  },
});
