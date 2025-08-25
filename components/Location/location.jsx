import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// 대전 지역 데이터
const DAEJEON_AREAS = [
  {
    id: "1",
    name: "대전광역시",
    category: "충청도",
    description:
      "대한민국 과학 수도, 엑스포과학공원과 대청호로 빛나는 연구·관광 도시",
  },
  {
    id: "2",
    name: "대구광역시",
    category: "경상도",
    description: "팔공산 단풍과 서문야시장에서 즐기는 먹거리 여행",
  },
  {
    id: "3",
    name: "인천광역시",
    category: "경기도",
    description: "월미도와 차이나타운, 송도 신도시의 이색적인 풍경",
  },
  {
    id: "4",
    name: "광주광역시",
    category: "전라도",
    description: '문화예술과 5·18 민주화 운동의 유산을 지닌 "빛고을"',
  },
  {
    id: "5",
    name: "부산광역시",
    category: "경상도",
    description: "해운대와 광안리 바다, 맛있는 해산물로 가득한 해양 관광도시",
  },
  {
    id: "6",
    name: "대구광역시",
    category: "대구광역시",
    description: "대한민국 영남권 중심 도시, 먹거리와 활기찬 문화의 도시",
  },
  {
    id: "7",
    name: "구미시",
    category: "경상북도",
    description: "경상북도의 산업도시, IT와 전자의 메카",
  },
  {
    id: "8",
    name: "포항시",
    category: "경상북도",
    description: "해안과 철강 산업으로 유명한 항구 도시",
  },
  {
    id: "9",
    name: "경주시",
    category: "경상북도",
    description: "신라 천년의 고도, 문화유산이 가득한 역사 도시",
  },
  {
    id: "10",
    name: "안동시",
    category: "경상북도",
    description: "전통 문화와 하회마을로 잘 알려진 고장",
  },
  {
    id: "11",
    name: "청주시",
    category: "충청북도",
    description: "충청북도의 중심 도시, 교통과 교육의 허브",
  },
  {
    id: "12",
    name: "춘천시",
    category: "강원도",
    description: "강원도의 호반의 도시, 낭만과 자연이 어우러짐",
  },
];

const POPULAR_PLACES = [
  "대전광역시",
  "서울특별시",
  "광주광역시",
  "춘천시",
  "청주시",
];

export default function Location() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAreas, setFilteredAreas] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // 검색어가 있을 때만 필터링 수행
    if (searchQuery.trim()) {
      setIsSearching(true);
      const filtered = DAEJEON_AREAS.filter(
        (area) =>
          area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          area.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          area.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAreas(filtered);
    } else {
      setIsSearching(false);
      setFilteredAreas([]);
    }
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handlePopularPlace = (place) => {
    setSearchQuery(place);
    // 검색 실행은 onChangeText에서 이미 이루어짐
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const getCategoryColor = (category) => {
    const colors = {
      구: "#4A90E2",
      명소: "#7ED321",
      맛집: "#F5A623",
      시장: "#D0021B",
      쇼핑: "#9013FE",
      도시: "#50E3C2",
    };
    return colors[category] || "#8E8E93";
  };

  const renderSearchResult = ({ item }) => (
    <TouchableOpacity style={styles.resultItem}>
      <View style={styles.resultContent}>
        <View style={styles.resultHeader}>
          <Text style={styles.resultName}>{item.name}</Text>
          <View
            style={[
              styles.categoryTag,
              { backgroundColor: getCategoryColor(item.category) },
            ]}
          >
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>
        <Text style={styles.resultDescription}>{item.description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* 상단 검색바 */}
        <View style={styles.topSearchBar}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color="#000000" />
          </TouchableOpacity>

          <View style={styles.searchInputContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#8E8E93"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="가고 싶은 곳을 입력하세요"
              value={searchQuery}
              onChangeText={handleSearch}
              placeholderTextColor="#C7C7CC"
              returnKeyType="search"
              autoFocus={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={clearSearch}
                style={styles.clearButton}
              >
                <Ionicons name="close-circle" size={18} color="#C7C7CC" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* 컨텐츠 영역 */}
        <ScrollView
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" // 키보드 관련 터치 이벤트 처리
        >
          {isSearching ? (
            // 검색 결과
            <View>
              <Text style={styles.sectionTitle}>
                검색 결과 ({filteredAreas.length}개)
              </Text>
              {filteredAreas.length > 0 ? (
                <FlatList
                  data={filteredAreas}
                  keyExtractor={(item) => item.id}
                  renderItem={renderSearchResult}
                  scrollEnabled={false} // 부모 ScrollView와 충돌 방지
                />
              ) : (
                <View style={styles.emptyContainer}>
                  <Ionicons name="search" size={48} color="#C7C7CC" />
                  <Text style={styles.emptyTitle}>검색 결과가 없습니다</Text>
                  <Text style={styles.emptyDescription}>
                    다른 키워드로 검색해보세요
                  </Text>
                </View>
              )}
            </View>
          ) : (
            // 기본 화면: 인기 장소만 표시
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>지금 가장 인기있는</Text>
              <View style={styles.tagContainer}>
                {POPULAR_PLACES.map((place, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.popularTagItem}
                    onPress={() => handlePopularPlace(place)}
                  >
                    <Text style={styles.popularTagText}>{place}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.listcon}>
                <Text style={styles.sectionTitle}>명소 정보</Text>
                {DAEJEON_AREAS.map((item, index) => (
                  <View key={item.id}>
                    <View style={styles.divider} />
                    <View style={styles.listItemContainer}>
                      <Text style={styles.listItem}>
                        <Text style={styles.listItem}>{item.name}</Text> :{" "}
                        {item.description}
                      </Text>
                    </View>
                  </View>
                ))}
                {/* 마지막 항목 아래에도 실선 추가 */}
                <View style={styles.divider} />
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  listcon: {
    marginTop: 18,
    // 예쁜 디자인으로 변경
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  keyboardView: {
    flex: 1,
  },
  // 상단 검색바
  topSearchBar: {
    height: 56,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  // 검색창 컨테이너
  searchInputContainer: {
    flex: 1,
    height: 40,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  // 컨텐츠 영역
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#8E8E93",
    marginBottom: 16,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
    marginTop: 10,
    fontWeight: "500",
  },
  // 태그 컨테이너
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  divider: {
    height: 1,
    width: 300,
    backgroundColor: "black",
    marginVertical: 4,
  },
  // 인기 장소 태그
  popularTagItem: {
    minWidth: 66,
    maxWidth: 240,
    height: 38,
    paddingHorizontal: 20,
    backgroundColor: "#F2F2F7",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  popularTagText: {
    fontSize: 14,
    color: "#1B1B1B",
    fontWeight: "500",
  },
  // 검색 결과
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  resultContent: {
    flex: 1,
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  resultName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginRight: 8,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  resultDescription: {
    fontSize: 14,
    color: "#8E8E93",
  },
  // 빈 상태
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#8E8E93",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: "#C7C7CC",
    textAlign: "center",
  },
});
