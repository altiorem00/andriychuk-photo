<template>
  <div class="u-upload-file" @click="deleteFile">
    <input
        v-if="!props.url"
        type="file" class="u-upload-file__input" :multiple="props.multiple"
        accept="image/*" @change="emits('uploaded', $event.target.files)">
    <img v-if="props.url" class="u-upload-file__image" :src="url" :alt="props.url">
  </div>
</template>

<script setup lang="ts">
import {TEncodedGalleryImage} from "~/firebase/types";

const emits = defineEmits(["uploaded", "delete"]);
const props = defineProps<{
  url?: string | TEncodedGalleryImage,
  multiple?: boolean,
  id?: string
}>();

function deleteFile() {
  if (props.url) emits("delete", props.id);
}
</script>

<style scoped lang="scss">
.u-upload-file {
  height: 200px;
  width: 150px;
  position: relative;
  border: 1px dashed #333;
  cursor: pointer;

  &:after {
    content: '+';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #333;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    z-index: -1;
  }

  &__image {
    width: 100%;
    height: 100%;
    display: block;
    object-position: center;
    object-fit: cover;
    cursor: pointer;
  }

  &__input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    cursor: pointer;
  }
}
</style>