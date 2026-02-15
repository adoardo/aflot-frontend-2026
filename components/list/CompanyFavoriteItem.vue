<template>
  <div class="company">
    <div v-if="data.photo_path" class="company__logo">
      <img :src="data.photo_path" :alt="data.company_name">
    </div>
    <div v-else class="company__logo">
      <div class="bordered bordered-ct-logo">
        <img id="imgInpPreview" src="assets/img/header/logo-white.png" alt="avatar"/>
        <span>{{ data.company_name }}</span>
        <text>&#9875;</text>
      </div>
    </div>
    <div class="company__label">{{ data.company_name }}</div>
    <div class="company__info">
      <div class="ci-item">
        <div class="ci-label">Локация</div>
        {{ data.company_address }}
      </div>
      <div class="ci-item">
        <div class="ci-label">На проекте с:</div>
        {{ afDate }}
      </div>
    </div>
    <div class="company__buttons">
      <a :href="'/vacancy/'+data._id" class="company__button red"><img src="assets/img/responses/more.png" alt="">
        Активных вакансий: {{ data.vacs_count }}
      </a>
      <a @click="cancelFavoriteCompany(data._id)" class="company__button"><img src="assets/img/responses/cancel.png" alt="">
        Убрать из избранного
      </a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {},
});

import {ref} from "vue";
import api from "@/api/api";

const afDate = ref('');

const mon = [
  'января',
  'февраля',
  'мая',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
]

let tdate = props.data.created_at.split('T')[0];
tdate = tdate.split('-');
afDate.value = parseInt(tdate[2]) + ' ' + mon[tdate[1] - 1].toUpperCase() + ' ' + tdate[0]

const cancelFavoriteCompany = async (id) => {
  try {
    await api.post("/all-vacancies-favorite/company-cancel/" + id).then((res) => {
      console.log(res);
      window.location.reload()
    });
  } catch (e) {
    console.log(e);
  }
}
</script>

<style lang="scss" scoped>
.company__buttons > a:hover {
  text-decoration: underline;
}

.bordered-ct-logo {
  background: #3b45a9;
  padding: 15px;
  position: relative;
  width: 131px;
  height: 131px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  span {
    color: #fff;
  }

  img {
    position: absolute;
    top: 12px;
    height: 12px;
  }

  text {
    position: absolute;
    bottom: 12px;
  }
}
</style>
