import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { adapter } from '@/services/adapters/dataAdapter'
import type { DashboardData, LineChartData, BarChartData, PieChartData, MapChartData, GaugeData, RadarChartData, RealTimeData } from '@/services/mock/dashboard'

export const useDashboardStore = defineStore('dashboard', () => {
  const dashboardData = ref<DashboardData | null>(null)
  const lineChartData = ref<LineChartData | null>(null)
  const barChartData = ref<BarChartData | null>(null)
  const pieChartData = ref<PieChartData | null>(null)
  const mapChartData = ref<MapChartData | null>(null)
  const gaugeData = ref<GaugeData | null>(null)
  const radarChartData = ref<RadarChartData | null>(null)
  const realtimeData = ref<RealTimeData | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const loadDashboardData = async () => {
    try {
      isLoading.value = true
      error.value = null
      dashboardData.value = await adapter.getDashboardData()
    } catch (e) {
      error.value = '加载数据失败'
    } finally {
      isLoading.value = false
    }
  }

  const loadLineChartData = async () => {
    try {
      lineChartData.value = await adapter.getLineChartData()
    } catch (e) {
      error.value = '加载折线图数据失败'
    }
  }

  const loadBarChartData = async () => {
    try {
      barChartData.value = await adapter.getBarChartData()
    } catch (e) {
      error.value = '加载柱状图数据失败'
    }
  }

  const loadPieChartData = async () => {
    try {
      pieChartData.value = await adapter.getPieChartData()
    } catch (e) {
      error.value = '加载饼图数据失败'
    }
  }

  const loadMapChartData = async () => {
    try {
      mapChartData.value = await adapter.getMapChartData()
    } catch (e) {
      error.value = '加载地图数据失败'
    }
  }

  const loadGaugeData = async () => {
    try {
      gaugeData.value = await adapter.getGaugeData()
    } catch (e) {
      error.value = '加载仪表盘数据失败'
    }
  }

  const loadRadarChartData = async () => {
    try {
      radarChartData.value = await adapter.getRadarChartData()
    } catch (e) {
      error.value = '加载雷达图数据失败'
    }
  }

  const loadRealtimeData = async () => {
    try {
      realtimeData.value = await adapter.getRealtimeData()
    } catch (e) {
      error.value = '加载实时数据失败'
    }
  }

  const loadAllData = async () => {
    await Promise.all([
      loadDashboardData(),
      loadLineChartData(),
      loadBarChartData(),
      loadPieChartData(),
      loadMapChartData(),
      loadGaugeData(),
      loadRadarChartData(),
      loadRealtimeData()
    ])
  }

  const totalUsers = computed(() => dashboardData.value?.totalUsers || 0)
  const activeUsers = computed(() => dashboardData.value?.activeUsers || 0)
  const totalOrders = computed(() => dashboardData.value?.totalOrders || 0)
  const revenue = computed(() => dashboardData.value?.revenue || 0)

  return {
    dashboardData,
    lineChartData,
    barChartData,
    pieChartData,
    mapChartData,
    gaugeData,
    radarChartData,
    realtimeData,
    isLoading,
    error,
    loadDashboardData,
    loadLineChartData,
    loadBarChartData,
    loadPieChartData,
    loadMapChartData,
    loadGaugeData,
    loadRadarChartData,
    loadRealtimeData,
    loadAllData,
    totalUsers,
    activeUsers,
    totalOrders,
    revenue
  }
})