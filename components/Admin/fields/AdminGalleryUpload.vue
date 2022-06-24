<template>
  <div class="admin-gallery-upload">
    <UploadFile
        :multiple="true" mod="uploadGallery" @uploaded="galleryUpload($event)"/>
    <teleport to="body">
      <transition name="fade">
        <ModalLoading v-if="!loadingEnd"/>
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {collection, doc, getFirestore, setDoc} from "firebase/firestore";
import imageCompression from "browser-image-compression";
import UploadFile from "~/components/UiKit/UploadFile.vue";
import ModalLoading from "~/components/Modal/ModalLoading.vue";
import {useGalleryStore} from "~/components/Gallery/store";
import {delay, readAsDataURL} from "~/helpers";

const loadingEnd = ref(true);
const galleryStore = useGalleryStore();
const imageCompressOptions = {
  maxSizeMB: 0.7,
  maxWidthOrHeight: 800,
  useWebWorker: true
};

async function galleryUpload(files: FileList) {
  loadingEnd.value = false;
  for (const file of files) {
    const documentRef = doc(collection(getFirestore(), "gallery"));
    const compressedFile = await imageCompression(file, imageCompressOptions);
    const encodedFile = await readAsDataURL(compressedFile);
    const resultDocument = {
      file: encodedFile.data,
      id: documentRef.id,
      order: new Date().getTime()
    };
    await delay(1000); // Задержка запросов для обхода ограничения firebase
    await setDoc(documentRef, resultDocument);
    galleryStore.$patch((state) => state.images.push(resultDocument));
  }
  loadingEnd.value = true;
}
</script>