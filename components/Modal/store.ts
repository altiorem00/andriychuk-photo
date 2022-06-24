import { defineStore } from "pinia";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { TEncodedGalleryImage } from "~/firebase/types";
import { useNotificationStore } from "~/components/UiKit/Notifications/store";

export const useModalStore = defineStore({
  id: "modal-store",
  state: () => {
    return {
      avatar: null as TEncodedGalleryImage,
      about: "",
    };
  },
  actions: {
    fetchAvatar() {
      return getDoc(doc(getFirestore(), "info", "avatar"))
        .then((docSnap) => (this.avatar = docSnap.data()?.image))
        .catch((error) => {
          const notificationStore = useNotificationStore();
          notificationStore.showNotification(
            "error",
            "Не удалось загрузить информацию"
          );
          return error;
        });
    },
    fetchAbout() {
      return getDoc(doc(getFirestore(), "info", "about"))
        .then((docSnap) => (this.about = docSnap.data()?.text))
        .catch((error) => {
          const notificationStore = useNotificationStore();
          notificationStore.showNotification(
            "error",
            "Не удалось загрузить информацию"
          );
          return error;
        });
    },
  },
});
