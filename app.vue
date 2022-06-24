<template>
  <NuxtLayout>
    <NuxtPage/>
    <ErrorNotification v-if="notificationStore.type === 'error'"/>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {useNotificationStore} from "~/components/UiKit/Notifications/store";
import ErrorNotification from "~/components/UiKit/Notifications/ErrorNotification.vue";

const notificationStore = useNotificationStore();
</script>

<style scoped>

</style>