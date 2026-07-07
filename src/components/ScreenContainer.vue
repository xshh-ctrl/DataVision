<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const containerRef = ref<HTMLDivElement | null>(null)
const scaleRef = ref(1)

const designWidth = 1920
const designHeight = 1080

const updateScale = () => {
  if (!containerRef.value) return
  
  const containerWidth = containerRef.value.offsetWidth
  const containerHeight = containerRef.value.offsetHeight
  
  const scaleX = containerWidth / designWidth
  const scaleY = containerHeight / designHeight
  
  scaleRef.value = Math.max(scaleX, scaleY)
}

onMounted(() => {
  updateScale()
  window.addEventListener('resize', updateScale)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScale)
})

const containerStyle = computed(() => ({
  width: `${designWidth}px`,
  height: `${designHeight}px`,
  transform: `scale(${scaleRef.value})`,
  transformOrigin: 'center center',
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  marginLeft: `-${designWidth / 2}px`,
  marginTop: `-${designHeight / 2}px`
}))
</script>

<template>
  <div class="screen-container" ref="containerRef">
    <div class="screen-content" :style="containerStyle">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.screen-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $bg-primary;
  position: relative;
}

.screen-content {
  background: $bg-primary;
}
</style>
