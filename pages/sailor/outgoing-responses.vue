<template>
  <ClientOnly>
    <NuxtLayout name="default-hero" class="main cabinet">
        <div>
            <AfHeaderColor/>
        </div>
        <section id="responses">
            <div class="container">
              
                <div class="vacancy-start-title">
                    <a class="vacancy-link-off">
                        <span>←</span> Исходящие отклики по вакансии:
                    </a>
                </div>

                

                <div class="vacancy-list">

                  <div v-for="(item, i) in vacancies" :key="'vacancies-item-' + i" class="vacancy vacancy-item-off">
                    <div class="vacancy__label-top">
                      <div class="vacancy__label">
                        <text>{{item.position}}</text>
                        <img src="assets/img/responses/fav.png" alt=""/>
                      </div>
                      <div style="display: none" class="vacancy__logo">
                        <img src="assets/img/flot/logo-cart.png" alt="logo"/>
                      </div>
                    </div>
                    <div class="vacancy__meta">
                      <div v-if="item.company_id" class="vacancy__company" style="cursor: pointer;">
                        <img src="assets/img/responses/company.png" alt=""/><a :href="'/company/vacancies/'+item.company_id" target="_blank">{{ item.company_name }}</a>
                      </div>
                      <div v-if="item.vessel" class="vacancy__ship" style="cursor: pointer;">
                        <img src="assets/img/responses/ship.png" alt=""/><a :href="'/navy/vacancies/'+item.vessel" target="_blank">{{ item.vessel_data.vessel_name }}</a>
                      </div>
                    </div>

                    <div class="vacancy__info">
                      <div class="vi-item">
                        <div class="vi-label">Зарплата:</div>
                        <strong v-if="item.salary_from && item.salary_to">{{ item.salary_from }} - {{ item.salary_to }} ₽</strong>
                        <strong v-if="item.salary_from && !item.salary_to">от {{ item.salary_from }} ₽</strong>
                        <strong v-if="!item.salary_from && item.salary_to">до {{ item.salary_to }} ₽</strong>
                        <strong v-if="!item.salary_from && !item.salary_to">не указана</strong>
                      </div>
                      <div class="vi-item">
                        <div class="vi-label">Дата посадки:</div>
                        {{ item.departureDateDisplay }}
                      </div>
                      <div class="vi-item">
                        <div class="vi-label">Длит-ть контракта:</div>
                        {{ item.contract_duration }}
                      </div>
                    </div>

                    <div class="vacancy__buttons">
                      <div class="vacancy__button" @click="goVacancyInfo(item._id)">
                        <img src="assets/img/dop-page/blue-info.svg" alt="image">
                        Подробнее
                      </div>
                      <div class="vacancy__button" @click="cancelVacancyRespond(item._id)">
                        <img src="assets/img/responses/cancel.png" alt="">
                        Отменить отклик
                      </div>
                    </div>

                    <div class="vacancy__date">{{item.vacancyDate}}</div>
                  </div>

                </div>
            </div>
        </section>
        <AfCustomFooter :lnkStyle="'footer-block footer-block-transparent'"/>
    </NuxtLayout>
  </ClientOnly>
</template>

<script setup>
  definePageMeta({
    middleware: ["sailor"],
  })
import api from "@/api/api";
import {ref} from "vue";

const vacancies = ref({})
const fetchedData = ref({})

const fetchVacancies = async() => {

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

  const {data} = await api.get("/all-vacancies-responses");
  fetchedData.value = data
  vacancies.value = data.vacancies;

  for (let i = 0; i < vacancies.value.length; i++) {
    vacancies.value[i].company_id = data.companies[i].id
    vacancies.value[i].company_name = data.companies[i].company_name
    for (let j = 0; j < data.vessels.length; j++) {
      if (vacancies.value[i].vessel === data.vessels[j].id) {
        vacancies.value[i].vessel_data = data.vessels[j]
        break;
      }
    }
    let tmpFrom = vacancies.value[i].date_of_departure_from.split('-');
    let tmpTo = vacancies.value[i].date_of_departure_to.split('-');
    vacancies.value[i].departureDateDisplay = 'с ' + tmpFrom[2] + '.' + tmpFrom[1] + '.' + tmpFrom[0] + ' по ' + tmpTo[2] + '.' + tmpTo[1] + '.' + tmpTo[0]

    let tdate = vacancies.value[i].created_at.split('T')[0];
    tdate = tdate.split('-');
    vacancies.value[i].vacancyDate = parseInt(tdate[2]) + ' ' + mon[tdate[1] - 1].toUpperCase() + ' ' + tdate[0]
  }
}

fetchVacancies()

onMounted(() => {
  document.body.classList.add('bg-white');
});

const goVacancyInfo = async (vacancyId) => {
  window.location.href = '/vacancy/' + vacancyId
}
const cancelVacancyRespond = async (vacancyId) => {

  try {
    await api.post("/all-vacancies/" + vacancyId + "/respond_cancel").then((res) => {
      console.log(res);
      window.location.reload()
    });
  } catch (e) {
    console.log(e);
  }
}

</script>

<style lang="scss" scoped>

</style>