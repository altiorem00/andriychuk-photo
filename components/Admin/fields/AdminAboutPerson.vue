<template>
  <div class="admin-about-person">
    <TextareaField v-model="info" rows="4" placeholder="описание"/>
  </div>
</template>

<script setup lang="ts">
import {watch, ref} from "vue";
import {doc, getFirestore, setDoc} from "firebase/firestore";
import {useModalStore} from "~/components/Modal/store";
import TextareaField from "~/components/UiKit/Form/TextareaField.vue";

const timeout = ref<ReturnType<typeof setTimeout>>();
const docRefInfo = doc(getFirestore(), "info", "about");
const info = ref("");
const modalStore = useModalStore();

function uploadInfo() {
  clearTimeout(timeout.value);
  timeout.value = setTimeout(() => {
    setDoc(docRefInfo, {text: info.value});
  }, 700);
}

watch(info, uploadInfo);

modalStore.fetchAbout().then(() => info.value = modalStore.about);
</script>
