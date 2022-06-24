import { defineStore } from "pinia";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { TGallery } from "~/components/Gallery/types";
import { useNotificationStore } from "~/components/UiKit/Notifications/store";

export const useGalleryStore = defineStore({
  id: "gallery-store",
  state: () => {
    return {
      images: [] as TGallery,
      indexForSlide: 0,
      loadedImagesCount: 0,
      lastOrder: 0,
      loadedAllImages: false,
    };
  },
  actions: {
    setSlideIndex(index: number) {
      this.indexForSlide = index;
    },
    fetchImages(count: number): Promise<boolean | Error> {
      const db = getFirestore();
      const q = query(
        collection(db, "gallery"),
        where("order", ">", this.lastOrder),
        orderBy("order", "asc"),
        limit(count)
      );
      return getDocs(q)
        .then((docs) => {
          docs.forEach((doc) => {
            if (doc.id !== "fakeDocument") this.images.push(doc.data());
          });
          if (docs.docs.length) {
            this.loadedImagesCount += count;
            this.lastOrder = docs.docs[docs.size - 1].data().order;
            return true;
          } else {
            return false;
          }
        })
        .catch((error) => {
          const notificationStore = useNotificationStore();
          notificationStore.showNotification(
            "error",
            "Не удалось загрузить изображения"
          );
          return error;
        });
    },
    fetchAllImages() {
      const recursiveFetchImages = (): Promise<boolean> =>
        this.fetchImages(5).then((next) =>
          next ? recursiveFetchImages() : true
        );
      return recursiveFetchImages().then(() => (this.loadedAllImages = true));
    },
  },
  getters: {
    getImages(): TGallery {
      return this.images;
    },
  },
});
