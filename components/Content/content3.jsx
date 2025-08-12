import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const ThirdImg = require("../../assets/sung.png");

const info3 = {
  id: "3",
  title: "숨겨진 보석 같은 장소",
  subtitle: "DAEJEON",
  likes: "1,530",
  location: "성심당",
  image: ThirdImg,
};

const Viewcontent = () => {
  return (
    <View>
      <Image
        style={styles.viewImage}
        source={
          typeof info3.image === "string" ? { uri: info3.img } : info3.image
        }
        imageStyle={{ borderRadius: 20 }}
      ></Image>
      <Text style={styles.font}>
        <Text style={{ fontWeight: "bold" }}>제목: </Text>
        <Text>{info3.title}</Text>
        {"\n"}
        {"\n"}
        <Text style={{ fontWeight: "bold" }}>장소: </Text>
        <Text>{info3.subtitle}</Text>
        {"\n"}
        {"\n"}
        <Text style={{ fontWeight: "bold" }}>좋아요: </Text>
        <Text>{info3.likes}</Text>
      </Text>
    </View>
  );
};

export default function Tcontent() {
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
