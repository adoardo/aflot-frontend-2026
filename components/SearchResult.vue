<template>
  <div class="result-holder">
    <div class="result-container">
      <div class="flot-content-navy">
        <div class="flot-content" v-if="vacancies.length > 0">
          <h2 class="fc-title">Вакансий: {{vacancies.length}}</h2>
          <div
              v-for="(vacancy, index) in vacancies"
              :key="'vacancy-' + index"
              class="flot-item"
          >
            <!-- Top -->
            <div class="flot-item__top">
              <div class="flot-item__title">{{ vacancy.position || 'Не указано' }}</div>
              <div class="flot-item__gray">Дата отправления: {{ vacancy.date_of_departure || '-' }}</div>
            </div>

            <!-- Middle -->
            <div class="flot-item__middle">
              <div class="flot-item__content">

                <!-- Salary -->
                <div class="flot-item__part">
                  <div class="flot-item__subtitle">Зарплата (₽)</div>
                  <div class="flot-item__subtext">
                    {{ vacancy.salary_from || '-' }} - {{ vacancy.salary_to || '-' }}
                  </div>
                </div>

                <!-- Contract Duration -->
                <div class="flot-item__part">
                  <div class="flot-item__subtitle">Контракт</div>
                  <div class="flot-item__subtext">
                    {{ vacancy.contract_duration || '-' }}
                  </div>
                </div>

                <!-- Departure Range -->
                <div class="flot-item__part">
                  <div class="flot-item__subtitle">Диапазон отправления</div>
                  <div class="flot-item__subtext">
                    {{ vacancy.date_of_departure_from || '-' }} → {{ vacancy.date_of_departure_to || '-' }}
                  </div>
                </div>
                <!-- Phone 1 -->
                <div class="flot-item__part" v-if="vacancy.phone1">
                  <div class="flot-item__subtitle">Телефон 1</div>
                  <div class="flot-item__subtext">{{ vacancy.phone1 }}</div>
                </div>

                <!-- Phone 2 -->
                <div class="flot-item__part" v-if="vacancy.phone2">
                  <div class="flot-item__subtitle">Телефон 2</div>
                  <div class="flot-item__subtext">{{ vacancy.phone2 }}</div>
                </div>

                <!-- Responses count -->
                <div class="flot-item__part">
                  <div class="flot-item__subtitle">Отклики</div>
                  <div class="flot-item__subtext">
                    {{ vacancy.responses?.length || 0 }}
                  </div>
                </div>

                <!-- Job offers count -->
                <div class="flot-item__part">
                  <div class="flot-item__subtitle">Предложения</div>
                  <div class="flot-item__subtext">
                    {{ vacancy.job_offers?.length || 0 }}
                  </div>
                </div>

                <!-- View count -->
                <div class="flot-item__part">
                  <div class="flot-item__subtitle">Просмотры</div>
                  <div class="flot-item__subtext">{{ vacancy.view_count }}</div>
                </div>

                <!-- Link to vacancy -->
                <div class="flot-item__part">
                  <a
                      :href="'/navy/vacancies/' + vacancy.id"
                      target="_blank"
                      class="flot-item__link"
                  >
                    Подробнее о вакансии
                  </a>
                </div>
              </div>
            </div>

            <!-- End section (hidden) -->
            <div v-if="false" class="flot-item__end">
              <a href="#" class="flot-item__dop">
                <img src="assets/img/flot/icon-1.svg" alt="image"/>
                <span class="flot-item__link">О судне</span>
              </a>
              <a href="#" class="flot-item__dop">
                <img src="assets/img/flot/icon-2.svg" alt="image"/>
                <span class="flot-item__link">О компании OJ CREW</span>
              </a>
            </div>
          </div>
        </div>
        <div class="flot-content" v-if="sailors.length > 0">
          <h2 class="fc-title">Моряков: {{sailors.length}}</h2>
          <div
              v-for="(sailor, index) in sailors"
              :key="'sailor-' + index"
              class="flot-item"
          >
            <!-- Header -->
            <div class="flot-item__top">
              <div class="flot-item__title">
                <span class="person"> <span>{{ sailor.first_name }}</span></span>
                <span class="person"><span>{{ sailor.last_name }}</span></span>
                <span class="person"><span>{{ sailor.patronymic }}</span></span>
              </div>
              <div class="flot-item__gray">Роль: {{ sailor.role || '-' }}</div>
            </div>

            <!-- Details -->
            <div class="flot-item__middle">
              <div class="flot-item__content">


                <!-- VK ID (optional) -->
                <div class="flot-item__part" v-if="sailor.vk_id">
                  <div class="flot-item__subtitle">VK ID</div>
                  <div class="flot-item__subtext">{{ sailor.vk_id }}</div>
                </div>

                <!-- Join Date -->
                <div class="flot-item__part">
                  <div class="flot-item__subtitle">Дата регистрации</div>
                  <div class="flot-item__subtext">
                    {{ new Date(sailor.date_joined).toLocaleDateString() || '-' }}
                  </div>
                </div>

                <!-- Last Login -->
                <div class="flot-item__part">
                  <div class="flot-item__subtitle">Последний вход</div>
                  <div class="flot-item__subtext">
                    {{ new Date(sailor.last_login).toLocaleDateString() || '-' }}
                  </div>
                </div>
                <div class="vacancy__button blue" @click="goResumeInfo(sailor.id)">
                  <img src="assets/img/dop-page/blue-info.svg" alt=""/>Подробнее о моряке
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="vessels.length > 0" class=" flot-content  result-vessels">
          <h2 class="fc-title">Суден морского флота: {{vessels.length}}</h2>
          <div v-for="vessel in vessels" :key="vessel.id" class="flot-item">
            <div class="flot-item__top">
              <div class="flot-item__title">{{ vessel.vessel_name }}</div>
              <div class="flot-item__gray">IMO: {{ vessel.imo }}</div>
            </div>

            <div class="flot-item__middle">
              <div class="flot-item__content">

                <div class="flot-item__part">
                  <div class="flot-item__subtitle">Тип судна</div>
                  <div class="flot-item__subtext">{{ vessel.ship_type || '-' }}</div>
                </div>

                <div class="flot-item__part">
                  <div class="flot-item__subtitle">Год постройки:</div>
                  <div class="flot-item__subtext">{{ vessel.year_built || '-' }}</div>
                </div>

                <div class="flot-item__part">
                  <div class="flot-item__subtitle">Длина</div>
                  <div class="flot-item__subtext">{{ vessel.length || '-' }}</div>
                </div>

                <div class="flot-item__part">
                  <div class="flot-item__subtitle">Ширина</div>
                  <div class="flot-item__subtext">{{ vessel.width || '-' }}</div>
                </div>

                <div class="flot-item__part">
                  <div class="flot-item__subtitle">DWT (t):</div>
                  <div class="flot-item__subtext">{{ vessel.dwt || '-' }}</div>
                </div>

                <div class="flot-item__part">
                  <div class="flot-item__subtitle">kW</div>
                  <div class="flot-item__subtext">{{ vessel.kw || '-' }}</div>
                </div>

                <div class="flot-item__part">
                  <a :href="'/navy/vacancies/' + vessel.id" target="_blank" class="flot-item__link">
                    Доступно вакансий: {{ vacancies.vacancy_count }}
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="flot-content news_content" v-if="news.length > 0">
          <h2 class="fc-title">Новостей: {{news.length}}</h2>
          <div v-for="(newsItem, index) in news" :key="'news-' + index" class="news-item">
            <a :href="`/news/${newsItem.id}`" class="news-img" v-if="newsItem.photo_path">
              <img :src="newsItem.photo_path" :alt="newsItem.title || 'Новость'"/>
            </a>
            <div class="news-content">
              <div class="news-info">
                <div class="news-date">
                  {{ new Date(newsItem.created_at).toLocaleDateString('ru-RU') }}
                </div>
                <div class="news-view">
                  <img src="assets/img/news/icon.svg" alt="views icon"/>
                  <span>{{ newsItem.view_count || 0 }}</span>
                </div>
              </div>
              <a :href="`/news/${newsItem.id}`" class="news-title">
                {{ newsItem.title || 'Без заголовка' }}
              </a>
              <div class="news-text">
                {{ truncateText(newsItem.content, 200) }}
              </div>
              <a :href="`/news/${newsItem.id}`" class="news-link">Читать подробнее</a>
            </div>
          </div>
        </div>
        <div class="flot-content" v-if="!vessels.length && !news.length && !vacancies.length  &&  !sailors.length ">
          <div class="no-results">
            <h2 class="fc-title">Результатов не найдено</h2>
            <img src="assets/img/ship-drawing.svg" alt="image" class="dock-img">
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import AfCostomFooter from '~/components/AfCustomFooter.vue';

const props = defineProps({
  vacancies: {
    type: Array,
    default: () => []
  },
  sailors: {
    type: Array,
    default: () => []
  },
  news: {
    type: Array,
    default: () => []
  },
  vessels: {
    type: Array,
    default: () => []
  }
});
console.log('SearchResult props:', props.vacancies);


const goResumeInfo = async (resumeId) => {
  window.location.href = '/sailor/' + resumeId
}
</script>
<style lang="scss" scoped>
.result-holder {
  width: 100%;
  display: flex;
  justify-content: center;
}

.result-container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-inline: 20px;

  .footer-block {
    display: flex;
  }
}

.flot-content-navy {
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 1200px;
  width: 100%;
  padding-bottom: 50px;

}

.flot-item__top {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.flot-item__title {
  display: flex;
  gap: 50px;
}

.flot-item {
  width: 100%;;
}

.flot-item__gray {
  font-size: 15px;
}

.flot-content-navy .flot-content .flot-item__content {
  grid-template-columns: repeat(4, 25%);
  margin-top: 20px;
}

.flot-content {
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flot-item {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
}

.flot-item__part img {
  height: 200PX;
}

.flot-item__middle {
  & > div {
    display: flex;
    align-items: start;
    gap: 50px;
  }
}

.noResult {
  position: absolute;
  // width: 300px;
  height: 100px;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}

.flot-content.news_content .news-item {
  background-color: white;
  padding: 5px;
}

.result-vessels {
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;

  .flot-item {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;

  }
}

@media only screen and (max-width: 768px) {
  .flot-content {
    width: 100vw;
  }

  .flot-item__content {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: space-between;
  }

  .flot-item__part {
    flex: 1 1 45%;
    min-width: 45%;
  }

  .news-info-folder {
    width: 100%;
    align-items: flex-start;
  }

  .news-info {
    width: 100%;
  }

  .news-context {
    width: 100%;
  }
  .footer {
    width: 100%;
  }
}

@media only screen and (max-width: 450px) {
  .flot-content {
    width: 100vw;
  }

  .flot-item__content {
    flex-direction: column;
    gap: 10px;
  }

  .flot-item__part {
    width: 100%;
  }

  .news_content {
    width: 100vw;
  }

  .news-info-folder {
    width: 100%;
    align-items: flex-start;
  }

  .news-info {
    width: 100%;
    flex-direction: column;
  }

  .news-context {
    width: 100%;
    min-height: 100px;
  }

  .item__part-news {
    width: 100%;
    justify-content: space-between;
  }
}
.fc-title {
  font-size: 24px;
  font-weight: 600;
  width: 100%;
  padding: 15px;
  border-bottom: 2px solid #3b45a9;
}
footer {
  margin-top: 50px;
}

</style>
  