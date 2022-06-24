<template>
  <div class="admin-avatar">
    <UploadFile :url="modalStore.avatar" @uploaded="avatarUpload($event)" />
  </div>
</template>

<script setup lang="ts">
import {doc, getFirestore, setDoc} from "firebase/firestore";
import imageCompression from "browser-image-compression";
import {useModalStore} from "~/components/Modal/store";
import UploadFile from "~/components/UiKit/UploadFile.vue";
import {readAsDataURL} from "~/helpers";

const db = getFirestore();
const modalStore = useModalStore();
const imageCompressOptions = {
  maxSizeMB: 0.7,
  maxWidthOrHeight: 800,
  useWebWorker: true
};

async function avatarUpload(files: FileList) {
  const compressedFile = await imageCompression(files[0], imageCompressOptions);
  const encodedFile = await readAsDataURL(compressedFile);
  await setDoc(doc(db, "info", "avatar"), {image: encodedFile.data});
  modalStore.$patch((state) => state.avatar = encodedFile.data);
}

modalStore.fetchAvatar();
</script>
