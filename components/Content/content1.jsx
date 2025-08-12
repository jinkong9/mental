import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const firstImg = require("../../assets/kom.png");

const info1 = {
  id: "1",
  title: "홍보문구 도심을 누비다",
  subtitle: "DAEJEON",
  likes: "1,530",
  location: "엑스포타워",
  image: firstImg,
};

const Viewcontent = () => {
  return (
    <View>
      <Image
        style={styles.viewImage}
        source={
          typeof info1.image === "string" ? { uri: info1.img } : info1.image
        }
        imageStyle={{ borderRadius: 20 }}
      ></Image>
      <Text style={styles.font}>
        <Text style={{ fontWeight: "bold" }}>제목: </Text>
        <Text>{info1.title}</Text>
        {"\n"}
        {"\n"}
        <Text style={{ fontWeight: "bold" }}>장소: </Text>
        <Text>{info1.subtitle}</Text>
        {"\n"}
        {"\n"}
        <Text style={{ fontWeight: "bold" }}>좋아요: </Text>
        <Text>{info1.likes}</Text>
      </Text>
    </View>
  );
};

export default function Fcontent() {
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
