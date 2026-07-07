import { describe, it, expect } from 'vitest'
import {
  mockDashboardData,
  mockLineChartData,
  mockBarChartData,
  mockPieChartData,
  mockMapChartData,
  mockGaugeData,
  generateRealtimeData
} from '@/services/mock/dashboard'

describe('Mock Data', () => {
  it('should have valid dashboard data', () => {
    expect(mockDashboardData.totalUsers).toBeGreaterThan(0)
    expect(mockDashboardData.activeUsers).toBeGreaterThan(0)
    expect(mockDashboardData.totalOrders).toBeGreaterThan(0)
    expect(mockDashboardData.revenue).toBeGreaterThan(0)
  })

  it('should have valid line chart data', () => {
    expect(mockLineChartData.xData.length).toBeGreaterThan(0)
    expect(mockLineChartData.series.length).toBeGreaterThan(0)
    mockLineChartData.series.forEach(series => {
      expect(series.data.length).toBe(mockLineChartData.xData.length)
    })
  })

  it('should have valid bar chart data', () => {
    expect(mockBarChartData.xData.length).toBeGreaterThan(0)
    expect(mockBarChartData.series.length).toBeGreaterThan(0)
  })

  it('should have valid pie chart data', () => {
    expect(mockPieChartData.data.length).toBeGreaterThan(0)
    const total = mockPieChartData.data.reduce((sum, item) => sum + item.value, 0)
    expect(total).toBeGreaterThan(0)
  })

  it('should have valid map chart data', () => {
    expect(mockMapChartData.data.length).toBeGreaterThan(0)
  })

  it('should have valid gauge data', () => {
    expect(mockGaugeData.value).toBeGreaterThanOrEqual(0)
    expect(mockGaugeData.value).toBeLessThanOrEqual(mockGaugeData.max)
  })

  it('should generate realtime data', () => {
    const data = generateRealtimeData()
    expect(data.timestamp).toBeDefined()
    expect(data.value).toBeGreaterThan(0)
  })
})
