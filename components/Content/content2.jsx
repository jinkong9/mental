import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const SecondImg = require("../../assets/han.png");

const info2 = {
  id: "2",
  title: "아름다운 도시의 야경",
  subtitle: "DAEJEON",
  likes: "1,530",
  location: "한빛타워",
  image: SecondImg,
};

const Viewcontent = () => {
  return (
    <View>
      <Image
        style={styles.viewImage}
        source={
          typeof info2.image === "string" ? { uri: info2.img } : info2.image
        }
        imageStyle={{ borderRadius: 20 }}
      ></Image>
      <Text style={styles.font}>
        <Text style={{ fontWeight: "bold" }}>제목: </Text>
        <Text>{info2.title}</Text>
        {"\n"}
        {"\n"}
        <Text style={{ fontWeight: "bold" }}>장소: </Text>
        <Text>{info2.subtitle}</Text>
        {"\n"}
        {"\n"}
        <Text style={{ fontWeight: "bold" }}>좋아요: </Text>
        <Text>{info2.likes}</Text>
      </Text>
    </View>
  );
};

export default function Scontent() {
  return <Viewcontent />;
}

const styles = StyleSheet.create({
  viewImage: {
    width: "100%",
    height: "80%",
  },
  font: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 10,
    fontSize: 17,
    textAlign: "left",
  },
});
