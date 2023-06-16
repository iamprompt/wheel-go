import type { StoreonModule } from 'storeon'

interface Location {
  lat: number
  lng: number
  timestamp: number
}

export interface TracingState {
  trace: {
    paths: Location[]
  }
}

export interface TracingEvent {
  'trace/add': Location
  'trace/clear': undefined
}

export const tracingModule: StoreonModule<TracingState, TracingEvent> = (
  store,
) => {
  store.on('@init', () => ({ trace: { paths: [] } }))

  store.on('trace/add', (state, path) => ({
    ...state,
    trace: {
      paths: [...state.trace.paths, path],
    },
  }))

  store.on('trace/clear', (state) => ({
    ...state,
    trace: {
      paths: [],
    },
  }))
}
