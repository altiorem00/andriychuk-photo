<template>
  <teleport to="body">
    <Transition name="alert">
      <div v-if="notificationStore.message" class="error-notification">
        {{ notificationStore.message }}
      </div>
    </Transition>
  </teleport>
</template>

<script setup lang="ts">
import {useNotificationStore} from "~/components/UiKit/Notifications/store";

const notificationStore = useNotificationStore();
</script>

<style scoped lang="scss">
.error-notification {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translate(-50%, 0px);
  border: 1px solid rgba(196, 53, 53, 0.99);
  padding: 16px 24px;
  border-radius: 6px;
  color: #C43535FC;
  backdrop-filter: blur(3px);
  background-color: rgba(255, 255, 255, 0.4);
  max-width: 300px;
}
</style>