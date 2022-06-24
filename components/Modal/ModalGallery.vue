<template>
  <ModalDefaultLayout
      @close="emits('update:modelValue')"
  >
    <div class="modal-gallery-grid">
      <TransitionGroup name="list">
        <img
            v-for="(image, index) in store.getImages"
            :key="image.id"
            :src="image.file"
            alt=""
            class="modal-gallery-grid__img"
            @click="changeImage(index)"
        >
      </TransitionGroup>
      <template v-if="!store.loadedAllImages">
        <Skeleton class="modal-gallery-grid__img"/>
        <Skeleton class="modal-gallery-grid__img"/>
        <Skeleton class="modal-gallery-grid__img"/>
        <Skeleton class="modal-gallery-grid__img"/>
        <Skeleton class="modal-gallery-grid__img"/>
      </template>
    </div>
  </ModalDefaultLayout>
</template>

<script setup lang="ts">
import {useGalleryStore} from "../Gallery/store";
import ModalDefaultLayout from "~/components/Modal/layouts/ModalDefaultLayout.vue";
import Skeleton from "~/components/UiKit/Skeleton.vue";

const store = useGalleryStore();
const emits = defineEmits(["update:modelValue"]);

function changeImage(index: number) {
  emits("update:modelValue", false);
  setTimeout(() => {
    store.setSlideIndex(index);
  }, 400);
}

store.fetchAllImages();
</script>

<style scoped lang="scss">
.modal-gallery-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 30px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  &__img {
    display: block;
    object-fit: cover;
    width: 100%;
    height: 300px;
    cursor: pointer;
    @media (max-width: 380px) {
      height: 250px;
    }
    @media (max-width: 350px) {
      height: 200px;
    }
  }
}
</style>