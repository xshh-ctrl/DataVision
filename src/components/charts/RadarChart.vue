<script setup lang="ts">
import { computed, ref } from 'vue'
import VChart from 'vue-echarts'
import type { EChartsOption } from 'echarts'

const props = withDefaults(defineProps<{
  title?: string
  data: { name: string; value: number }[]
}>(), {
  title: ''
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
    backgroundColor: 'rgba(17, 24, 39, 0.9)',
    borderColor: 'rgba(0, 212, 255, 0.3)',
    textStyle: {
      color: '#ffffff'
    }
  },
  radar: {
    indicator: props.data.map(item => ({
      name: item.name,
      max: 100
    })),
    shape: 'polygon',
    splitNumber: 5,
    axisName: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: 12
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(0, 212, 255, 0.2)'
      }
    },
    splitArea: {
      show: true,
      areaStyle: {
        color: ['rgba(0, 212, 255, 0.05)', 'rgba(0, 212, 255, 0.1)']
      }
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(0, 212, 255, 0.3)'
      }
    }
  },
  series: [{
    type: 'radar',
    data: [{
      value: props.data.map(item => item.value),
      name: '综合评分',
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: {
        color: '#00d4ff',
        width: 2
      },
      areaStyle: {
        color: 'rgba(0, 212, 255, 0.3)'
      },
      itemStyle: {
        color: '#00d4ff'
      }
    }]
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
