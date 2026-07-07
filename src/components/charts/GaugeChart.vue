<script setup lang="ts">
import { computed, ref } from 'vue'
import VChart from 'vue-echarts'
import type { EChartsOption } from 'echarts'

const props = withDefaults(defineProps<{
  title?: string
  value: number
  max?: number
  min?: number
  unit?: string
  color?: string
}>(), {
  title: '',
  max: 100,
  min: 0,
  unit: '%',
  color: '#00d4ff'
})

const chartRef = ref()

const option = computed<EChartsOption>(() => ({
  title: {
    text: props.title,
    left: 'center',
    top: '10%',
    textStyle: {
      color: '#ffffff',
      fontSize: 14,
      fontWeight: 'bold'
    }
  },
  series: [{
    type: 'gauge',
    radius: '90%',
    center: ['50%', '60%'],
    min: props.min,
    max: props.max,
    splitNumber: 5,
    axisLine: {
      lineStyle: {
        width: 12,
        color: [
          [0.3, '#ef4444'],
          [0.7, '#eab308'],
          [1, props.color]
        ]
      }
    },
    pointer: {
      itemStyle: {
        color: props.color
      },
      length: '60%',
      width: 4
    },
    axisTick: {
      distance: -12,
      length: 4,
      lineStyle: {
        color: '#ffffff',
        width: 2
      }
    },
    axisLabel: {
      color: 'rgba(255, 255, 255, 0.6)',
      distance: 20,
      fontSize: 12
    },
    splitLine: {
      distance: -16,
      length: 12,
      lineStyle: {
        color: '#ffffff',
        width: 2
      }
    },
    detail: {
      valueAnimation: true,
      formatter: `{value}${props.unit}`,
      color: '#ffffff',
      fontSize: 24,
      fontWeight: 'bold',
      offsetCenter: [0, '20%']
    },
    data: [{ value: props.value }]
  }]
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
