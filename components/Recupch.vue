<template>
  <div class="recaptcha-wrapper">
    <div
      ref="recaptchaRef"
      class="g-recaptcha"
      :data-sitekey="SITE_KEY"
      data-callback="onRecaptchaSuccess"
    ></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "@/api/api";

const emit = defineEmits(["verified"]);
const recaptchaRef = ref(null);

const SITE_KEY = "6LeptQ8sAAAAAOczlk6huz1Fb0NWgSY6gbl-xvUI";

// Глобальный callback для Google reCAPTCHA
window.onRecaptchaSuccess = async function (token) {
  try {
    const { data } = await api.post("/verify-recaptcha", { token });

    if (data.success) {
      emit("verified", true);
    } else {
      emit("verified", false);
    }
  } catch (err) {
    console.error(err);
    emit("verified", false);
  }
};

function loadScript() {
  return new Promise((resolve) => {
    if (document.getElementById("recaptcha-script")) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.id = "recaptcha-script";
    script.src = "https://www.google.com/recaptcha/api.js?hl=ru";
    script.async = true;
    script.defer = true;
    script.onload = resolve;

    document.head.appendChild(script);
  });
}

onMounted(() => {
  loadScript();
});
</script>

<style scoped>
.recaptcha-wrapper {
  margin-bottom: 15px;
}
</style>
