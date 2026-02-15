<template>
  <div class="vacancy vacancy-item-off">
    <div class="vacancy-top-off">
      <div class="vacancy__logo">
        <img src="assets/img/search/man.png" alt="logo">
      </div>
      <div class="vacancy-content-off">
        <div class="vacancy__label">Жагров Денис Федорович </div>
        <div class="vacancy__meta">
          <div class="vacancy__info">
            <div class="vi-item">
              <div class="vi-label">Комментарий</div> Не сошлись характером
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vacancy__buttons">
      <a href="/aboui-sailor" class="vacancy__button red">
        <img src="assets/img/dop-page/red-info.svg" alt="image"> Подробнее о моряке </a>
      <div class="vacancy__button">
        <img src="assets/img/responses/cancel.png" alt=""> Убрать из черного списка
      </div>
    </div>
    <div class="vacancy__date">
      <div class="vacancy-dateoff-text">Добавлен - 23 дек 2024</div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

import { useModalStore } from "@/store/modal";
const { openOfferModal, openModal, closeModal, toggleModal, openModalCommon } = useModalStore();

import { useUsersStore } from "~/store/useUserStore";
const userStore = useUsersStore();
const { userInfo, isAuth } = storeToRefs(userStore)

const showAllWorked = ref(false);
const props = defineProps({
  data: {},
  company: {},
});

const goResumeInfo = async (sailorId) => {
  window.location.href = '/sailor/' + sailorId
}

</script>

<style lang="scss" scoped>
.vacancy__logo_empty {
  position: relative;
}

.vacancy__logo_empty .ed-lk-fn-ln {
  width: 107px;
  height: 107px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  background-color: #3b45a9;
  font-size: 26px;
}

.vacancy__logo_empty text {
  position: absolute;
  bottom: 5px;
  left: calc(50% - 14px);
  font-size: 20px;
  filter: grayscale(1) brightness(2);
  opacity: 0.6;
}

.vacancy__logo_empty img {
  position: absolute;
  top: 14px;
  display: flex;
  width: auto;
  left: calc(50% - 32px);
  height: 12px;
  opacity: 0.8;
}
</style>
