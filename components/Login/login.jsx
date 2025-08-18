import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';

export default function App() {
  // 폰트 로드 (예시: 'Spoqa Han Sans Neo' 폰트 사용)
  const [fontsLoaded] = useFonts({
    'SpoqaHanSansNeo-Bold': require('./assets/fonts/SpoqaHanSansNeo-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // 폰트 로딩 중에는 아무것도 렌더링하지 않음
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.homeText}>홈</Text>
        <Image
          source={require('./assets/ai_robot_korean.png')} // 갓을 쓴 AI 봇 이미지 경로
          style={styles.robotImage}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>내 손안의 AI 지역 가이드</Text>
          <Text style={styles.subtitle}>
            AI가 찾아주는 우리 동네의 숨겨진 명소와{' '}
            {'\n'}
            맛집, 이벤트들을 만나보세요.
          </Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>시작하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6EBF5', // 파스텔 톤 푸른색 (단청 색상 참고)
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  homeText: {
    position: 'absolute',
    top: 10,
    left: 20,
    fontSize: 16,
    color: '#333',
  },
  robotImage: {
    width: 300,
    height: 300,
    marginBottom: 30,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    fontFamily: 'SpoqaHanSansNeo-Bold',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#4682B4', // 청색 계열
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});