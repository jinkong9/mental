import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useFonts } from "expo-font";
import KOM from "../../assets/robot.png";
import axios from "axios";

export default function Login({ navigation }) {
  const [data, setData] = useState([]);

  const api = axios.create({
    baseURL: "http://54.180.248.91:8080",
    // withCredentials: true,
  });

  const homedata = async (e) => {
    try {
      const res = await api.get("/api/home/festivals");
      console.log("성공", res.data);
      setData(res.data.festivals);
    } catch (err) {
      console.log("err", err);
    }
  };

  const fetchdata = useEffect(() => {
    homedata();
  }, []);

  const randomFestival =
    data.length > 0
      ? data[Math.floor(Math.random() * data.length)]
      : "축제 정보가 없습니다.";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={KOM} style={styles.robotImage} resizeMode="contain" />
        <View style={styles.textContainer}>
          <Text style={styles.title}>내 손안의 AI 지역 가이드</Text>
          <Text style={styles.subtitle}>
            AI가 찾아주는 우리 동네의 숨겨진 명소와 {"\n"}
            맛집, 이벤트들을 만나보세요.
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("FESTIVAL")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>시작하기</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.apitext}>
            현재 진행중인 축제 : {randomFestival}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", // 파스텔 톤 푸른색 (단청 색상 참고)
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  robotImage: {
    width: 350,
    height: 350,
    marginBottom: 30,
    borderRadius: 50,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    lineHeight: 24,
  },
  apitext: {
    marginTop: 10,
    fontSize: 20,
    textAlign: "center",
    color: "#333",
    lineHeight: 24,
    fontFamily: "bold",
  },
  button: {
    backgroundColor: "#4682B4", // 청색 계열
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
