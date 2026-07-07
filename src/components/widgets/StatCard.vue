<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  title: string
  value: number
  unit?: string
  prefix?: string
  suffix?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'cyan'
}>(), {
  unit: '',
  prefix: '',
  suffix: '',
  trend: 'neutral',
  trendValue: '',
  color: 'blue'
})

const displayValue = ref(0)
let animationFrame: number

const colorClass = computed(() => {
  const colors: Record<string, string> = {
    blue: 'text-blue',
    green: 'text-green',
    purple: 'text-purple',
    orange: 'text-orange',
    red: 'text-red',
    cyan: 'text-cyan'
  }
  return colors[props.color] || colors.blue
})

const trendClass = computed(() => {
  if (props.trend === 'up') return 'text-green'
  if (props.trend === 'down') return 'text-red'
  return 'text-muted'
})

const animateValue = () => {
  const duration = 1500
  const startTime = performance.now()
  const startValue = 0
  
  const update = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeOut = 1 - Math.pow(1 - progress, 3)
    
    displayValue.value = Math.floor(startValue + (props.value - startValue) * easeOut)
    
    if (progress < 1) {
      animationFrame = requestAnimationFrame(update)
    }
  }
  
  animationFrame = requestAnimationFrame(update)
}

onMounted(() => {
  animateValue()
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})

const formattedValue = computed(() => {
  if (props.value >= 10000) {
    return (displayValue.value / 10000).toFixed(2) + '万'
  }
  return displayValue.value.toLocaleString()
})
</script>

<template>
  <div class="stat-card">
    <div class="stat-header">
      <span class="stat-title">{{ title }}</span>
      <span v-if="trendValue" :class="['stat-trend', trendClass]">
        {{ trend === 'up' ? '↑' : trend === 'down' ? '↓' : '' }} {{ trendValue }}
      </span>
    </div>
    <div class="stat-value">
      <span v-if="prefix" class="stat-prefix">{{ prefix }}</span>
      <span :class="['stat-number', colorClass]">{{ formattedValue }}</span>
      <span v-if="unit" class="stat-unit">{{ unit }}</span>
      <span v-if="suffix" class="stat-suffix">{{ suffix }}</span>
    </div>
    <div class="stat-decoration"></div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.stat-card {
  background: $bg-card;
  border-radius: $radius-lg;
  padding: 20px;
  position: relative;
  overflow: hidden;
  border: 1px solid $border-color;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: $border-light;
    box-shadow: $shadow-glow-blue;
  }
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.stat-title {
  font-size: 14px;
  color: $text-secondary;
}

.stat-trend {
  font-size: 12px;
  font-weight: 500;
}

.stat-value {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.stat-prefix {
  font-size: 18px;
  color: $text-secondary;
}

.stat-number {
  font-size: 32px;
  font-weight: bold;
}

.stat-unit {
  font-size: 14px;
  color: $text-secondary;
  margin-left: 4px;
}

.stat-suffix {
  font-size: 14px;
  color: $text-secondary;
  margin-left: 4px;
}

.stat-decoration {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  opacity: 0.1;
}

.text-blue { color: $accent-blue; }
.text-green { color: $accent-green; }
.text-purple { color: $accent-purple; }
.text-orange { color: $accent-orange; }
.text-red { color: $accent-red; }
.text-cyan { color: $accent-cyan; }
.text-muted { color: $text-muted; }
</style>
