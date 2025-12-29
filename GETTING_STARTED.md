# 시작하기 가이드

React Native SNS 앱을 처음 실행하는 분들을 위한 단계별 가이드입니다.

## 1단계: 개발 환경 준비

### Node.js 설치 확인
```bash
node --version  # v18 이상이어야 합니다
npm --version
```

### Expo Go 앱 설치
모바일 기기에서 테스트하려면:
- [Android용 Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent)
- [iOS용 Expo Go](https://apps.apple.com/app/expo-go/id982107779)

## 2단계: 프로젝트 설정

```bash
# 의존성 설치 (이미 완료됨)
npm install

# 개발 서버 시작
npm start
```

## 3단계: 앱 실행

개발 서버가 시작되면 QR 코드가 표시됩니다:

### 모바일 기기에서 실행
1. Expo Go 앱을 실행
2. QR 코드를 스캔
3. 앱이 로드될 때까지 대기

### 에뮬레이터/시뮬레이터에서 실행
```bash
# Android 에뮬레이터 (Android Studio 설치 필요)
npm run android

# iOS 시뮬레이터 (macOS + Xcode 필요)
npm run ios

# 웹 브라우저
npm run web
```

## 4단계: 기능 테스트

### 게시물 작성하기
1. 피드 화면에서 우측 하단의 + 버튼 클릭
2. 게시물 내용 입력
3. (선택) 갤러리 버튼을 눌러 사진 추가
4. (선택) 카메라 버튼을 눌러 사진 촬영
5. (선택) 위치 버튼을 눌러 현재 위치 추가
6. "게시하기" 버튼 클릭

### 권한 허용
처음 실행 시 다음 권한을 요청할 수 있습니다:
- 카메라 접근 권한
- 사진 라이브러리 접근 권한
- 위치 정보 접근 권한

모든 권한은 선택사항이며, 거부해도 앱의 기본 기능은 사용 가능합니다.

## 5단계: 코드 수정 및 핫 리로드

개발 모드에서는 코드를 수정하면 자동으로 앱이 새로고침됩니다:

1. 원하는 파일을 편집 (예: `src/screens/FeedScreen.tsx`)
2. 파일 저장
3. 앱이 자동으로 새로고침됨

### 수동 새로고침
- **Android**: 기기를 흔들거나 `Ctrl + M`
- **iOS**: 기기를 흔들거나 `Cmd + D`

## 트러블슈팅

### Metro bundler 오류
```bash
# 캐시 삭제 후 재시작
npm start -- --clear
```

### 포트 충돌
```bash
# 다른 포트로 시작
npm start -- --port 8081
```

### 의존성 문제
```bash
# node_modules 재설치
rm -rf node_modules
npm install
```

### iOS 빌드 오류
```bash
cd ios
pod install
cd ..
npm run ios
```

## 다음 단계

앱을 성공적으로 실행했다면:

1. [README.md](./README.md)를 읽고 프로젝트 구조 이해하기
2. `src/screens/` 디렉토리의 코드 살펴보기
3. React Native Paper 컴포넌트 문서 읽기
4. 새로운 기능 추가해보기

## 유용한 링크

- [Expo 공식 문서](https://docs.expo.dev/)
- [React Navigation 가이드](https://reactnavigation.org/docs/getting-started)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [React Native 공식 문서](https://reactnative.dev/)

## 도움이 필요하신가요?

문제가 발생하면:
1. 에러 메시지를 자세히 읽어보세요
2. Expo 개발자 도구의 로그를 확인하세요
3. 공식 문서를 참조하세요
4. Stack Overflow에서 검색해보세요
