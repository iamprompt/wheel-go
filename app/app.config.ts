import type { ConfigContext, ExpoConfig } from 'expo/config'

import 'dotenv/config'

// React Native Maps: https://docs.expo.dev/versions/latest/sdk/map-view/
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY
const WHEELGO_API = process.env.WHEELGO_API

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Wheel Go',
  slug: 'wheel-go',
  version: '1.0.1',
  orientation: 'portrait',
  icon: './src/assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './src/assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    buildNumber: '40',
    supportsTablet: true,
    bundleIdentifier: 'com.nakama.wheelgo',
    config: {
      googleMapsApiKey: GOOGLE_MAPS_API_KEY,
      usesNonExemptEncryption: false,
    },
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
      NSLocationWhenInUseUsageDescription:
        'This app needs access to your location to find the nearest place.',
      NSLocationAlwaysUsageDescription:
        'This app needs access to your location to trace your route.',
      NSLocationAlwaysAndWhenInUseUsageDescription:
        'This app needs access to your location',
      NSPhotoLibraryUsageDescription:
        'This app needs access to your photo library to upload photo.',
      NSCameraUsageDescription:
        'This app needs access to your camera to take photo.',
      UIBackgroundModes: ['location', 'fetch'],
    },
  },
  locales: {
    en: './src/i18n/metadata/en.json',
    th: './src/i18n/metadata/th.json',
  },
  android: {
    package: 'com.nakama.wheelgo',
    adaptiveIcon: {
      foregroundImage: './src/assets/adaptive-icon.png',
      backgroundColor: '#6A11B1',
    },
    config: {
      googleMaps: {
        apiKey: GOOGLE_MAPS_API_KEY,
      },
    },
  },
  extra: {
    WHEELGO_API,
    eas: {
      projectId: '5fad5236-a703-4ae6-ba12-3f09eab47475',
    },
  },
  scheme: 'wheelgo',
  plugins: [
    'expo-router',
    'expo-localization',
    'expo-location',
    'expo-image-picker',
    [
      'expo-build-properties',
      {
        ios: {
          deploymentTarget: '13.0',
        },
      },
    ],
  ],
})
