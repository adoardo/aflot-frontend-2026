<template>
  <NuxtLayout name="fullscreen">
    <full-page ref="fullpage" :options="{scrollBar: false, navigation: true, navigationPosition: 'left'}" id="fullpage">

      <div class="section section-content-1">
        <div class="main-content main-content-one">
          <div class="main-block-one">
            <h2 class="content-h2">Работа в море</h2>

            <div class="content-menu">
              <NuxtLink
                v-for="(navItem, i) in MenuSeaHome"
                :key="'navItemMenu-' + i"
                :to="navItem.link"
                class="nav-link"
              >
                <template
                  v-for="(part, index) in splitNewLines(navItem.name)"
                  :key="index"
                >
                  <span>{{ part }}</span>
                  <br v-if="index < splitNewLines(navItem.name).length - 1" />
                </template>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div class="section section-content-2">
        <div class="main-content main-content-two">
          <div class="main-block-two">
            <div class="content-menu content-menu-2">
              <NuxtLink
                v-for="(navItem, i) in MenuSeaHome"
                :key="'navItemMenu-' + i"
                :to="navItem.link"
                class="nav-link"
              >
                <template
                  v-for="(part, index) in splitNewLines(navItem.name)"
                  :key="index"
                >
                  <span>{{ part }}</span>
                  <br v-if="index < splitNewLines(navItem.name).length - 1" />
                </template>
              </NuxtLink>
            </div>

            <div class="vak">
              <ul class="vak-list" id="vakNav">
                <li
                  v-for="(tabLink, index) in tabLinks"
                  :key="'tab-link-' + index"
                  @click="activeTabIndex = index"
                >
                  <a :class="{ 'vak-active': activeTabIndex === index }">
                    <div class="vak-list-text">{{ tabLink.name }}</div>
                    <div class="vak-list-dop">{{ tabLink.txt }}</div>
                  </a>
                </li>
              </ul>
              <div id="vaksWrap" class="vak-block">
                <div class="vak-tab" :class="{ 'vak-active': activeTabIndex === 0 }">
                  <div class="vak-part">
                    <VacancyDefaultItem
                        v-for="(item, i) in vacancies"
                        :data="item"
                        :key="'vacancies-item-' + i"
                    />
                  </div>
                </div>
                <div class="vak-tab" :class="{ 'vak-active': activeTabIndex === 1 }">
                  <div class="vak-part">
                    <ResumeDefaultItem
                        v-for="(item, i) in resumes"
                        :data="item"
                        :key="'resumes-item-page-' + i"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section section-content section-content-3">
        <div class="main-content main-content-two">
          <div class="main-block-three">
            <div class="about-title-main">Почему выбирают нас</div>

            <div class="about-block about-block-main">
              <div class="about-item">
                <img src="assets/img/about/1.png" alt="image" class="about-item__img" />
                <div class="about-info">
                  <div class="about-info__title">
                    <span class="about-info__reg">Автоматизация подбора моряков:</span>
                  </div>

                  <div class="about-info__text">
                    За счет возможности отправки персональных предложений морякам ,
                    отправки групповых рассылок отсортированным морякам.
                  </div>
                </div>
              </div>

              <div class="about-item">
                <img src="assets/img/about/2.png" alt="image" class="about-item__img" />
                <div class="about-info">
                  <div class="about-info__title">
                    <span class="about-info__reg">Скорость обмена информацией:</span>
                  </div>

                  <div class="about-info__text">
                    Моряки мгновенно получают уведомление о вакансии или персональном
                    предложении на свой мобильный телефон и могут принять предложение.
                  </div>
                </div>
              </div>

              <div class="about-item">
                <img src="assets/img/about/3.png" alt="image" class="about-item__img" />
                <div class="about-info">
                  <div class="about-info__title">
                    <span class="about-info__reg">Отображение статусов:</span>
                  </div>

                  <div class="about-info__text">
                    На сервисе отдельно отображены моряки со статусом «Ищу работу» и
                    «Срочные вакансии».
                  </div>
                </div>
              </div>

              <div class="about-item">
                <img src="assets/img/about/4.png" alt="image" class="about-item__img" />
                <div class="about-info">
                  <div class="about-info__title">
                    <span class="about-info__reg">Маркетинговые инструменты:</span>
                  </div>

                  <div class="about-info__text">
                    Мы используем передовые маркетинговые инструменты и привлекаем к
                    сервису компании и моряков всего Дальневосточного региона.
                  </div>
                </div>
              </div>

              <div class="about-item">
                <img src="assets/img/about/5.png" alt="image" class="about-item__img" />
                <div class="about-info">
                  <div class="about-info__title">
                    <span class="about-info__reg">Личные выгоды компании:</span>
                  </div>

                  <div class="about-info__text">
                    Используя сервис- Афлот, Вы сократите время на звонки по неактуальным
                    анкетам моряков, при этом повысите конверсию откликов на вакансию.
                  </div>
                </div>
              </div>

              <div class="about-item">
                <img src="assets/img/about/6.png" alt="image" class="about-item__img" />
                <div class="about-info">
                  <div class="about-info__title">
                    <span class="about-info__reg">Личные выгоды моряка:</span>
                  </div>

                  <div class="about-info__text">
                    Используя сервис- Афлот, Вам больше не нужно звонить по компаниям и
                    составлять множество анкет – предложения о работе теперь поступают вам
                    на телефон.
                  </div>
                </div>
              </div>
            </div>

            <div class="content-menu content-menu-2 content-menu-3">
              <NuxtLink
                v-for="(navItem1, i) in MenuSeaHome"
                :key="'navItem1Menu-' + i"
                :to="navItem1.link"
                class="nav-link"
              >
                <template
                  v-for="(part, index) in splitNewLines(navItem1.name)"
                  :key="index"
                >
                  <span>{{ part }}</span>
                  <br v-if="index < splitNewLines(navItem1.name).length - 1" />
                </template>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div class="section section-content section-content-4">
        <div class="main-content main-content-two">
          <div class="main-block-two main-block-four">
            <div class="content-menu content-menu-2">
              <NuxtLink
                v-for="(navItem2, i) in MenuSeaHome"
                :key="'navItemMenu-' + i"
                :to="navItem2.link"
                class="nav-link"
              >
                <template
                  v-for="(part, index) in splitNewLines(navItem2.name)"
                  :key="index"
                >
                  <span>{{ part }}</span>
                  <br v-if="index < splitNewLines(navItem2.name).length - 1" />
                </template>
              </NuxtLink>
            </div>

            <div class="vak new-vak">
              <ul class="vak-list" id="vakNav1">
                <li v-for="(item, i) in newsLinks" :key="'news-item-link' + i">
                  <a
                          :class="{ 'vak-active': activeTabNewsIndex === i }"
                          @click="activeTabNewsIndex = i"
                  >
                    <div class="vak-list-text">{{ item.name }}</div>
                    <div class="vak-list-dop">{{ item.txt }}</div>
                  </a>
                </li>
              </ul>


              <div id="vaksWrap1" class="vak-block">
                <div class="vak-tab" id="vakk1":class="{ 'vak-active': activeTabNewsIndex === 0 }">
                  <div class="new-block">
                    <div class="new-slider swiper">
                      <div class="new-wrapper swiper-wrapper">
                        <NewsDefaultItem
                            v-for="(item, i) in news"
                            :data="item"
                            :key="'news-item-page-' + i"
                        />
                      </div>
                    </div>

                    <div class="new-dop">
                      <div class="new-prev new-arrow" id="new-prev">←</div>
                      <a href="/news" class="new-link">
                        <span>Все новости</span>
                        <img src="assets/img/new/new-icon.svg" alt="image">
                      </a>
                      <div class="new-next new-arrow" id="new-next">→</div>
                    </div>
                  </div>
                </div>

                <div class="vak-tab" id="vakk2" :class="{ 'vak-active': activeTabNewsIndex === 1 }">
                  <div class="new-block">
                    <div class="new-slider-1 swiper">
                      <div class="new-wrapper swiper-wrapper">
                        <NewsDefaultItem
                            v-for="(item, j) in interesting"
                            :data="item"
                            :key="'news-item-page-' + j"
                        />
                      </div>
                    </div>

                    <div class="new-dop">
                      <div class="new-prev new-arrow" id="new-prev-1">←</div>
                      <a href="/news" class="new-link">
                        <span>Все новости</span>
                        <img src="assets/img/new/new-icon.svg" alt="image">
                      </a>
                      <div class="new-next new-arrow" id="new-next-1">→</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomeFooter/>
    </full-page>
    <div class="fixed-dop">
      <img src="assets/img/main/dop.png" alt="image" class="info-dop__img" />
    </div>
  </NuxtLayout>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import { MenuSeaHome } from "~/consts/MenuConsts";
import VacancyDefaultItem from "~/components/list/VakItem.vue";
import ResumeDefaultItem from "~/components/list/ResItem.vue";
import NewsDefaultItem from "~/components/list/NewsItem.vue";
import api from "@/api/api";
import { useGlobalStore, useGlobalStoreRefs } from "~/store/useGlobalStore";

// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';

import HomeFooter from '../components/AfFooter.vue';

import {useUsersStore} from "~/store/useUserStore";
const userStore = useUsersStore();
const {userInfo, isAuth, userProfileId} = storeToRefs(userStore)

const activeTabIndex = ref(0);
const activeTabNewsIndex = ref(0);
const fetchedData = ref({});
const tabLinks = ref([
  { name: "Вакансии", txt: "новые" },
  { name: "Резюме", txt: "новые" },
]);
const newsLinks = ref([
  { name: "Новости", txt: "новые" },
  { name: "Интересное", txt: "новые" },
]);

const { setActiveSection } = useGlobalStore();
const { activeSection } = useGlobalStoreRefs();

function splitNewLines(text) {
  return text.split("<br/>");
}

const vacancies = ref([])
const vessels = ref([])
const resumes = ref([])
const news = ref([])
const interesting = ref([])

async function fetchData() {
  const { data } = await api.get("/home-page")
  fetchedData.value = data
  resumes.value = data.resumes
  vacancies.value = data.vacancies
  vessels.value = data.vessels
  news.value = data.news
  interesting.value = data.interesting

  const mon = [
    'января',
    'февраля',
    'марта',
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

  let tdate = '';

  for (let i = 0; i < news.value.length; i++) {
    tdate = news.value[i].created_at;
    if (tdate) {
      tdate = tdate.split('-')
      news.value[i].afDate1 = parseInt(tdate[2])
      news.value[i].afDate2 = mon[tdate[1] - 1].toUpperCase() + ' ' + tdate[0]
    } else {
      news.value[i].afDate1 = ''
      news.value[i].afDate2 = ''
    }
  }
  for (let i = 0; i < interesting.value.length; i++) {
    tdate = interesting.value[i].created_at;
    if (tdate) {
      tdate = tdate.split('-')
      interesting.value[i].afDate1 = parseInt(tdate[2])
      interesting.value[i].afDate2 = mon[tdate[1] - 1].toUpperCase() + ' ' + tdate[0]
    } else {
      interesting.value[i].afDate1 = ''
      interesting.value[i].afDate2 = ''
    }
  }


  for (let i = 0; i < vacancies.value.length; i++) {
    vacancies.value[i].company_id = data.companies[i].id
    vacancies.value[i].photo_path = data.companies[i].photo_path
    for (let j = 0; j < vessels.value.length; j++) {
      if (vacancies.value[i].vessel === vessels.value[j]._id) {
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

    vacancies.value[i].company_name = data.companies[i].company_name

    let tmpFrom = vacancies.value[i].date_of_departure_from.split('-');
    let tmpTo = vacancies.value[i].date_of_departure_to.split('-');
    vacancies.value[i].departureDateDisplay = 'с ' + tmpFrom[2] + '.' + tmpFrom[1] + '.' + tmpFrom[0] + ' по ' + tmpTo[2] + '.' + tmpTo[1] + '.' + tmpTo[0]

  }
}
await fetchData()

onMounted(() => {
  let swiper = new Swiper(".new-slider", {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: "#new-next",
      prevEl: "#new-prev",
    },
    breakpoints: {
      1: {
        slidesPerView: 1,

      },
      768: {
        slidesPerView: 1,

      },
      769: {
        slidesPerView: 2,
      },
      1240: {
        slidesPerView: 2,
      },
      1241: {
        slidesPerView: 3,
      },

    },

  });

  let swiper1 = new Swiper(".new-slider-1", {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: "#new-next-1",
      prevEl: "#new-prev-1",
    },
    breakpoints: {
      1: {
        slidesPerView: 1,

      },
      768: {
        slidesPerView: 1,

      },
      769: {
        slidesPerView: 2,
      },
      1240: {
        slidesPerView: 2,
      },
      1241: {
        slidesPerView: 3,
      },

    },

  });
});


</script>

<style lang="scss" scoped>
html,
body {
  height: 100%;
  overflow: hidden;
  margin: 0;
}

#fullpage {
  scroll-behavior: smooth;
}

.section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 1s ease-in-out;
}
.section-content-1 {
  display: flex;
  align-items: center;
  justify-content: end;
}
.section-content-2 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.section-content-5 {
  justify-content: flex-end;
}

</style>
