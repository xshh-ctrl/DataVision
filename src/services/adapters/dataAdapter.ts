import type { DashboardData, LineChartData, BarChartData, PieChartData, MapChartData, GaugeData, RadarChartData, RealTimeData } from '../mock/dashboard'
import {
  mockDashboardData,
  mockLineChartData,
  mockBarChartData,
  mockPieChartData,
  mockMapChartData,
  mockGaugeData,
  mockRadarChartData,
  generateRealtimeData
} from '../mock/dashboard'

export interface DataAdapter {
  getDashboardData(): Promise<DashboardData>
  getLineChartData(): Promise<LineChartData>
  getBarChartData(): Promise<BarChartData>
  getPieChartData(): Promise<PieChartData>
  getMapChartData(): Promise<MapChartData>
  getGaugeData(): Promise<GaugeData>
  getRadarChartData(): Promise<RadarChartData>
  getRealtimeData(): Promise<RealTimeData>
}

class MockAdapter implements DataAdapter {
  async getDashboardData(): Promise<DashboardData> {
    await this.delay(500)
    return mockDashboardData
  }

  async getLineChartData(): Promise<LineChartData> {
    await this.delay(300)
    return mockLineChartData
  }

  async getBarChartData(): Promise<BarChartData> {
    await this.delay(300)
    return mockBarChartData
  }

  async getPieChartData(): Promise<PieChartData> {
    await this.delay(300)
    return mockPieChartData
  }

  async getMapChartData(): Promise<MapChartData> {
    await this.delay(300)
    return mockMapChartData
  }

  async getGaugeData(): Promise<GaugeData> {
    await this.delay(200)
    return mockGaugeData
  }

  async getRadarChartData(): Promise<RadarChartData> {
    await this.delay(300)
    return mockRadarChartData
  }

  async getRealtimeData(): Promise<RealTimeData> {
    await this.delay(100)
    return generateRealtimeData()
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

class ApiAdapter implements DataAdapter {
  async getDashboardData(): Promise<DashboardData> {
    return this.fetchData('/api/dashboard')
  }

  async getLineChartData(): Promise<LineChartData> {
    return this.fetchData('/api/charts/line')
  }

  async getBarChartData(): Promise<BarChartData> {
    return this.fetchData('/api/charts/bar')
  }

  async getPieChartData(): Promise<PieChartData> {
    return this.fetchData('/api/charts/pie')
  }

  async getMapChartData(): Promise<MapChartData> {
    return this.fetchData('/api/charts/map')
  }

  async getGaugeData(): Promise<GaugeData> {
    return this.fetchData('/api/charts/gauge')
  }

  async getRadarChartData(): Promise<RadarChartData> {
    return this.fetchData('/api/charts/radar')
  }

  async getRealtimeData(): Promise<RealTimeData> {
    return this.fetchData('/api/realtime')
  }

  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  }
}

const dataSource = import.meta.env.VITE_DATA_SOURCE || 'mock'

export const adapter: DataAdapter = dataSource === 'api' ? new ApiAdapter() : new MockAdapter()