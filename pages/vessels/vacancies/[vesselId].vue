<template>
  <NuxtLayout name="default-hero" @click="hideFilters()">
    <div class="section-hero">
      <AfCustomHeader/>
      <div class="hero">
        <div class="container">
          <div class="hero-block">
            <h1 class="hero-title">Вакансии компании Aflot</h1>
          </div>
        </div>
      </div>
    </div>
    <section class="section-flot section-res">
      <div class="container">
        <div class="flot">

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
</template>

<script setup>
import api from "@/api/api";
import {computed, ref} from "vue";

import VacancyDefaultItem from "~/components/list/VacancyDefaultItem";

const fetchedData = ref({})
const vacancies = ref([]);
const vessels = ref([]);
const total_pages = ref(0);
const current_page = ref(1);
const hidden_pages = ref(false);

import {useUsersStore} from "~/store/useUserStore";

const userStore = useUsersStore();
const {userInfo, isAuth} = storeToRefs(userStore)

import {useGlobalSettings} from "~/store/useGlobalSettings";

const globalSettings = useGlobalSettings();
const {getAfJobs, getAfShips, getAfContractDuration, getCurrentShip} = storeToRefs(globalSettings)

const filterData = ref({
  positions: [],
  ships: [],
  date_of_departure: '',
  contract_duration: 'Период посадки',
  salary_from: 0,
  salary_to: 0
})

//@click="toggleModal('shipinfo'); setactiveship(item);"

const fetchVacancies = async (page, useFilter = true) => {

  try {

    fetchedData.value = await api.get("/all-vacancies?page="+ page + "&page_size=" + 10);

    vacancies.value = fetchedData.value.data.vacancies
    vessels.value = fetchedData.value.data.vessels
    total_pages.value = fetchedData.value.data.total_pages
    current_page.value = fetchedData.value.data.current_page

    for (let i = 0; i < vacancies.value.length; i++) {
      for (let j = 0; j < vessels.value.length; j++) {
        if (vacancies.value[i].vessel === vessels.value[j].id) {
          vacancies.value[i].vessel_data = vessels.value[j]
          break;
        }
      }

      if (isAuth && userInfo.value.info.role == 'Моряк') {
        let responded = false;
        for (let k = 0; k < vacancies.value[i].responses.length; k++) {
          if (userInfo.value.info.id == vacancies.value[i].responses[k]) {
            responded = true;
            break;
          }
        }
        if (responded) {
          vacancies.value[i].response_id = false
        } else {
          vacancies.value[i].response_id = userInfo.value.info.id
        }

        vacancies.value[i].response_id_send = userInfo.value.info.id
      }

      vacancies.value[i].company_name = fetchedData.value.data.companies[i].company_name
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
