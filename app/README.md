# Wheel Go – Mobile Application

## Technologies

- [Expo](https://expo.io/)
- [React Native](https://reactnative.dev/)
- [Apollo Client](https://www.apollographql.com/docs/react/)

## Requirements

- [Node.js](https://nodejs.org/en/)
- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-downloads.html) (11.0.19)
- [pnpm](https://pnpm.io/)
- [direnv](https://direnv.net/)
- [EAS CLI](https://docs.expo.dev/build/setup/)
- [Xcode](https://developer.apple.com/xcode/)
- [Fastlane](https://docs.fastlane.tools/getting-started/ios/setup/) (for iOS)
- [CocoaPods](https://guides.cocoapods.org/using/getting-started.html) (for iOS)
- [Android Studio](https://developer.android.com/studio)

## Getting Started

1. Clone the repository

```bash
git clone git@github.com:iamprompt/wheel-go-app.git
```

2. Install dependencies

```bash
pnpm install
```

3. Define environment variables

```bash
cp .env.example .env
```

Copy the contents of `.env.example` into `.env` and fill in the values.

4. Update environment variables in system variables

```bash
direnv allow
```

5. Install the EAS CLI and log in (see [EAS CLI docs](https://docs.expo.dev/build/setup/)) (if you haven't already)

```bash
npm install -g eas-cli

eas login
```

6. Build the development build for development

```bash
pnpm run build:dev-phys-ios # iOS
pnpm run build:dev-android # Android
```

7. Run the development build

```bash
pnpm run start
```

8. Build the production build

```bash
pnpm run build:ios # iOS
pnpm run build:android # Android
```
