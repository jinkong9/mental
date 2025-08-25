import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const firstImg = require("../../assets/kkom.png");
const k = require("../../assets/꿈.png");
const l = require("../../assets/꿈2.png");

const info1 = {
  id: "1",
  title: "대전의 마스코트 꿈돌이",
  subtitle: "DAEJEON",
  likes: "1,530",
  location: "엑스포공원",
  image: l,
};

const Viewcontent = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.viewImage}
        source={
          typeof info1.image === "string" ? { uri: info1.image } : info1.image
        }
        imageStyle={{ borderRadius: 20 }}
      ></Image>
      <View>
        <Text style={styles.title}>{info1.title}</Text>
      </View>
      <View>
        <ScrollView horizontal={true} style={styles.scrollView}>
          <View style={styles.box}>
            <View style={styles.contentRow}>
              <Ionicons
                name="cellular-outline"
                size={20}
                color="#333"
                style={styles.icon}
              />
              <Text style={styles.text}>방문수 : 2,125</Text>
            </View>
          </View>
          <View style={styles.box}>
            <View style={styles.contentRow}>
              <Ionicons
                style={styles.icon}
                name="heart"
                color="#333"
                size={20}
              ></Ionicons>
              <Text style={styles.text}> 좋아요 수 : {info1.likes}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <View style={styles.contentRow}>
              <Ionicons
                style={styles.icon}
                color="#333"
                name="location"
                size={20}
              ></Ionicons>
              <Text style={styles.text}>
                {info1.location},{info1.subtitle}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default function Fcontent() {
  return <Viewcontent />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "flex-start",
  },
  viewImage: {
    width: "80%",
    height: "50%",
    borderRadius: 50,
    marginTop: 40,
    marginBottom: 10,
    // resizeMode: "contain",
    // aspectRatio: 1,
  },
  slide: {
    flex: 1,
    paddingTop: 50,
  },
  box: {
    width: 200,
    height: 150,
    backgroundColor: "#cbcdce",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  contentRow: {
    flexDirection: "col",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    flexWrap: "wrap",
  },
  icon: {
    justifyContent: "flex-start",
    alignContent: "flex-start",
    width: 20,
  },
  scrollView: {
    paddingVertical: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  font: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 10,
    fontSize: 17,
    textAlign: "left",
  },
});
