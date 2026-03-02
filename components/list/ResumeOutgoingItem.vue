<template>
  <div class="vacancy vacancy-item-off">
    <div class="vacancy-top-off">

      <div v-if="data.photo_path" class="vacancy__logo">
        <img :src="data.photo_path" alt="logo"/>
      </div>
      <div v-else class="vacancy__logo vacancy__logo_empty">
        <div class="ed-lk-fn-ln">
          {{ data.last_name.substring(0, 1).toUpperCase() }}
          {{ data.first_name.substring(0, 1).toUpperCase() }}
        </div>
        <img src="assets/img/header/logo-white.png" alt="logo"/>
        <text>⚓</text>
      </div>

      <div class="vacancy-content-off">
        <div class="vacancy__label">
          {{ data.first_name }} {{ data.last_name }} <br v-if="data.patronymic">
          {{ data.patronymic }}
          <img src="assets/img/dop-page/icon-red.svg" alt="image">
        </div>
        <div class="vacancy__meta">
          <div class="vacancy__info">
            <div class="vi-item">
              <div class="vacancy-subwork-off">
                {{convertPositions(data.positions)}}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="vacancy__meta">
      <div class="vacancy__info">
        <div class="vi-item">
          <div class="vi-label">Минимальная зарплата:</div>
          <strong v-if="data.salary">{{ data.salary }} ₽</strong>
          <strong v-else>не указана</strong>
        </div>
        <div class="vi-item">
          <div class="vi-label">Местонахождение:</div>
          {{ convertLocation(data) }}
        </div>
        <Worked :data="data"/>
      </div>
    </div>

    <div class="vacancy__buttons">
      <a :href="'/sailor/'+data._id" target="_blank" class="vacancy__button red">
        <img src="assets/img/responses/more.png" alt="">Подробнее
      </a>

      <div @click="cancelOffer(vacancy, data._id)" class="vacancy__button"><img
          src="assets/img/responses/cancel.png" alt="">Отменить предложение
      </div>

      <div class="vacancy__date new vacancy-dateoff vacancy__date-blue">
        <div class="vacancy-dateoff-text">
          Рассмотрю предложение
        </div>
        <div class="vacancy-off-date">
          {{ afDate }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import api from "@/api/api";

import convertAFDate from "../../utils/convertAFDate.js";
import convertLocation from "../../utils/convertLocation.js";
import convertPositions from "../../utils/convertPositions.js";

import Worked from "~/components/list/helpers/Worked.vue";

const props = defineProps({
  data: {},
  vacancy: {}
});
const afDate = ref(convertAFDate(props.data.created_at, true));

import { useModalStore } from "~/store/modal";
const modalStore = useModalStore();
const { openModal, closeModal } = modalStore;

const cancelOffer = async (vacancyId, sailorId) => {
  openModal('loader')
  try {
    await api.post("/all-vacancies/"+ vacancyId +"/offer_cancel/" + sailorId).then((res) => {
      window.location.reload();
    });
  } catch (e) {
    console.log(e);
  }
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
