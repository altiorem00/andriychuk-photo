<template>
  <div class="skeleton" :style="{width: props.width, height: props.height}"></div>
</template>

<script setup lang="ts">
const props = defineProps<{
  width?: string,
  height?: string
}>();
</script>

<style scoped lang="scss">
.skeleton {
  position: relative;
  overflow: hidden;
  background-color: #e2e8f0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.2) 20%,
            rgba(255, 255, 255, 0.5) 60%,
            rgba(255, 255, 255, 0)
    );
    animation: shimmer 2s ease-in-out infinite;
    content: '';
  }
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}
</style>