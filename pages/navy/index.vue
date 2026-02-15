<template>
  <NuxtLayout class="section-hero navy" name="default-hero">

    <div class="section-hero">
      <AfCustomHeader/>
      <div class="hero">
        <div class="container">
          <div class="hero-block">
            <h1 class="hero-title">Морской флот</h1>
          </div>
        </div>
      </div>
      <div class="vabout-top">
        <div class="container">
          <div class="vabout-top-block">
            <div class="vabout-pag">
              <a href="/" class="vabout-pag-link">
                <text class="vabout-cursor">←</text>
                Главная</a>
              <a class="vabout-pag-link">Судна морского флота</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="section-flot">
      <div class="container">
        <div class="flot">
          <div class="flot-sort-top">
            <div class="flot-sort">
              <div class="flot-sort__title">Поиск по названию:</div>
              <!-- /.flot-sort__title -->
              <input type="search" v-model="search_vessel_name" class="navy-search" placeholder="Поиск">
              <div @click="fetchData(1, true)" class="search-button-navy">
                Найти
                <span>→</span>
              </div>

            </div>
            <!-- /.flot-sort -->

            <!-- Смотри, у тебя в коде пропали события, не знаю откуда ты взял этот код
            @click="toggleModal('newship')


            -->
            <div v-if="isAuth & userInfo.info.role == 'Компания'" class="suda-top__item flot-sort-sudno"
                 @click="toggleModal('newship')">
              <div class="suda-top__plus">+</div>
              <!-- /.suda-top__plus -->
              <div class="suda-top__content">
                <div class="suda-top__title">
                  Добавить судно
                </div>
                <!-- /.suda-top__title -->

              </div>
              <!-- /.suda-top__content -->
            </div>
          </div>
          <!-- /.flot-sort-top -->


          <div class="flot-block flot-content-navy">
            <div class="flot-info">
              <div class="flot-content">
                <FlotItem v-for="(item, i) in navy"
                          :data="item"
                          :key="'vessel-item-' + i"
                />
              </div>

              <div v-if="total_pages > 0 && total_pages < 8" class="flot-nav news-nav">
                <a v-show="current_page !== 1 && total_pages > 1" @click="fetchData(1, false);"
                   class="flot-nav__prev flot-nav__a">
                  <img src="assets/img/flot/prev.svg" alt="image"/>
                </a>

                <div class="flot-nav__block">
                  <a v-for="i of total_pages" :key="'pag-item-' + i" @click="fetchData(i, false);" class="flot-nav__a"
                     :class="{ 'active':current_page === i }">{{ i }}</a>
                </div>

                <a v-show="current_page !== total_pages && total_pages > 1" @click="fetchData(total_pages, false);"
                   class="flot-nav__next flot-nav__a">
                  <img src="assets/img/flot/next.svg" alt="image"/>
                </a>
              </div>

              <div v-if="total_pages > 7" class="flot-nav news-nav">
                <a v-show="current_page !== 1 && total_pages > 1" @click="fetchData(1, false);"
                   class="flot-nav__prev flot-nav__a">
                  <img src="assets/img/flot/prev.svg" alt="image"/>
                </a>

                <div class="flot-nav__block">
                  <template v-for="i of total_pages" :key="'pag-item-' + i">
                    <a v-if="(i < 6 || i === total_pages)" @click="fetchData(i, false);" class="flot-nav__a"
                       :class="{ 'active':current_page === i }">{{ i }}</a>
                    <a v-if="(i > 6 && i !== total_pages) && hidden_pages" :key="'pag-item-' + i"
                       @click="fetchData(i, false);" class="flot-nav__a"
                       :class="{ 'active':current_page === i }">{{ i }}</a>
                    <a v-if="i === 7 && !hidden_pages" @click="hidden_pages = !hidden_pages" class="flot-nav__a">...</a>

                  </template>
                </div>

                <a v-show="current_page !== total_pages && total_pages > 1" @click="fetchData(total_pages, false);"
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
import FlotItem from "~/components/list/FlotItem.vue";
import api from "@/api/api";

import {useUsersStore} from "~/store/useUserStore";

const userStore = useUsersStore();
const {userInfo, isAuth} = storeToRefs(userStore)

import {useModalStore} from "~/store/modal";

const {closeModal, toggleModal} = useModalStore();

const fetchedData = ref({})
const navy = ref({})
const total_pages = ref(0);
const current_page = ref(1);
const hidden_pages = ref(false);
const search_vessel_name = ref('')

const fetchData = async (page, search) => {
  let s = "";
  if (search_vessel_name.value) {
    s = "&search=" + search_vessel_name.value
  }
  fetchedData.value = await api.get("/all-navy?page=" + page + s);
  navy.value = fetchedData.value.data.vessels_data
  for (let i = 0; i < navy.value.length; i++) {
    navy.value[i].vacancy_count = fetchedData.value.data.vacancies_data[i];
  }

  total_pages.value = fetchedData.value.data.total_pages
  current_page.value = fetchedData.value.data.current_page
}

fetchData(1);

</script>

<style lang="scss" scoped>
.search-button-navy {
  display: flex;
  align-items: center;
  grid-gap: 10px;
  font-size: 16px;
  font-family: "Myriad Pro", sans-serif;
  cursor: pointer;
  border: 2px solid #8e909d;
  padding: 7px 16px;
}
</style>
