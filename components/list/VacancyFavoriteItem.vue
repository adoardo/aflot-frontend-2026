<template>
  <div class="vacancy">
    <div class="vacancy__label-top">
      <div class="vacancy__label">
        <text>{{ data.position }}</text>
        <img src="assets/img/responses/fav.png" alt=""/>
      </div>
      <div style="display: none" class="vacancy__logo">
        <img src="assets/img/flot/logo-cart.png" alt="logo"/>
      </div>
    </div>
    <div class="vacancy__meta">
      <div v-if="data.company_id" class="vacancy__company" style="cursor: pointer;">
        <img src="assets/img/responses/company.png" alt=""/><a :href="'/company/vacancies/'+data.company_id" target="_blank">{{ data.company_name }}</a>
      </div>
      <div v-if="data.vessel" class="vacancy__ship" style="cursor: pointer;">
        <img src="assets/img/responses/ship.png" alt=""/><a :href="'/navy/vacancies/'+data.vessel" target="_blank">{{ data.vessel_data.vessel_name }}</a>
      </div>
    </div>

    <div class="vacancy__info">
      <div class="vi-item">
        <div class="vi-label">Зарплата:</div>
        <strong v-if="data.salary_from && data.salary_to">{{ data.salary_from }} - {{ data.salary_to }} ₽</strong>
        <strong v-if="data.salary_from && !data.salary_to">от {{ data.salary_from }} ₽</strong>
        <strong v-if="!data.salary_from && data.salary_to">до {{ data.salary_to }} ₽</strong>
        <strong v-if="!data.salary_from && !data.salary_to">не указана</strong>
      </div>
      <div class="vi-item">
        <div class="vi-label">Дата посадки:</div>
        {{ data.departureDateDisplay }}
      </div>
      <div class="vi-item">
        <div class="vi-label">Длит-ть контракта:</div>
        {{ data.contract_duration }}
      </div>
    </div>

    <div class="vacancy__buttons">
      <div class="vacancy__button red" @click="goVacancyInfo(data.id)">
        <img src="assets/img/responses/more.png" alt=""/>Подробнее
      </div>

      <div class="vacancy__button" @click="cancelFavoriteVacancy(data.id)">
        <img src="assets/img/responses/cancel.png" alt="">
        Убрать из избранного
      </div>
    </div>

    <div class="vacancy__date">{{ afDate }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {},
});

import {ref} from "vue";
import api from "@/api/api";

import {useModalStore} from "~/store/modal";
import {useUsersStore} from "~/store/useUserStore";


const userStore = useUsersStore();
const {userInfo, isAuth} = storeToRefs(userStore)
const {openModalAfNotifications, toggleModal, closeModal} = useModalStore();

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

const cancelFavoriteVacancy = async (vacancyId, position) => {

  try {
    await api.post("/all-vacancies-favorite/vacancy-cancel/" + vacancyId).then((res) => {
      console.log(res);
      window.location.reload()
    });
  } catch (e) {
    console.log(e);
  }

}
const goVacancyInfo = async (vacancyId) => {
  window.location.href = '/vacancy/' + vacancyId
}
</script>

<style lang="scss" scoped>
.vacancy__button.vacancy_disabled_button {
  cursor: default;
  text-decoration: none;
  color: #3fb05d;

  img {
    width: 24px;
  }
}

.vacancy__label {
  min-height: 46px;
  flex-wrap: nowrap;
}
</style>
