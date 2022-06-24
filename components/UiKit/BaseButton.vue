<template>
  <button class="u-base-button" :type="props.type">
    <slot/>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  type?: string,
}>();
</script>

<style scoped lang="scss">
.u-base-button {
  margin-top: 32px;
  padding: 12px;
  background: #333;
  outline: none;
  border: none;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: all .2s ease-in-out;
  display: flex;
  justify-content: center;
  min-width: 100px;

  &:hover {
    filter: brightness(1.2);
  }
}
</style>