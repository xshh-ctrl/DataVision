<script setup lang="ts">
import { computed, ref } from 'vue'
import VChart from 'vue-echarts'
import type { EChartsOption } from 'echarts'

const props = defineProps<{
  title?: string
  data: { name: string; value: number; itemStyle?: { color: string } }[]
  radius?: [string, string]
}>()

const defaultRadius: [string, string] = ['40%', '75%']

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
    trigger: 'item',
    backgroundColor: 'rgba(17, 24, 39, 0.9)',
    borderColor: 'rgba(0, 212, 255, 0.3)',
    textStyle: {
      color: '#ffffff'
    },
    formatter: '{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'horizontal',
    bottom: '2%',
    left: 'center',
    textStyle: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: 10
    },
    itemGap: 12,
    itemWidth: 10,
    itemHeight: 10
  },
  series: [{
    type: 'pie',
    radius: props.radius || defaultRadius,
    center: ['50%', '45%'],
    avoidLabelOverlap: false,
    itemStyle: {
      borderRadius: 8,
      borderColor: '#0a0f1a',
      borderWidth: 2
    },
    label: {
      show: true,
      position: 'inside',
      color: '#ffffff',
      fontSize: 12,
      fontWeight: 'bold',
      formatter: '{b}\n{d}%'
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    },
    labelLine: {
      show: false
    },
    data: props.data
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
