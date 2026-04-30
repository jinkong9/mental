# COUNTRYSIDE

지역 축제와 주변 명소를 추천해 주는 Expo 기반 React Native 앱입니다. 사용자는 관심 지역을 검색하고, 대전 주요 명소와 축제 정보를 카드 형태로 확인하며, 챗봇을 통해 여행 관련 질문을 할 수 있습니다.

## 주요 기능

- 홈 화면에서 진행 중인 축제 정보를 API로 조회
- 지역 검색 및 인기 장소 태그 제공
- 축제/명소 카드 목록과 상세 화면 제공
- 하단 탭 내비게이션으로 HOME, FESTIVAL, LOCATION, CHATBOT 이동
- 챗봇 API를 통한 여행 질문 응답

## 기술 스택

- React 19
- React Native 0.79
- Expo 53
- React Navigation
- Axios
- Expo Vector Icons

## 프로젝트 구조

```text
mental/
├─ assets/                  # 앱에서 사용하는 이미지 리소스
├─ components/
│  ├─ ChatBot/              # 챗봇 화면
│  ├─ Content/              # 축제/명소 상세 화면
│  ├─ Festival/             # 축제 카드 목록 화면
│  ├─ Home/                 # 홈 화면
│  └─ Location/             # 지역 검색 화면
├─ App.jsx                  # 탭/스택 내비게이션 구성
├─ index.jsx                # Expo 앱 진입점
├─ app.json                 # Expo 설정
└─ package.json             # 의존성 및 실행 스크립트
```

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm start
```

Expo 개발 서버가 실행되면 Expo Go 앱으로 QR 코드를 스캔하거나, 아래 명령어로 플랫폼별 실행을 할 수 있습니다.

```bash
npm run android
npm run ios
npm run web
```

## API 연동

현재 앱은 Axios를 사용해 백엔드 API와 통신합니다.

| 화면 | 기능 | 엔드포인트 |
| --- | --- | --- |
| Home | 축제 목록 조회 | `GET /api/home/festivals` |
| ChatBot | 챗봇 질문 전송 | `POST /api/chatbot` |
| Festival | 위치 정보 전송 | `POST /places/set-location` |

API 서버 주소는 각 컴포넌트의 Axios 설정에 정의되어 있습니다.

- 배포 서버: `http://54.180.248.91:8080`
- 로컬 서버: `http://localhost:8080`

## 개발 메모

- 앱의 메인 화면 구성은 [App.jsx](./App.jsx)에서 확인할 수 있습니다.
- 화면별 UI와 상태 관리는 `components/` 하위 폴더에 분리되어 있습니다.
- Expo 설정의 아이콘/스플래시 이미지 경로와 실제 `assets/` 파일 구성이 다를 수 있으니 배포 전 확인이 필요합니다.
- 일부 소스 파일의 한글 문자열이 깨져 보이는 경우 파일 인코딩을 UTF-8로 맞춘 뒤 확인하세요.
