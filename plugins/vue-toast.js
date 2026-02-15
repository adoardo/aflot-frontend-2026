// plugins/toastification.js
import { createApp } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  const options = {
    // Настройте свои параметры здесь
  };

  nuxtApp.vueApp.use(Toast, options);
});
