<template>
  <div class="admin">
    <Transition name="fade">
      <AdminForm v-if="!success" @success="success = true"/>
    </Transition>
    <AdminCabinet v-if="success"/>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {doc, getDoc, getFirestore} from "firebase/firestore";
import AdminForm from "../components/Admin/AdminForm.vue";
import AdminCabinet from "../components/Admin/AdminCabinet.vue";

const success = ref(false);
const token = localStorage.getItem("token");

if (token) {
  const db = getFirestore();
  getDoc(doc(db, "user", "token")).then(
    (docSnap) => {
      if (docSnap.data()?.value === token) {
        success.value = true;
      }
    }
  );
}
</script>
