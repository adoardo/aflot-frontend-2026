<template>
  <div class="vacancy vacancy-item-off">
    <div class="vacancy-top-off">
      <div v-if="data.photo_path" class="vacancy__logo">
        <img :src="data.photo_path" alt="logo">
      </div>
      <div v-else class="vacancy__logo vacancy__logo_empty">
        <div class="ed-lk-fn-ln">
          {{ data.last_name.substring(0, 1).toUpperCase() }} {{ data.first_name.substring(0, 1).toUpperCase() }}
        </div>
        <img src="assets/img/header/logo-white.png" alt="logo"/>
        <text>⚓</text>
      </div>
      <div class="vacancy-content-off">
        <div class="vacancy__label">{{ data.first_name }} {{ data.last_name }} <br v-if="data.patronymic"> {{ data.patronymic }}
          <img src="assets/img/dop-page/icon-red.svg" alt="image"></div>
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
    <div class="vacancy__info">
      <div class="vi-item">
        <div class="vi-label">Минимальная зарплата:</div>
        <strong v-if="data.salary">{{ data.salary }} ₽</strong>
        <strong v-else>не указана</strong>
      </div>
      <div class="vi-item">
        <div class="vi-label">Местонахождение:</div>
        {{convertLocation(data)}}
      </div>
      <Worked :data="data"/>
    </div>

    <div class="vacancy__buttons">
      <div @click="openOfferModal('companyvac', data._id)" class="vacancy__button red"><img src="assets/img/dop-page/red-icon-sailor.svg" alt="image">Предложить
        <br>вакансию</div>
      <a target="_blank" :href="'/sailor/'+data._id" class="vacancy__button red"><img src="assets/img/dop-page/red-info.svg" alt="">
        Подробнее
        <br>о моряке
      </a>
      <div @click="removeFavorite(data._id)" class="vacancy__button"><img src="assets/img/responses/cancel.png" alt="">
        Убрать<br>
        из избранного
      </div>
    </div>

    <div v-if="false" class="vacancy__date new vacancy-dateoff">
      <div class="vacancy-dateoff-text">ищу работу</div>
    </div>

  </div>
</template>

<script setup>
import {ref} from "vue";
import api from "@/api/api";

import Worked from "~/components/list/helpers/Worked.vue";

import { useModalStore } from "@/store/modal";
const { openOfferModal} = useModalStore();

import convertPositions from "../../utils/convertPositions.js";
import convertLocation from "../../utils/convertLocation.js";

const props = defineProps({
  data: {}
});

const removeFavorite = async (sailorId) => {
  await api.post("/resumes/favorite/remove/" + sailorId).then((data) => {
    window.location.reload()
  });
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
