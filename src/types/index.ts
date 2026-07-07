export interface ChartSeries {
  name: string
  data: number[]
  color?: string
}

export interface PieDataItem {
  name: string
  value: number
  itemStyle?: { color: string }
}

export interface MapDataItem {
  name: string
  value: number
}

export interface DashboardStats {
  label: string
  value: number
  unit?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red'
}
