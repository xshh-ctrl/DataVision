<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="border-decor">
    <div class="corner top-left"></div>
    <div class="corner top-right"></div>
    <div class="corner bottom-left"></div>
    <div class="corner bottom-right"></div>
    <div class="border-line top"></div>
    <div class="border-line right"></div>
    <div class="border-line bottom"></div>
    <div class="border-line left"></div>
    <div class="content">
      <div v-if="title" class="panel-title">{{ title }}</div>
      <div class="panel-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.border-decor {
  position: relative;
  background: rgba(17, 24, 39, 0.8);
  border-radius: $radius-md;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content {
  position: relative;
  z-index: 1;
  padding: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.panel-title {
  font-size: 14px;
  font-weight: 600;
  color: $accent-cyan;
  margin-bottom: 8px;
  padding-left: 8px;
  border-left: 3px solid $accent-cyan;
  flex-shrink: 0;
}

.panel-body {
  flex: 1;
  min-height: 0;
  width: 100%;
}

.corner {
  position: absolute;
  width: 20px;
  height: 20px;
  border-color: $accent-cyan;
  border-style: solid;
  border-width: 0;
}

.top-left {
  top: 0;
  left: 0;
  border-top-width: 2px;
  border-left-width: 2px;
}

.top-right {
  top: 0;
  right: 0;
  border-top-width: 2px;
  border-right-width: 2px;
}

.bottom-left {
  bottom: 0;
  left: 0;
  border-bottom-width: 2px;
  border-left-width: 2px;
}

.bottom-right {
  bottom: 0;
  right: 0;
  border-bottom-width: 2px;
  border-right-width: 2px;
}

.border-line {
  position: absolute;
  background: rgba(34, 211, 238, 0.2);
}

.top, .bottom {
  height: 1px;
  left: 20px;
  right: 20px;
}

.top { top: 0; }
.bottom { bottom: 0; }

.left, .right {
  width: 1px;
  top: 20px;
  bottom: 20px;
}

.left { left: 0; }
.right { right: 0; }
</style>
