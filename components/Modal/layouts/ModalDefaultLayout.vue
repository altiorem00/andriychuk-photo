<template>
  <div class="modal" :class="{ light: props.light }">
    <span class="modal__close" @click="emits('close')">X</span>
    <slot />
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["close"]);
const props = defineProps<{
  light?: boolean;
}>();
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  padding: 68px 20px;

  &.light {
    background: rgba(255, 255, 255, 0.7);

    .modal__close {
      color: #000;
    }
  }

  &__close {
    position: absolute;
    top: 14px;
    right: 20px;
    font-size: 22px;
    font-weight: 400;
    transform: scaleX(1.5);
    cursor: pointer;
    color: #fff;
  }
}
</style>
