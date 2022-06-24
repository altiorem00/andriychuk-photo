<template>
  <ModalDefaultLayout
      :light="true"
      @close="emits('update:modelValue')"
  >
    <div class="modal-info">
      <div class="modal-info__img">
        <img :src="store.avatar" alt="">
        <a href="https://www.instagram.com/andrychuk.a/">instagram</a>
        <a href="https://vk.com/syncip">vk</a>
      </div>
      <p class="modal-info__text">
        {{ store.about }}
      </p>
    </div>
  </ModalDefaultLayout>
</template>

<script setup lang="ts">
import {useModalStore} from "~/components/Modal/store";
import ModalDefaultLayout from "~/components/Modal/layouts/ModalDefaultLayout.vue";

const {fetchAbout, fetchAvatar} = useModalStore();
const store = useModalStore();
const emits = defineEmits(["update:modelValue"]);

fetchAbout();
fetchAvatar();
</script>

<style lang="scss">
.modal-info {
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }

  &__text {
    max-width: 400px;
    margin: 0;
  }

  &__img {
    margin-right: 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    @media (max-width: 768px) {
      margin-bottom: 16px;
    }

    a {
      color: #333;
      text-decoration: none;
      margin-top: 12px;
      border-bottom: 1px solid #333;
      width: max-content;
    }

    img {
      height: 200px;
      display: block;
      object-fit: contain;
    }
  }
}
</style>