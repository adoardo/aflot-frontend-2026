<template>
  <ClientOnly>
    <NuxtLayout name="default-hero" @click="hideFilters()">
      <div class="section-hero">
        <AfCustomHeader/>
        <div class="hero">
          <div class="container">
            <div class="hero-block">
              <h1 class="hero-title">Вакансии компании "{{company.company_name}}"</h1>
            </div>
          </div>
        </div>
        <div class="vabout-top">
          <div class="container">
            <div class="vabout-top-block">
              <div class="vabout-pag">
                <a href="/" class="vabout-pag-link"><text class="vabout-cursor">←</text>Главная</a>
                <a href="/vacancies" class="vabout-pag-link">Морские вакансии</a>
                <a class="vabout-pag-link">"{{company.company_name}}"</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="section-flot section-res">
        <div class="container">
          <div class="flot">
            <h2 class="search-title">Вакансий под заданные критерии: <span>{{vacancies_total}}</span></h2>
            <div class="flot-block flot-block-side flot-block-vak">
              <div class="flot-info">
                <div class="flot-content flot-content-search">
                  <div class="vacancy-list search-vacancy-list">
                    <VacancyDefaultItem
                        v-for="(item, i) in vacancies"
                        :data="item"
                        :key="'vacancies-item-' + i"
                    />
                  </div>
                </div>

                <div v-if="total_pages > 0 && total_pages < 8" class="flot-nav news-nav">
                  <a v-show="current_page !== 1 && total_pages > 1" @click="fetchVacancies(1, false);"
                    class="flot-nav__prev flot-nav__a">
                    <img src="assets/img/flot/prev.svg" alt="image"/>
                  </a>

                  <div class="flot-nav__block">
                    <a v-for="i of total_pages" :key="'pag-item-' + i" @click="fetchVacancies(i, false);" class="flot-nav__a"
                      :class="{ 'active':current_page === i }">{{ i }}</a>
                  </div>

                  <a v-show="current_page !== total_pages && total_pages > 1" @click="fetchVacancies(total_pages, false);"
                    class="flot-nav__next flot-nav__a">
                    <img src="assets/img/flot/next.svg" alt="image"/>
                  </a>
                </div>

                <div v-if="total_pages > 7" class="flot-nav news-nav">
                  <a v-show="current_page !== 1 && total_pages > 1" @click="fetchVacancies(1, false);"
                    class="flot-nav__prev flot-nav__a">
                    <img src="assets/img/flot/prev.svg" alt="image"/>
                  </a>

                  <div class="flot-nav__block">
                    <template v-for="i of total_pages" :key="'pag-item-' + i">
                      <a v-if="(i < 6 || i === total_pages)" @click="fetchVacancies(i, false);" class="flot-nav__a"
                        :class="{ 'active':current_page === i }">{{ i }}</a>
                      <a v-if="(i > 6 && i !== total_pages) && hidden_pages" :key="'pag-item-' + i"
                        @click="fetchVacancies(i, false);" class="flot-nav__a"
                        :class="{ 'active':current_page === i }">{{ i }}</a>
                      <a v-if="i === 7 && !hidden_pages" @click="hidden_pages = !hidden_pages" class="flot-nav__a">...</a>

                    </template>
                  </div>

                  <a v-show="current_page !== total_pages && total_pages > 1" @click="fetchVacancies(total_pages, false);"
                    class="flot-nav__next flot-nav__a">
                    <img src="assets/img/flot/next.svg" alt="image"/>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      <AfCustomFooter/>
    </NuxtLayout>
  </ClientOnly>
</template>

<script setup>
// definePageMeta({
//   middleware: ["company"],
// })
import api from "@/api/api";
import {computed, ref} from "vue";

const userStore = useUsersStore();
const {userInfo, isAuth, userProfileId} = storeToRefs(userStore)

import VacancyDefaultItem from "~/components/list/VacancyDefaultItem";

const fetchedData = ref({})
const vacancies = ref([]);
const vessels = ref([]);
const company = ref({});
const total_pages = ref(0);
const current_page = ref(1);
const hidden_pages = ref(false);
const vacancies_total = ref(0)


const route = useRoute()


import {useUsersStore} from "~/store/useUserStore";


import {useGlobalSettings} from "~/store/useGlobalSettings";

const globalSettings = useGlobalSettings();
const {getAfJobs, getAfShips, getAfContractDuration, getCurrentShip} = storeToRefs(globalSettings)

const fetchVacancies = async (page, useFilter = true) => {

  try { 
    fetchedData.value = await api.get("/all-vacancies/company/" + route.params.companyId + "?page="+ page);

    vacancies.value = fetchedData.value.data.vacancies
    vessels.value = fetchedData.value.data.vessels
    company.value = fetchedData.value.data.company
    total_pages.value = fetchedData.value.data.total_pages
    current_page.value = fetchedData.value.data.current_page
    vacancies_total.value = fetchedData.value.data.total_vacancies

    for (let i = 0; i < vacancies.value.length; i++) {
      vacancies.value[i].company_id = false
      vacancies.value[i].photo_path = fetchedData.value.data.company.photo_path
      for (let j = 0; j < vessels.value.length; j++) {
        if (vacancies.value[i].vessel === vessels.value[j].id) {
          vacancies.value[i].vessel_data = vessels.value[j]
          break;
        }
      }

      if (isAuth && userInfo.value.info.role == 'Моряк') {
        let responded = false;
        if (vacancies.value[i].responses) {
          for (let k = 0; k < vacancies.value[i].responses.length; k++) {
            if (userProfileId.value.resumeID == vacancies.value[i].responses[k]) {
              responded = true;
              break;
            }
          }
        }

        if (responded) {
          vacancies.value[i].response_id = false
        } else {
          vacancies.value[i].response_id = userProfileId.value.resumeID
        }

      }

      vacancies.value[i].company_name = company.value.company_name

      let tmpFrom = vacancies.value[i].date_of_departure_from.split('-');
      let tmpTo = vacancies.value[i].date_of_departure_to.split('-');
      vacancies.value[i].departureDateDisplay = 'с ' + tmpFrom[2] + '.' + tmpFrom[1] + '.' + tmpFrom[0] + ' по ' + tmpTo[2] + '.' + tmpTo[1] + '.' + tmpTo[0]

    }

  } catch (error) {
    console.log(error);
  }
}

fetchVacancies(1, false);

</script>

<style lang="scss" scoped>
.mor-nav-item {
  min-height: 82px;
  display: flex;
  border-right: solid 1px #d5d7ef;
  flex-direction: column;
  justify-content: center;
}

.mor-nav-part {
  min-height: 40px;
  width: 100%;
}

.mor-input-search {
  min-height: 22px;
}

.mor-date-inp {
  width: 60%;
  padding: 0px 20%;
}

.mor-nav-date > label {
  width: 60%;
  padding: 0px 20%;
  padding-bottom: 5px;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  background: transparent;
  bottom: 0;
  color: transparent;
  cursor: pointer;
  height: auto;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: auto;
}

.select.mor-input.mor-input-zp {
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 60%;
  padding: 0px 20%;

  > label {
    padding-bottom: 5px;
  }

  > div {
    white-space: nowrap;
    color: #222;
  }
}

.flot-content,
.flot-info {
  max-width: 100%;
}

</style>
