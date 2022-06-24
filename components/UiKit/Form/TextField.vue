<template>
  <input
      class="u-text-field" :required="props.required" :value="props.modelValue" :type="props.type" :placeholder="props.placeholder"
      @input="emits('update:modelValue', $event.target.value)">
</template>

<script setup lang="ts">
const emits = defineEmits(["update:modelValue"]);
const props = defineProps<{
  modelValue: string,
  placeholder?: string,
  type?: string,
  required?: boolean
}>();
</script>

<style scoped lang="scss">
.u-text-field {
  border: none;
  border-bottom: 1px solid #333333;
  padding: 6px 2px;
  outline: none;
  background: #fff;
  width: 200px;
}
</style>