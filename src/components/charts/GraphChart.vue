<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

interface SunburstNode {
  name: string
  value?: number
  itemStyle?: {
    color: string
  }
  children?: SunburstNode[]
}

const props = withDefaults(defineProps<{
  title?: string
}>(), {
  title: ''
})

const chartContainer = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null

const baseData: SunburstNode = {
  name: '总数据',
  itemStyle: { color: '#0a0f1a' },
  children: [
    {
      name: '电子产品',
      value: 13600,
      itemStyle: { color: '#00d4ff' },
      children: [
        { name: '北京', value: 3500, itemStyle: { color: '#22d3ee' } },
        { name: '上海', value: 4200, itemStyle: { color: '#38bdf8' } },
        { name: '广州', value: 2800, itemStyle: { color: '#60a5fa' } },
        { name: '深圳', value: 3100, itemStyle: { color: '#818cf8' } }
      ]
    },
    {
      name: '服装鞋帽',
      value: 10600,
      itemStyle: { color: '#00ff88' },
      children: [
        { name: '北京', value: 2100, itemStyle: { color: '#4ade80' } },
        { name: '上海', value: 2800, itemStyle: { color: '#86efac' } },
        { name: '广州', value: 3200, itemStyle: { color: '#bbf7d0' } },
        { name: '深圳', value: 2500, itemStyle: { color: '#dcfce7' } }
      ]
    },
    {
      name: '食品饮料',
      value: 8400,
      itemStyle: { color: '#a855f7' },
      children: [
        { name: '北京', value: 1800, itemStyle: { color: '#c084fc' } },
        { name: '上海', value: 2200, itemStyle: { color: '#d8b4fe' } },
        { name: '广州', value: 2500, itemStyle: { color: '#e9d5ff' } },
        { name: '深圳', value: 1900, itemStyle: { color: '#f3e8ff' } }
      ]
    },
    {
      name: '家居用品',
      value: 5100,
      itemStyle: { color: '#fb923c' },
      children: [
        { name: '北京', value: 1200, itemStyle: { color: '#fdba74' } },
        { name: '上海', value: 1500, itemStyle: { color: '#fed7aa' } },
        { name: '广州', value: 1300, itemStyle: { color: '#ffedd5' } },
        { name: '深圳', value: 1100, itemStyle: { color: '#fff7ed' } }
      ]
    }
  ]
}

const getBaseOption = (data: SunburstNode): EChartsOption => ({
  backgroundColor: 'transparent',
  title: {
    text: props.title,
    left: 'center',
    top: 15,
    textStyle: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold'
    }
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(17, 24, 39, 0.9)',
    borderColor: 'rgba(0, 212, 255, 0.3)',
    textStyle: {
      color: '#ffffff'
    },
    formatter: (params: unknown) => {
      const p = params as { name: string; value?: number; percent?: number; treePathInfo?: { name: string }[] }
      const path = p.treePathInfo?.map(item => item.name).join(' > ') || p.name
      return `${path}<br/>数值: ${p.value || 0}<br/>占比: ${(p.percent || 0).toFixed(1)}%`
    }
  },
  animationDuration: 1200,
  animationEasing: 'cubicOut',
  animationDurationUpdate: 1200,
  animationEasingUpdate: 'cubicOut',
  series: [{
    type: 'sunburst',
    radius: ['10%', '78%'],
    center: ['50%', '45%'],
    sort: 'desc' as const,
    emphasis: {
      focus: 'ancestor',
      itemStyle: {
        shadowBlur: 20,
        shadowColor: 'rgba(0, 212, 255, 0.5)'
      }
    },
    levels: [
      {},
      {
        r0: '15%',
        r: '35%',
        itemStyle: {
          borderWidth: 3,
          borderColor: '#0a0f1a'
        },
        label: {
          show: true,
          rotate: 'tangential',
          fontSize: 12,
          fontWeight: 'bold',
          color: '#ffffff'
        }
      },
      {
        r0: '35%',
        r: '60%',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#0a0f1a'
        },
        label: {
          show: true,
          rotate: 'tangential',
          fontSize: 11,
          color: 'rgba(255, 255, 255, 0.9)'
        }
      },
      {
        r0: '60%',
        r: '80%',
        label: {
          show: true,
          position: 'inside',
          padding: 2,
          fontSize: 10,
          color: '#ffffff'
        }
      }
    ],
    data: [data]
  }]
})

const initChart = () => {
  if (!chartContainer.value) return
  
  chartInstance = echarts.init(chartContainer.value)
  
  const firstLevelData: SunburstNode = {
    name: '总数据',
    itemStyle: { color: '#0a0f1a' }
  }
  
  chartInstance.setOption(getBaseOption(firstLevelData), true)
  
  setTimeout(() => {
    const secondLevelData: SunburstNode = {
      name: '总数据',
      itemStyle: { color: '#0a0f1a' },
      children: baseData.children!.map((cat: SunburstNode) => ({
        name: cat.name,
        value: cat.value,
        itemStyle: cat.itemStyle
      }))
    }
    
    chartInstance?.setOption({
      series: [{
        data: [secondLevelData]
      }]
    })
    
    setTimeout(() => {
      chartInstance?.setOption({
        series: [{
          data: [baseData]
        }]
      })
    }, 600)
  }, 300)
}

const handleResize = () => {
  chartInstance?.resize()
}

onMounted(() => {
  nextTick(() => {
    initChart()
    window.addEventListener('resize', handleResize)
  })
})

watch(() => props.title, () => {
  if (chartInstance) {
    chartInstance.setOption({
      title: {
        text: props.title
      }
    })
  }
})
</script>

<template>
  <div ref="chartContainer" class="chart" />
</template>

<style scoped lang="scss">
.chart {
  width: 100%;
  height: 100%;
}
</style>