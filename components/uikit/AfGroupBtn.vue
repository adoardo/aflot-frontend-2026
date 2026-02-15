<template>
  <div class="reg-sailor-buttons">
    <button class="reg-sailor-button reg-sailor-blue" @click="emitRegister">
      Зарегистрироваться
      <span>→</span>
    </button>
    <button class="reg-sailor-button about-button-blue about-button-blue-back" @click="openLkModal()">
      <span>←</span>
      Назад
    </button>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";
const emit = defineEmits(["register"]);
import { useModalStore } from "~/store/modal";

const { closeModal, toggleModal, openModal } = useModalStore();

function openLkModal() {
  closeModal('seilor');
  closeModal('company');
  openModal('lk');
}

function emitRegister() {
  emit("register");
}

</script>

<style lang="scss" scoped>
  .about-button-blue-back {
    color: gray;
  }
</style>
