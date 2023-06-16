import type { LocationObject, LocationTaskOptions } from 'expo-location'
import { LocationAccuracy } from 'expo-location'
import type {
  TaskManagerTaskBody,
  TaskManagerTaskExecutor,
} from 'expo-task-manager'
import { defineTask } from 'expo-task-manager'

import { store } from '~/store/storeon'

export const LOCATION_TRACE_TASK_NAME = 'LOCATION_WATCH_TRACE'
export const LOCATION_TRACE_CONFIG: LocationTaskOptions = {
  accuracy: LocationAccuracy.Highest,
  foregroundService: {
    killServiceOnDestroy: true,
    notificationTitle: 'Wheel Go',
    notificationBody: 'Tracing your route',
  },
  deferredUpdatesInterval: 1000,
  deferredUpdatesDistance: 1,
}

const handleLocationWatch: TaskManagerTaskExecutor = (body) => {
  const {
    data: { locations },
  } = body as TaskManagerTaskBody<{ locations: LocationObject[] }>

  console.log('Location Watched', locations)

  const {
    timestamp,
    coords: { latitude, longitude },
  } = locations[0]

  store.dispatch('trace/add', {
    lat: latitude,
    lng: longitude,
    timestamp,
  })
}

defineTask(LOCATION_TRACE_TASK_NAME, handleLocationWatch)
