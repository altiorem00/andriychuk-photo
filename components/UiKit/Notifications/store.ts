import { defineStore } from "pinia";

export const useNotificationStore = defineStore({
  id: "notification-store",
  state: () => {
    return {
      message: "",
      type: "",
    };
  },
  actions: {
    showNotification(type: string, message: string) {
      this.type = type;
      this.message = message;
      setTimeout(() => {
        this.message = "";
      }, 3000);
    },
  },
});
