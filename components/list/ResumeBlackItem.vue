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
        <div class="vacancy__label">{{ data.first_name }} {{ data.last_name }} <br v-if="data.patronymic"> {{ data.patronymic }}</div>
        <div class="vacancy__meta">
          <div class="vacancy__info">
            <div v-if="data.blc.comment" class="vi-item">
              <div class="vi-label">Комментарий</div>{{data.blc.comment}}
            </div>
            <div v-else class="vi-item">
              <div class="vi-label">Комментарий</div>-
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vacancy__buttons">
      <a target="_blank" :href="'/sailor/'+data._id" class="vacancy__button red">
        <img src="assets/img/dop-page/red-info.svg" alt="image"> Подробнее о моряке </a>
      <div class="vacancy__button" @click="removeBL(data._id)">
        <img src="assets/img/responses/cancel.png" alt=""> Убрать из черного списка
      </div>
    </div>
    <div class="vacancy__date">
      <div class="vacancy-dateoff-text">Добавлен - {{afDate}}</div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import api from "@/api/api";

import convertAFDate from "../../utils/convertAFDate.js";

const props = defineProps({
  data: {}
});
const afDate = ref(convertAFDate(props.data.blc.created_at, true))

const removeBL = async (sailorId) => {
  await api.post("/resumes/blacklist/remove/" + sailorId).then((data) => {
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
