<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import VChart from 'vue-echarts'
import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'

const props = withDefaults(defineProps<{
  title?: string
  mapData: { name: string; value: number }[]
}>(), {
  title: ''
})

const chartRef = ref()

const chinaGeoJson = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      properties: { name: '北京' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[[115.9, 40.8], [117.1, 40.8], [117.1, 39.9], [115.9, 39.9], [115.9, 40.8]]] as number[][][]
      }
    },
    {
      type: 'Feature' as const,
      properties: { name: '上海' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[[120.8, 31.5], [121.9, 31.5], [121.9, 30.7], [120.8, 30.7], [120.8, 31.5]]] as number[][][]
      }
    },
    {
      type: 'Feature' as const,
      properties: { name: '广州' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[[112.9, 23.5], [113.8, 23.5], [113.8, 22.8], [112.9, 22.8], [112.9, 23.5]]] as number[][][]
      }
    },
    {
      type: 'Feature' as const,
      properties: { name: '深圳' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[[113.6, 22.7], [114.5, 22.7], [114.5, 22.4], [113.6, 22.4], [113.6, 22.7]]] as number[][][]
      }
    },
    {
      type: 'Feature' as const,
      properties: { name: '杭州' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[[119.8, 30.5], [120.8, 30.5], [120.8, 29.8], [119.8, 29.8], [119.8, 30.5]]] as number[][][]
      }
    },
    {
      type: 'Feature' as const,
      properties: { name: '成都' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[[103.5, 31.3], [104.7, 31.3], [104.7, 30.4], [103.5, 30.4], [103.5, 31.3]]] as number[][][]
      }
    },
    {
      type: 'Feature' as const,
      properties: { name: '武汉' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[[113.7, 31.3], [115.0, 31.3], [115.0, 30.4], [113.7, 30.4], [113.7, 31.3]]] as number[][][]
      }
    },
    {
      type: 'Feature' as const,
      properties: { name: '西安' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[[108.5, 34.0], [109.5, 34.0], [109.5, 33.4], [108.5, 33.4], [108.5, 34.0]]] as number[][][]
      }
    }
  ]
}

onMounted(() => {
  echarts.registerMap('china', chinaGeoJson)
})

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
    formatter: '{b}: {c}'
  },
  visualMap: {
    min: 0,
    max: 1000,
    left: 'left',
    top: 'center',
    textStyle: {
      color: 'rgba(255, 255, 255, 0.7)'
    },
    inRange: {
      color: ['#0066ff', '#00d4ff', '#00ff88']
    }
  },
  series: [{
    type: 'map',
    map: 'china',
    roam: false,
    label: {
      show: true,
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: 12
    },
    itemStyle: {
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      areaColor: '#1a2332'
    },
    emphasis: {
      itemStyle: {
        areaColor: '#00d4ff',
        borderColor: '#ffffff'
      }
    },
    data: props.mapData
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
