<template>
  <div class="admin-cabinet">
    <div class="admin-cabinet__title">Блок с информацией</div>
    <div class="admin-cabinet__info">
      <AdminAvatar/>
      <AdminAboutPerson class="admin-cabinet__info-about"/>
    </div>
    <div class="admin-cabinet__title">Галлерея</div>
    <AdminGalleryList/>
  </div>
</template>

<script setup lang="ts">
import AdminAvatar from "~/components/Admin/fields/AdminAvatar.vue";
import AdminAboutPerson from "~/components/Admin/fields/AdminAboutPerson.vue";
import AdminGalleryList from "~/components/Admin/AdminGalleryList.vue";
</script>

<style lang="scss">
.admin-cabinet {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0px 24px 48px;

  &__title {
    font-weight: 600;
    font-size: 36px;
    line-height: 48px;
    margin: 24px 0px 36px;
    @media (max-width: 768px) {
      font-size: 26px;
      line-height: 36px;
      margin: 16px 0px;
    }
  }

  &__info {
    display: flex;

    &-about {
      margin-left: 16px;
      width: 100%;
      max-width: 400px;
    }

    @media (max-width: 768px) {
      flex-direction: column;
      &-about {
        margin-left: 0px;
        margin-top: 16px;
      }
    }
  }
}
</style>