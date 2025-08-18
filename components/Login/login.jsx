import React from "react";
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

// const start = ({navigation})=>{
//   <TouchableOpacity
//   onPress={()=>navigation.navigate()}
//   ></TouchableOpacity>
// }

export default function Login({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
          source={KOM} // 갓을 쓴 AI 봇 이미지 경로
          style={styles.robotImage}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>내 손안의 AI 지역 가이드</Text>
          <Text style={styles.subtitle}>
            AI가 찾아주는 우리 동네의 숨겨진 명소와 {"\n"}
            맛집, 이벤트들을 만나보세요.
            {/* 이부분 API연결해서 랜덤축제 */}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("FESTIVAL")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>시작하기</Text>
        </TouchableOpacity>
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
