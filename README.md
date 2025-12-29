# React Native SNS 앱

React Native와 Expo를 사용한 간단한 SNS 피드 애플리케이션입니다.

## 기능

- **피드 화면**: 게시물 목록을 보여주는 메인 화면
- **게시물 작성**: 카메라/갤러리에서 사진 추가 및 위치 정보 포함 가능
- **프로필 화면**: 사용자 통계 및 활동 정보
- **로컬 저장소**: AsyncStorage를 사용한 데이터 영구 저장

## 기술 스택

- **Framework**: Expo (SDK 54)
- **Language**: TypeScript
- **UI Library**: React Native Paper (Material Design)
- **Navigation**: React Navigation v7
- **State Management**: React Context API
- **Storage**: AsyncStorage
- **Testing**: Jest + React Native Testing Library

## 프로젝트 구조

```
src/
├── components/       # 재사용 가능한 컴포넌트
│   ├── PostCard.tsx
│   └── __tests__/   # 컴포넌트 테스트
├── screens/         # 화면 컴포넌트
│   ├── FeedScreen.tsx
│   ├── CreatePostScreen.tsx
│   └── ProfileScreen.tsx
├── navigation/      # 네비게이션 설정
│   ├── RootNavigator.tsx
│   └── MainTabs.tsx
├── contexts/        # React Context
│   └── PostContext.tsx
└── types/          # TypeScript 타입 정의
    ├── post.ts
    └── navigation.ts
```

## 설치 및 실행

### 사전 요구사항

- Node.js (v18 이상)
- npm 또는 yarn
- Expo Go 앱 (모바일 테스트용)

### 설치

```bash
npm install
```

### 실행

```bash
# 개발 서버 시작
npm start

# Android 에뮬레이터/실기기에서 실행
npm run android

# iOS 시뮬레이터에서 실행 (macOS만 가능)
npm run ios

# 웹 브라우저에서 실행
npm run web
```

### 테스트

```bash
# 모든 테스트 실행
npm test

# Watch 모드로 테스트 실행
npm run test:watch

# 코드 커버리지 확인
npm run test:coverage
```

## 개발 가이드

### 새로운 화면 추가하기

1. `src/screens/` 에 새로운 화면 컴포넌트 생성
2. `src/types/navigation.ts` 에 화면 파라미터 타입 추가
3. `src/navigation/` 의 적절한 네비게이터에 화면 등록

### 새로운 기능 추가하기

1. 필요한 타입을 `src/types/` 에 정의
2. Context가 필요한 경우 `src/contexts/` 에 생성
3. 컴포넌트를 `src/components/` 또는 `src/screens/` 에 구현
4. 테스트를 `__tests__/` 디렉토리에 작성

## 앱 빌드

### Android APK 빌드

```bash
# EAS 빌드 (권장)
npx eas build --platform android

# 로컬 빌드
npx expo prebuild
cd android && ./gradlew assembleRelease
```

### iOS IPA 빌드 (macOS만 가능)

```bash
# EAS 빌드 (권장)
npx eas build --platform ios

# 로컬 빌드
npx expo prebuild
cd ios && xcodebuild
```

## 권한

앱은 다음 권한을 요청합니다:

- **카메라**: 게시물에 사진 촬영
- **갤러리**: 게시물에 기존 사진 추가
- **위치**: 게시물에 위치 정보 추가

## 학습 포인트

이 프로젝트를 통해 다음을 배울 수 있습니다:

1. **React Native 기초**: 컴포넌트, 스타일링, 네이티브 API
2. **네비게이션**: Stack 및 Tab 네비게이션 구현
3. **상태 관리**: Context API를 사용한 전역 상태 관리
4. **네이티브 기능**: 카메라, 위치, 저장소 접근
5. **TypeScript**: 타입 안전성을 위한 타입 정의
6. **테스트**: Jest를 사용한 단위 테스트

## 다음 단계

- [ ] 사용자 인증 추가
- [ ] 백엔드 API 연동
- [ ] 댓글 기능 구현
- [ ] 실시간 업데이트 (WebSocket)
- [ ] 푸시 알림
- [ ] 이미지 최적화 및 캐싱
- [ ] E2E 테스트 추가 (Maestro 또는 Detox)

## 라이센스

MIT
