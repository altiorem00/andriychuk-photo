import { initializeApp } from "firebase/app";

export default defineNuxtPlugin(() => {
  initializeApp({
    apiKey: "AIzaSyDBTeOicH9MukoNZ2GOcZopWHMo3E9dEco",
    authDomain: "andriychuk-2d5ce.firebaseapp.com",
    projectId: "andriychuk-2d5ce",
    storageBucket: "andriychuk-2d5ce.appspot.com",
    messagingSenderId: "792148635757",
    appId: "1:792148635757:web:854850a1671d646313cf64"
  });
});