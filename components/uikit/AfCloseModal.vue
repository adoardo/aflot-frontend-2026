<template>
  <div class="header-close menu-close-gray close-reg-about">
    <div class="header-close__text" id="close-reg-sailor" @click="closeModalCheck(modalName)">
      закрыть
      <span class="header-close__icon"></span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useModalStore } from "~/store/modal";

const props = defineProps({
  modalName: String,
});

const { closeModal } = useModalStore();

const closeModalCheck = async (modal) => {
  closeModal(modal);
  if (modal === 'modalAuthVerify') {
    closeModal('lk');
  }

}


</script>

<style lang="scss" scoped>
.header-close__text{
  display: flex;
  .header-close__icon::before ,.header-close__icon::after {
      background-color: #3b45a9;
  }

}
</style>
