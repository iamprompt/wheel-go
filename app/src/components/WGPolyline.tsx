import { forwardRef } from 'react'
import type { MapPolyline, MapPolylineProps } from 'react-native-maps'
import { Polyline } from 'react-native-maps'

const WGPolylineColors = {
  info: 'rgba(0, 55, 179, 0.5)',
  success: 'rgba(67, 196, 99, 0.5)',
}

interface WGPolylineProps
  extends Omit<MapPolylineProps, 'strokeWidth' | 'strokeColor'> {
  color?: keyof typeof WGPolylineColors
}

export const WGPolyline = forwardRef<MapPolyline, WGPolylineProps>(
  ({ color = 'info', ...props }, ref) => {
    return (
      <Polyline
        {...props}
        ref={ref}
        strokeWidth={2.5}
        strokeColor={WGPolylineColors[color]}
      />
    )
  },
)
