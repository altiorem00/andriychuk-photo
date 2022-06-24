<template>
  <div class="admin-gallery-list">
    <AdminGalleryUpload/>
    <TransitionGroup name="list">
      <UploadFile
          v-for="img in galleryStore.getImages" :id="img.id" :key="img.id" :url="img.file"
          @delete="deleteFile($event)"/>
    </TransitionGroup>
    <template v-if="!galleryStore.loadedAllImages">
      <Skeleton width="150px" height="200px"/>
      <Skeleton width="150px" height="200px"/>
      <Skeleton width="150px" height="200px"/>
      <Skeleton width="150px" height="200px"/>
      <Skeleton width="150px" height="200px"/>
    </template>
    <teleport to="body">
      <transition name="fade">
        <ModalLoading v-if="!loadingEnd"/>
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import {deleteDoc, doc, getFirestore} from "firebase/firestore";
import {ref} from "vue";
import {useGalleryStore} from "~/components/Gallery/store";
import Skeleton from "~/components/UiKit/Skeleton.vue";
import UploadFile from "~/components/UiKit/UploadFile.vue";
import AdminGalleryUpload from "~/components/Admin/fields/AdminGalleryUpload.vue";
import ModalLoading from "~/components/Modal/ModalLoading.vue";

const db = getFirestore();
const galleryStore = useGalleryStore();
const loadingEnd = ref(true);

async function deleteFile(id: string) {
  await deleteDoc(doc(db, "gallery", id));
  galleryStore.$patch((state) => state.images = state.images.filter(file => file.id !== id));
}
loadingEnd.value = false;
galleryStore.fetchAllImages().then(() => loadingEnd.value = true);
</script>

<style scoped lang="scss">
.admin-gallery-list {
  display: flex;
  flex-wrap: wrap;
  margin: -12px;

  & > * {
    margin: 12px;
    @media (max-width: 768px) {
      width: calc(50% - 24px);
      height: 250px;
    }
    @media (max-width: 380px) {
      width: calc(50% - 24px);
      height: 200px;
    }
  }
}
</style>