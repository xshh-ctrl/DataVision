<script setup lang="ts">
import { computed, ref } from 'vue'
import VChart from 'vue-echarts'
import type { EChartsOption } from 'echarts'

const props = withDefaults(defineProps<{
  title?: string
  xData: string[]
  series: { name: string; data: number[]; color?: string }[]
  smooth?: boolean
}>(), {
  title: '',
  smooth: true
})

const chartRef = ref()

const option = computed<EChartsOption>(() => ({
  title: {
    text: props.title,
    left: 'center',
    textStyle: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold'
    }
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(17, 24, 39, 0.9)',
    borderColor: 'rgba(0, 212, 255, 0.3)',
    textStyle: {
      color: '#ffffff'
    }
  },
  legend: {
    data: props.series.map(s => s.name),
    bottom: 0,
    textStyle: {
      color: 'rgba(255, 255, 255, 0.7)'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '15%',
    top: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.xData,
    axisLine: {
      lineStyle: {
        color: 'rgba(255, 255, 255, 0.2)'
      }
    },
    axisLabel: {
      color: 'rgba(255, 255, 255, 0.6)'
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false
    },
    axisLabel: {
      color: 'rgba(255, 255, 255, 0.6)'
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    }
  },
  series: props.series.map(s => ({
    name: s.name,
    type: 'line',
    smooth: props.smooth,
    data: s.data,
    lineStyle: {
      color: s.color || '#00d4ff',
      width: 3
    },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          { offset: 0, color: `${s.color || '#00d4ff'}40` },
          { offset: 1, color: `${s.color || '#00d4ff'}05` }
        ]
      }
    },
    itemStyle: {
      color: s.color || '#00d4ff'
    }
  }))
}))
</script>

<template>
  <v-chart ref="chartRef" class="chart" :option="option" autoresize />
</template>

<style scoped lang="scss">
.chart {
  width: 100%;
  height: 100%;
}
</style>
