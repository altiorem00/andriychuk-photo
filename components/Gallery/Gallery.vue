<template>
  <div ref="galleryRef" class="gallery">
    <div
        v-for="(image, index) in store.getImages"
        :key="image.id"
        ref="galleryRef"
        class="gallery__wrapper"
        :class="{
          active: currentImage === index,
          'next': index === getNext,
          'prev': index === getPrev,

        }"
    >
      <img
          class="gallery__img"
          :src="image.file"
          alt=""
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch, computed, onUnmounted} from "vue";
import {useGalleryStore} from "./store";
import {useNotificationStore} from "~/components/UiKit/Notifications/store";

const store = useGalleryStore();
const currentImage = ref(0);
const isAnimationEnd = ref(true);
const galleryRef = ref<HTMLElement>();

let touchstartPoint: TouchEvent | null = null;
let touchOffset = 0;

const getPrev = computed(() => {
  if (currentImage.value === 0) {
    return store.getImages.length - 1;
  } else {
    return currentImage.value - 1;
  }
});

const getNext = computed(() => {
  if (currentImage.value === store.getImages.length - 1) {
    return 0;
  } else {
    return currentImage.value + 1;
  }
});

function slideNext() {
  if (isAnimationEnd.value && currentImage.value !== store.getImages.length - 1) {
    currentImage.value++;
    setAnimationDelay();
  }
}

function slidePrev() {
  if (isAnimationEnd.value && currentImage.value !== 0) {
    currentImage.value--;
    setAnimationDelay();
  }
}

function setAnimationDelay() {
  isAnimationEnd.value = false;
  setTimeout(() => {
    isAnimationEnd.value = true;
  }, 1800);
}

watch(() => store.indexForSlide, (index) => currentImage.value = index);
watch(() => currentImage.value, (index) => {
  if (store.loadedImagesCount - index === 3) {
    store.fetchImages(5).catch(() => {
      const notificationStore = useNotificationStore();
      notificationStore.showNotification("error", "Не удалось загрузить изображения");
    });
  }
});

onMounted(() => {
  document.body.style.overflow = "hidden";
  galleryRef.value?.addEventListener("touchstart", function (e: TouchEvent) {
    touchstartPoint = e;
  });
  galleryRef.value?.addEventListener("touchmove", function (e) {
    if (touchstartPoint && e.touches.length === 1) {
      touchOffset = (e.touches[0].pageY - touchstartPoint.touches[0].pageY);
      if (Math.abs(touchOffset) > 150) {
        if (touchOffset > 0) {
          slidePrev();
        } else {
          slideNext();
        }
      }
    }
  });
  galleryRef.value?.addEventListener("touched", () => touchstartPoint = null);
  galleryRef.value?.addEventListener("click", slideNext);
  galleryRef.value?.addEventListener("wheel", (event) => {
    if (event.deltaY > 0) {
      slideNext();
    } else {
      slidePrev();
    }
  });
});
onUnmounted(() => document.body.style.overflow = "visible");
</script>

<style scoped lang="scss">
.gallery {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  &__wrapper {
    height: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    filter: grayscale(1);
    transition: clip-path .7s cubic-bezier(0.5, 1, 0.89, 1) 0s, filter .0s ease-in-out .9s, opacity .0s ease-in-out .9s;
    will-change: clip-path, filter, opacity;
    clip-path: inset(0% 0% 100% 0);

    &.prev {
      clip-path: inset(0% 0% 100% 0);
    }

    &.next {
      clip-path: inset(100% 0% 0% 0);
    }

    &.active {
      clip-path: inset(0% 0% 0% 0) !important;
      transition: clip-path .7s cubic-bezier(0.5, 1, 0.89, 1) .9s, filter .2s ease-in-out 1.4s, opacity .0s ease-in-out .0s;
      filter: grayscale(0);
      opacity: 1;
    }

  }

  &__img {
    display: block;
    width: inherit;
    height: inherit;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    &__wrapper {
      max-width: 100%;
      width: 100%;
    }
  }
}
</style>
