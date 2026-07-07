export interface DashboardData {
  totalUsers: number
  activeUsers: number
  totalOrders: number
  revenue: number
  userGrowth: string
  orderGrowth: string
  revenueGrowth: string
}

export interface LineChartData {
  xData: string[]
  series: { name: string; data: number[]; color?: string }[]
}

export interface BarChartData {
  xData: string[]
  series: { name: string; data: number[]; color?: string }[]
}

export interface PieChartData {
  data: { name: string; value: number; itemStyle?: { color: string } }[]
}

export interface MapChartData {
  data: { name: string; value: number }[]
}

export interface GaugeData {
  value: number
  max: number
}

export interface RadarChartData {
  data: { name: string; value: number }[]
}

export interface RealTimeData {
  timestamp: string
  value: number
}

export const mockDashboardData: DashboardData = {
  totalUsers: 1258600,
  activeUsers: 892400,
  totalOrders: 356800,
  revenue: 377000000,
  userGrowth: '+12.5%',
  orderGrowth: '+8.3%',
  revenueGrowth: '+15.7%'
}

export const mockLineChartData: LineChartData = {
  xData: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  series: [
    {
      name: '销售额(万)',
      data: [25000, 27500, 29800, 32000, 34500, 36800, 37700, 39200, 41000, 43500, 45800, 48000],
      color: '#00d4ff'
    },
    {
      name: '订单量(万)',
      data: [7100, 7800, 8500, 9100, 9800, 10500, 10800, 11200, 11700, 12400, 13100, 13700],
      color: '#00ff88'
    }
  ]
}

export const mockBarChartData: BarChartData = {
  xData: ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安'],
  series: [
    {
      name: '销售额(万)',
      data: [8600, 10700, 9800, 8600, 5300, 4500, 3550, 2880],
      color: '#a855f7'
    },
    {
      name: '订单量(千)',
      data: [2450, 3050, 2800, 2450, 1510, 1290, 1010, 820],
      color: '#f97316'
    }
  ]
}

export const mockPieChartData: PieChartData = {
  data: [
    { name: '电子产品', value: 13600, itemStyle: { color: '#00d4ff' } },
    { name: '服装鞋帽', value: 10600, itemStyle: { color: '#00ff88' } },
    { name: '食品饮料', value: 8400, itemStyle: { color: '#a855f7' } },
    { name: '家居用品', value: 5100, itemStyle: { color: '#fb923c' } }
  ]
}

export const mockMapChartData: MapChartData = {
  data: [
    { name: '北京', value: 8600 },
    { name: '上海', value: 10700 },
    { name: '广州', value: 9800 },
    { name: '深圳', value: 8600 },
    { name: '杭州', value: 5300 },
    { name: '成都', value: 4500 },
    { name: '武汉', value: 3550 },
    { name: '西安', value: 2880 }
  ]
}

export const mockGaugeData: GaugeData = {
  value: 78.5,
  max: 100
}

export const mockRadarChartData: RadarChartData = {
  data: [
    { name: '销售业绩', value: 92 },
    { name: '市场份额', value: 85 },
    { name: '客户满意度', value: 78 },
    { name: '服务效率', value: 88 },
    { name: '品牌影响力', value: 82 }
  ]
}

export const generateRealtimeData = (): RealTimeData => {
  return {
    timestamp: new Date().toLocaleTimeString('zh-CN'),
    value: Math.floor(Math.random() * 500) + 1000
  }
}