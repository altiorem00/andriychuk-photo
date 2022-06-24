<template>
  <main class="main-content">
    <Header/>
    <Gallery/>
    <Transition name="slide">
      <Preloader v-if="show" @end="show = false"/>
    </Transition>
  </main>
</template>

<script setup lang="ts">
import {ref} from "vue";
import Preloader from "../components/UiKit/Preloader.vue";
import Header from "../components/Header.vue";
import Gallery from "../components/Gallery/Gallery.vue";
import {useGalleryStore} from "~/components/Gallery/store";

useHead({
  title: "A.Andriychuk Photographer",
  charset: "utf-8",
  meta: [
    {name: "description", content: "Улицы моими глазами"}
  ],
});

const {fetchImages} = useGalleryStore();
const show = ref(true);

fetchImages(5);
</script>
<style lang="scss">
.main-content {
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 38px 0px 90px;
  background: #fff;
  @media (max-width: 768px) {
    padding: 23px 24px 75px;
  }
}
</style>