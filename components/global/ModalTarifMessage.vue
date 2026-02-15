<template>
  <div style="padding-left: 20px;padding-right: 20px;"
      class="menu-reg menu-none menu-reg-sailor cabinet"
      id="modal-response"
      :class="{ 'menu-show': isOpen }"
  >
    <div class="modal-block">
      <div class="modal-pred__top">
        <h2 class="modal-title">
          Спасибо!
        </h2>
        <!-- /.modal-title -->
        <img style="position: absolute;right: 20px;top: 20px;" @click="closeModal('tarifmessage')" class="js-modal-close modal-close" src="assets/img/modal/close.png" alt="image">

      </div>
      <div v-html="msg" class="suda-item__text"></div>

      <div class="modal-pred__buttons">
        <button @click="router.push('/company/new');" class="modal-button-blue modal-button-red js-modal-close">
          Добавить вакансию
        </button>
        <!-- /.modal-button-blue -->

        <button @click="router.push('/company/vacansies');" class="modal-button-blue js-modal-close">
          Список вакансий
        </button>
        <!-- /.modal-button-blue -->
      </div>

      <!-- /.modal-button-blue -->

    </div>

  </div>
  <div
      :class="['header-overlay', { 'header-overlay__active': isOpen }]"
      @click="closeModal('tarifmessage')"
  ></div>
</template>

<script setup>
import {useModalStore} from "~/store/modal";
import watchScrollModal from "~/utils/watchScrollModal";

import { useRouter } from 'vue-router';

const router = useRouter();

const {closeModal} = useModalStore();

const props = defineProps({
  isOpen: {
    type: Boolean,
  },
  msg: {
    type: String,
    default: 'Ошибка. Пожалуйста, попробуйте позже.',
  },
});

watch(() => props.isOpen, watchScrollModal)
</script>

<style scoped></style>