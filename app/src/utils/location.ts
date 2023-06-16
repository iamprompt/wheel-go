import {
  getCurrentPositionAsync,
  LocationAccuracy,
  PermissionStatus,
  requestForegroundPermissionsAsync,
} from 'expo-location'

export async function getCurrentPosition() {
  const { status } = await requestForegroundPermissionsAsync()

  if (status !== PermissionStatus.GRANTED) {
    throw new Error('Permission to access location was denied')
  }

  const location = await getCurrentPositionAsync({
    accuracy: LocationAccuracy.BestForNavigation,
  })

  return location
}
