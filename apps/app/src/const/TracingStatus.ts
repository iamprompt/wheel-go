export enum TRACE_STATUS {
  PREPARE = 'PREPARE',
  TRACING = 'TRACING',
  PAUSE = 'PAUSE',
  SAVED = 'SAVED',
}

export const TRACE_STATUS_LABEL: Record<
  TRACE_STATUS,
  {
    label: string
    icon: string
    color: string
  }
> = {
  PREPARE: {
    label: 'tracing_prepare',
    icon: 'ic:baseline-backpack',
    color: 'magenta',
  },
  TRACING: {
    label: 'tracing',
    icon: 'ic:baseline-radio-button-checked',
    color: 'error',
  },
  PAUSE: {
    label: 'tracing_pause',
    icon: 'ic:outline-pause-circle',
    color: 'warning',
  },
  SAVED: {
    label: 'tracing_saved',
    icon: 'ic:baseline-save',
    color: 'success',
  },
}
