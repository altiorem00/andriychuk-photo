<template>
  <textarea
      :rows="props.rows ? props.rows : 4" class="u-textarea-field" :value="props.modelValue" :placeholder="props.placeholder"
      @input="emits('update:modelValue', $event.target.value)"/>
</template>

<script setup lang="ts">
const emits = defineEmits(["update:modelValue"]);
const props = defineProps<{
  modelValue: string,
  rows?: number | string,
  placeholder?: string
}>();
</script>

<style scoped lang="scss">
.u-textarea-field {
  border: none;
  border-bottom: 1px solid #333333;
  padding: 6px 2px;
  outline: none;
  background: #fff;
  width: 200px;
}
</style>