import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart, GaugeChart, MapChart, RadarChart, SunburstChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  VisualMapComponent,
  RadarComponent,
  GraphicComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import './styles/global.scss'
import App from './App.vue'

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  GaugeChart,
  MapChart,
  RadarChart,
  SunburstChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  VisualMapComponent,
  RadarComponent,
  GraphicComponent
])

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.component('VChart', VChart)
app.mount('#app')