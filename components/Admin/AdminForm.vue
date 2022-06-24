<template>
  <div class="admin-form__wrapper">
    <form class="admin-form" @submit.prevent="setAuth">
      <span v-if="message" class="admin-form__message">{{ message }}</span>
      <TextField v-model="email" class="admin-form__field" :required="true" type="email" placeholder="Логин" />
      <TextField v-model="password" class="admin-form__field" :required="true" type="password" placeholder="Пароль" />
      <BaseButton type="submit">Войти</BaseButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {ref} from "vue";
import TextField from "~/components/UiKit/Form/TextField.vue";
import BaseButton from "~/components/UiKit/BaseButton.vue";

const emits = defineEmits(["success"]);

const email = ref("");
const password = ref("");
const message = ref("");

function setAuth() {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((response) => {
      localStorage.setItem("token", response.user.accessToken);
      emits("success");
    })
    .catch((error) => {
      message.value = error.message;
    });
}
</script>
<style lang="scss">
.admin-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;

  &__wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__field {
    & + & {
      margin-top: 24px;
    }
  }

  &__message {
    margin-bottom: 16px;
  }
}
</style>