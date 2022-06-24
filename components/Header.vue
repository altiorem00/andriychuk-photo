<template>
  <header class="header">
    <div class="header__link" @click="infoModal = true">info</div>
    <span class="header__separator"/>
    <div class="header__link" @click="galleryModal = true">grid</div>
    <Teleport to="body">
      <Transition name="fade">
        <ModalGallery v-if="galleryModal" v-model="galleryModal"/>
      </Transition>
      <Transition name="fade">
        <ModalInfo v-if="infoModal" v-model="infoModal"/>
      </Transition>
    </Teleport>
  </header>
</template>
<script setup lang="ts">
import {ref} from "vue";
import ModalGallery from "~/components/Modal/ModalGallery.vue";
import ModalInfo from "~/components/Modal/ModalInfo.vue";

const infoModal = ref(false);
const galleryModal = ref(false);
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;

  &__link {
    cursor: pointer;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: normal;
    letter-spacing: 0;
    padding: 10px 5px;
  }

  &__separator {
    display: inline-block;
    width: 19px;
    height: 1px;
    background-color: #000;
    margin: 0 5px;
    position: relative;
    top: 1px;
  }
}
</style>
