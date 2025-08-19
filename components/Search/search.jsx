import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

// 대전 지역 데이터
const DAEJEON_AREAS = [
  { id: '1', name: '유성구', category: '구', description: '온천과 과학단지로 유명' },
  { id: '2', name: '중구', category: '구', description: '대전의 중심가, 은행동 먹자골목' },
  { id: '3', name: '서구', category: '구', description: '둔산신도시, 정부청사' },
  { id: '4', name: '동구', category: '구', description: '대동하늘공원, 소제동 카페거리' },
  { id: '5', name: '대덕구', category: '구', description: '대덕연구개발특구' },
  { id: '6', name: '엑스포공원', category: '명소', description: '1993 대전엑스포 개최지' },
  { id: '7', name: '한밭수목원', category: '명소', description: '도심 속 대형 수목원' },
  { id: '8', name: '대청호', category: '명소', description: '아름다운 호수와 드라이브 코스' },
  { id: '9', name: '성심당 본점', category: '맛집', description: '대전 대표 베이커리' },
  { id: '10', name: '중앙시장', category: '시장', description: '전통 재래시장' },
  { id: '11', name: '타임월드', category: '쇼핑', description: '대전 대표 쇼핑몰' },
  { id: '12', name: '계룡산국립공원', category: '자연', description: '등산과 단풍으로 유명' },
];

const POPULAR_PLACES = [
  '엑스포공원',
  '성심당 본점', 
  '한밭수목원',
  '유성온천',
  '은행동 먹자골목'
];

const STORAGE_KEY = '@recent_searches';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAreas, setFilteredAreas] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  // 컴포넌트 마운트 시 저장된 최근 검색 기록 불러오기
  useEffect(() => {
    loadRecentSearches();
  }, []);

  // AsyncStorage에서 최근 검색 기록 불러오기
  const loadRecentSearches = async () => {
    try {
      const savedSearches = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches));
      }
    } catch (error) {
      console.error('최근 검색 기록 불러오기 실패:', error);
    }
  };

  // AsyncStorage에 최근 검색 기록 저장하기
  const saveRecentSearch = async (searchTerm) => {
    try {
      // 중복 제거 및 최신 검색어를 맨 앞에 추가
      const updatedSearches = [
        searchTerm,
        ...recentSearches.filter(item => item !== searchTerm)
      ].slice(0, 10); // 최대 10개까지만 저장

      setRecentSearches(updatedSearches);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSearches));
    } catch (error) {
      console.error('최근 검색 기록 저장 실패:', error);
    }
  };

  // 최근 검색 기록 삭제
  const clearRecentSearches = async () => {
    try {
      setRecentSearches([]);
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('최근 검색 기록 삭제 실패:', error);
    }
  };

  // 개별 검색 기록 삭제
  const removeRecentSearch = async (searchToRemove) => {
    try {
      const updatedSearches = recentSearches.filter(item => item !== searchToRemove);
      setRecentSearches(updatedSearches);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSearches));
    } catch (error) {
      console.error('검색 기록 삭제 실패:', error);
    }
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      const filtered = DAEJEON_AREAS.filter(
        area =>
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

  const handleRecentSearch = (search) => {
    setSearchQuery(search);
  };

  const handlePopularPlace = (place) => {
    setSearchQuery(place);
    saveRecentSearch(place); // 인기 장소 클릭 시에도 최근 검색에 추가
  };

  // 검색 실행 (엔터 키 또는 검색 버튼 클릭)
  const executeSearch = () => {
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery.trim());
      // 여기서 실제 검색 로직 실행
      console.log('검색 실행:', searchQuery);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  const handleBack = () => {
    // 뒤로가기 로직
    console.log('Back button pressed');
  };

  const getCategoryColor = (category) => {
    const colors = {
      '구': '#4A90E2',
      '명소': '#7ED321',
      '맛집': '#F5A623',
      '시장': '#D0021B',
      '쇼핑': '#9013FE',
      '자연': '#50E3C2',
    };
    return colors[category] || '#8E8E93';
  };

  const renderSearchResult = ({ item }) => (
    <TouchableOpacity style={styles.resultItem}>
      <View style={styles.resultContent}>
        <View style={styles.resultHeader}>
          <Text style={styles.resultName}>{item.name}</Text>
          <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(item.category) }]}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>
        <Text style={styles.resultDescription}>{item.description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
    </TouchableOpacity>
  );

  const renderRecentSearch = ({ item }) => (
    <TouchableOpacity 
      style={styles.recentItem}
      onPress={() => handleRecentSearch(item)}
    >
      <Ionicons name="time-outline" size={16} color="#8E8E93" />
      <Text style={styles.recentText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* 상단 검색바 */}
        <View style={styles.topSearchBar}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color="#000000" />
          </TouchableOpacity>
          
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="가고 싶은 곳을 입력하세요"
              value={searchQuery}
              onChangeText={handleSearch}
              onSubmitEditing={executeSearch}
              placeholderTextColor="#C7C7CC"
              returnKeyType="search"
              autoFocus={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                <Ionicons name="close-circle" size={18} color="#C7C7CC" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* 컨텐츠 영역 */}
        <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
          {isSearching ? (
            // 검색 결과
            <View>
              <Text style={styles.sectionTitle}>
                검색 결과 ({filteredAreas.length}개)
              </Text>
              {filteredAreas.length > 0 ? (
                filteredAreas.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.resultItem}>
                    <View style={styles.resultContent}>
                      <View style={styles.resultHeader}>
                        <Text style={styles.resultName}>{item.name}</Text>
                        <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(item.category) }]}>
                          <Text style={styles.categoryText}>{item.category}</Text>
                        </View>
                      </View>
                      <Text style={styles.resultDescription}>{item.description}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <Ionicons name="search" size={48} color="#C7C7CC" />
                  <Text style={styles.emptyTitle}>검색 결과가 없습니다</Text>
                  <Text style={styles.emptyDescription}>다른 키워드로 검색해보세요</Text>
                </View>
              )}
            </View>
          ) : (
            // 기본 화면
            <>
              {/* 내가 찾아 봤던 */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>내가 찾아 봤던</Text>
                  {recentSearches.length > 0 && (
                    <TouchableOpacity onPress={clearRecentSearches}>
                      <Text style={styles.moreText}>지우기</Text>
                    </TouchableOpacity>
                  )}
                </View>
                {recentSearches.length > 0 ? (
                  <View style={styles.recentScrollWrapper}>
                    <ScrollView 
                      horizontal 
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.horizontalScrollContainer}
                      style={styles.recentScrollView}
                    >
                      {recentSearches.map((search, index) => (
                        <TouchableOpacity 
                          key={index}
                          style={styles.recentTagItem}
                          onPress={() => handleRecentSearch(search)}
                        >
                          <Text style={styles.recentTagText}>{search}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                ) : (
                  <Text style={styles.noRecentText}>검색 기록이 없습니다</Text>
                )}
              </View>

              {/* 지금 가장 인기있는 */}
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
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  // 상단 검색바 (새로운 스타일)
  topSearchBar: {
    height: 56,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  // 검색창 컨테이너 (새로운 스타일)
  searchInputContainer: {
    flex: 1,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
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
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 16,
  },
  // 인기 장소
  popularItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  popularText: {
    fontSize: 16,
    color: '#000000',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 0,
  },
  moreText: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  // 태그 컨테이너
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  // 수평 스크롤 컨테이너
  horizontalScrollContainer: {
    paddingLeft: 0,
    paddingRight: 24,
  },
  // 최근 검색 스크롤 래퍼
  recentScrollWrapper: {
    marginLeft: 0,
    marginRight: -24,
  },
  recentScrollView: {
    paddingLeft: 0,
  },
  // 최근 검색 태그
  recentTagItem: {
    minWidth: 66,
    maxWidth: 240,
    height: 38,
    paddingHorizontal: 20,
    backgroundColor: '#F2F2F7',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  recentTagText: {
    fontSize: 14,
    color: '#1B1B1B',
    fontWeight: '400',
  },
  // 인기 장소 태그
  popularTagItem: {
    minWidth: 66,
    maxWidth: 240,
    height: 38,
    paddingHorizontal: 20,
    backgroundColor: '#F2F2F7',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popularTagText: {
    fontSize: 14,
    color: '#1B1B1B',
    fontWeight: '500',
  },
  noRecentText: {
    fontSize: 14,
    color: '#C7C7CC',
    textAlign: 'center',
    paddingVertical: 10,
  },
  recentText: {
    fontSize: 16,
    color: '#000000',
    marginLeft: 12,
  },
  // 검색 결과
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  resultContent: {
    flex: 1,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginRight: 8,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  resultDescription: {
    fontSize: 14,
    color: '#8E8E93',
  },
  // 빈 상태
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8E8E93',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#C7C7CC',
    textAlign: 'center',
  },
});
