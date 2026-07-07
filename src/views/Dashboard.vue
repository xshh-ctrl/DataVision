<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { logger } from '@/utils/logger'
import StatCard from '@/components/widgets/StatCard.vue'
import BorderDecor from '@/components/widgets/BorderDecor.vue'
import LineChart from '@/components/charts/LineChart.vue'
import BarChart from '@/components/charts/BarChart.vue'
import PieChart from '@/components/charts/PieChart.vue'
import GraphChart from '@/components/charts/GraphChart.vue'
import RadarChart from '@/components/charts/RadarChart.vue'

const store = useDashboardStore()
const currentTime = ref(new Date().toLocaleString('zh-CN'))

const notifications = ref([
  { id: 1, title: '系统通知', content: '数据同步完成', time: '刚刚', type: 'success' },
  { id: 2, title: '业务提醒', content: '订单量突破历史记录', time: '5分钟前', type: 'info' },
  { id: 3, title: '安全预警', content: '检测到异常访问', time: '10分钟前', type: 'warning' },
  { id: 4, title: '系统通知', content: '服务器负载正常', time: '30分钟前', type: 'success' },
  { id: 5, title: '业务提醒', content: '用户活跃度提升', time: '1小时前', type: 'info' }
])

const stats = computed(() => {
  if (!store.dashboardData) return []
  const data = store.dashboardData
  return [
    {
      title: '总用户数',
      value: data.totalUsers,
      unit: '人',
      trend: 'up' as const,
      trendValue: data.userGrowth,
      color: 'blue' as const
    },
    {
      title: '活跃用户',
      value: data.activeUsers,
      unit: '人',
      trend: 'up' as const,
      trendValue: '+8.2%',
      color: 'green' as const
    },
    {
      title: '订单总数',
      value: data.totalOrders,
      unit: '单',
      trend: 'up' as const,
      trendValue: data.orderGrowth,
      color: 'purple' as const
    },
    {
      title: '系统健康度',
      value: Math.floor(store.gaugeData?.value || 0),
      unit: '%',
      trend: 'up' as const,
      trendValue: '+2.5%',
      color: 'cyan' as const
    }
  ]
})

onMounted(async () => {
  logger.info('Dashboard mounted, loading data...')
  await store.loadAllData()
  logger.info('Data loaded successfully')

  setInterval(() => {
    currentTime.value = new Date().toLocaleString('zh-CN')
  }, 1000)

  setInterval(() => {
    store.loadRealtimeData()
  }, 5000)
})
</script>

<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <div class="header-title">
        <h1>数视数据大屏</h1>
        <p>DataVision Dashboard</p>
      </div>
      <div class="header-time">{{ currentTime }}</div>
    </header>

    <section class="stats-row">
      <div v-for="(stat, index) in stats" :key="index" class="stat-item">
        <StatCard
          :title="stat.title"
          :value="stat.value"
          :unit="stat.unit"
          :trend="stat.trend"
          :trend-value="stat.trendValue"
          :color="stat.color"
        />
      </div>
    </section>

    <main class="dashboard-content">
      <aside class="left-column">
        <div class="chart-panel">
          <BorderDecor title="数据趋势">
            <LineChart
              v-if="store.lineChartData"
              :x-data="store.lineChartData.xData"
              :series="store.lineChartData.series"
            />
          </BorderDecor>
        </div>
        <div class="chart-panel">
          <BorderDecor title="分类占比">
            <PieChart
              v-if="store.pieChartData"
              :data="store.pieChartData.data"
            />
          </BorderDecor>
        </div>
      </aside>

      <section class="center-column">
        <div class="chart-panel main-panel">
          <BorderDecor title="关联分析">
            <GraphChart />
          </BorderDecor>
        </div>
      </section>

      <aside class="right-column">
        <div class="chart-panel">
          <BorderDecor title="城市排名">
            <BarChart
              v-if="store.barChartData"
              :x-data="store.barChartData.xData"
              :series="store.barChartData.series"
            />
          </BorderDecor>
        </div>
        <div class="chart-panel">
          <BorderDecor title="能力评估">
            <RadarChart
              v-if="store.radarChartData"
              :data="store.radarChartData.data"
            />
          </BorderDecor>
        </div>
      </aside>
    </main>

    <footer class="dashboard-footer">
      <div class="footer-title">系统通知</div>
      <div class="notification-list">
        <div
          v-for="item in notifications"
          :key="item.id"
          class="notification-item"
        >
          <span :class="['notification-type', item.type]"></span>
          <span class="notification-title">{{ item.title }}</span>
          <span class="notification-content">{{ item.content }}</span>
          <span class="notification-time">{{ item.time }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.dashboard {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 16px;
  background: $bg-primary;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background: $bg-secondary;
  border-radius: $radius-lg;
  border: 1px solid $border-color;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: $gradient-blue;
  }
}

.header-title {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.header-title h1 {
  font-size: 24px;
  font-weight: bold;
  color: $text-primary;
  background: $gradient-blue;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.header-title p {
  font-size: 12px;
  color: $text-muted;
  margin: 0;
}

.header-time {
  font-size: 14px;
  color: $text-secondary;
  font-family: 'Courier New', monospace;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.stat-item {
  height: 120px;
}

.dashboard-content {
  flex: 1;
  display: flex;
  gap: 12px;
  min-height: 0;
}

.left-column,
.right-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
}

.center-column {
  flex: 1.5;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.chart-panel {
  flex: 1;
  min-height: 0;
  background: $bg-secondary;
  border-radius: $radius-lg;
  border: 1px solid $border-color;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.dashboard-footer {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  background: $bg-secondary;
  border-radius: $radius-lg;
  border: 1px solid $border-color;
  gap: 20px;
}

.footer-title {
  font-size: 14px;
  font-weight: bold;
  color: $accent-blue;
  flex-shrink: 0;
}

.notification-list {
  flex: 1;
  display: flex;
  gap: 24px;
  overflow-x: auto;
}

.notification-item {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.notification-type {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.notification-type.success {
  background: $accent-green;
}

.notification-type.info {
  background: $accent-blue;
}

.notification-type.warning {
  background: $accent-yellow;
}

.notification-title {
  font-size: 12px;
  color: $text-secondary;
  font-weight: 500;
}

.notification-content {
  font-size: 12px;
  color: $text-primary;
}

.notification-time {
  font-size: 11px;
  color: $text-muted;
}

@media (max-width: 1440px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard-content {
    grid-template-columns: repeat(2, 1fr);
  }

  .center-column {
    grid-column: span 2;
  }
}
</style>
