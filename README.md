# COUNTRYSIDE

지역 축제와 주변 명소를 추천하고, 챗봇으로 여행 질문까지 이어갈 수 있는 Expo 기반 React Native 모바일 앱입니다.

- Repository: https://github.com/jinkong9/mental
- Stack: React 19, React Native 0.79, Expo 53, React Navigation, Axios
- Main Entry: `index.jsx`, `App.jsx`
- 담당 범위: 모바일 화면 구성, 탭/스택 내비게이션, 축제/명소 카드 UI, 챗봇 화면, API 연동

---

## 프로젝트 소개

COUNTRYSIDE는 지역 여행 정보를 모바일에서 더 쉽게 탐색할 수 있도록 만든 앱입니다. 사용자는 홈 화면에서 진행 중인 축제 정보를 확인하고, 지역 검색 화면에서 인기 장소를 둘러보며, 축제/명소 카드에서 상세 정보를 확인할 수 있습니다.

또한 CHATBOT 탭을 통해 여행 관련 질문을 입력하고 서버 응답을 받아볼 수 있어, 단순 정보 목록이 아니라 모바일 여행 탐색 흐름에 가까운 경험을 목표로 했습니다.

---

## 주요 기능

| 화면 | 기능 | 구현 파일 |
| --- | --- | --- |
| HOME | 진행 중인 축제 API 조회, 랜덤 축제 표시, LOCATION 화면 이동 | `components/Home/home.jsx` |
| LOCATION | 지역 검색 UI, 인기 장소 태그, 장소 목록 탐색 | `components/Location/location.jsx` |
| FESTIVAL | 축제/명소 카드 목록, 상세 화면 이동 | `components/Festival/festival.jsx` |
| DETAIL | 식장산, 대전 명소, 성심당 등 상세 화면 제공 | `components/Content/content1.jsx`, `content2.jsx`, `content3.jsx` |
| CHATBOT | 질문 입력, 로딩 표시, 챗봇 응답 출력, 에러 메시지 처리 | `components/ChatBot/chatscreen.jsx` |

---

## 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| App Framework | Expo 53 |
| UI | React Native 0.79 |
| Language | JavaScript |
| Navigation | React Navigation Bottom Tabs, Stack Navigator |
| API Client | Axios |
| Runtime | React 19 |

---

## 화면 구조

앱의 기본 이동 흐름은 `App.jsx`에서 관리합니다.

- `HOME`: 앱 첫 화면, 축제 정보와 주요 이동 버튼 제공
- `FESTIVAL`: 축제/명소 카드 목록과 상세 화면을 묶은 Stack Navigator
- `LOCATION`: 지역 검색과 인기 장소 탐색 화면
- `CHATBOT`: 사용자의 질문과 서버 응답을 대화형으로 표시하는 화면

`FESTIVAL` 탭 내부에는 별도의 Stack Navigator를 두어 카드 목록에서 상세 화면으로 이동할 수 있도록 구성했습니다. Bottom Tab과 Stack Navigation을 함께 사용하면서 모바일 앱에서 자주 쓰이는 화면 전환 구조를 익히는 데 초점을 두었습니다.

---

## API 연동

현재 앱은 Axios를 사용해 백엔드 API와 통신합니다.

| 화면 | 기능 | Method | Endpoint | Base URL |
| --- | --- | --- | --- | --- |
| Home | 진행 중인 축제 목록 조회 | GET | `/api/home/festivals` | `http://54.180.248.91:8080` |
| ChatBot | 챗봇 질문 전송 | POST | `/api/chatbot` | `http://54.180.248.91:8080` |
| Festival | 위치 정보 전송 | POST | `/places/set-location` | `http://localhost:8080` |

API 주소는 현재 각 컴포넌트 내부 Axios 설정에 정의되어 있습니다. 실제 배포나 협업 환경에서는 공통 API 모듈 또는 환경 변수로 분리하면 유지보수가 더 쉬워집니다.

---

## 프로젝트 구조

```text
mental/
├─ assets/                  # 앱에서 사용하는 이미지 리소스
├─ components/
│  ├─ ChatBot/              # 챗봇 화면
│  ├─ Content/              # 축제/명소 상세 화면
│  ├─ Festival/             # 축제/명소 카드 목록 화면
│  ├─ Home/                 # 홈 화면
│  └─ Location/             # 지역 검색 화면
├─ App.jsx                  # 탭/스택 내비게이션 구성
├─ index.jsx                # Expo 앱 진입점
├─ app.json                 # Expo 설정
├─ package.json             # 의존성 및 실행 스크립트
└─ README.md
```

---

## 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. Expo 개발 서버 실행

```bash
npm start
```

Expo 개발 서버가 실행되면 Expo Go 앱으로 QR 코드를 스캔하거나, 아래 명령어로 플랫폼별 실행을 할 수 있습니다.

```bash
npm run android
npm run ios
npm run web
```

---

## 구현하면서 배운 점

React Native는 React와 비슷한 컴포넌트 사고방식을 공유하지만, 실제 구현에서는 웹과 다른 부분이 많았습니다.

- `div`, `button`, `img` 대신 `View`, `TouchableOpacity`, `Image`를 사용해야 했습니다.
- CSS 파일이 아니라 `StyleSheet.create()` 기반으로 스타일을 관리했습니다.
- 웹 라우팅과 달리 Bottom Tab, Stack Navigator를 조합해 앱 화면 전환을 구성했습니다.
- Axios 요청 결과를 모바일 화면 상태와 연결하면서 비동기 데이터 흐름을 경험했습니다.
- 챗봇 화면에서는 사용자 메시지, 로딩 상태, 서버 응답, 실패 메시지를 순서대로 처리해야 했습니다.

이 프로젝트를 통해 웹 프론트엔드와 모바일 앱 프론트엔드가 비슷해 보이지만, 화면 구성 방식과 사용자 흐름 설계에서는 다른 감각이 필요하다는 점을 배웠습니다.

---

## 개발 메모

- 일부 API 주소가 컴포넌트 내부에 직접 작성되어 있어, 추후 공통 API 클라이언트로 분리하는 것이 좋습니다.
- `Festival` 화면의 로컬 서버 주소와 `Home`, `ChatBot` 화면의 배포 서버 주소가 다르므로 실행 환경에 맞게 확인이 필요합니다.
- 일부 화면 문자열이 깨져 보이는 경우 파일 인코딩을 UTF-8로 맞춰 확인해야 합니다.
- 현재 `package.json`에는 테스트 스크립트가 없으므로, 기능 검증은 Expo 실행 후 화면 단위로 확인하는 방식이 필요합니다.
