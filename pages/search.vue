<template>
  <NuxtLayout name="default-hero">

    <div class="search-page-content">

      <div class="section-hero">
        <AfCustomHeader/>
        <div class="hero">
          <div class="container">
            <div class="hero-block">
              <h1 class="hero-title">Результаты поиска: {{route.query.q}}</h1>
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
                <a class="vabout-pag-link">Поиск</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main class="content-holder">
        <section class="section-two">
          <div class="search-modal__results" ref="resultsRef">
            <SearchResult
                :vacancies="vacancies"
                :sailors="sailors"
                :news="news"
                :vessels="vessels"
            />
          </div>
        </section>
      </main>
    </div>
    <AfCustomFooter/>
  </NuxtLayout>
</template>

<script setup>
import {ref} from 'vue';
import api from '@/api/api';
import {onMounted} from 'vue';
import {useRoute} from 'vue-router';
import SearchResult from '~/components/SearchResult.vue';
import AfCustomHeader from '~/components/AfCustomHeader.vue';
import AfCustomFooter from '~/components/AfCustomFooter.vue';

const resultsRef = ref(null);

const vacancies = ref([]);
const sailors = ref([]);
const news = ref([]);
const vessels = ref([]);
const error = ref(null);
const route = useRoute();

const search = async () => {
  await api.get(`/search`, {params: {q: route.query.q}})
      .then((response) => {
        vacancies.value = response.data.vacancies || [];
        sailors.value = response.data.sailors || [];
        news.value = response.data.news || [];
        vessels.value = response.data.vessels || [];
      })
      .catch((err) => {
        error.value = err.response?.data?.detail || 'Network error';
        console.error('Search error:', error.value);
      });
}


onMounted(() => {
  search()
})
</script>

<style scoped>

.search-page-content {
  width: 100%;
  height: 100vh;
  min-height: 780px;
  position: relative;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  overflow: hidden;
}

.content-holder {
  position: absolute;
  left: 0;
  width: 100%;
  height: calc(100% - 200px);
}

.section-two {
  padding: 15px;
  position: absolute;
  top: -10px;
  left: 0;
  width: 100%;
  display: flex;
  height: 100%;
}

.header-block {
  max-width: 1200px;
  width: 100%;
}

.foundResulst {
  position: absolute;
  z-index: 11;
  left: calc(100% - 85%);
  top: -35px;
  font-size: 30px;
  color: white;
}

.search-modal-holder {
  position: relative;
  width: 80%;
  max-width: 700px;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0);
  z-index: 25;
  pointer-events: none;
  justify-content: center;

  &.is-visible {
    pointer-events: auto;
  }

  .search-modal__input {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 40px;
    opacity: 0;
    transform: translateY(-100px);
    transition: all 0.4s ease;

    input {
      width: 100%;
      height: 50px;
      padding: 0 10px;
    }

    .search-modal__icon {
      position: absolute;
      right: 10px;
      font-size: 20px;
      color: #999;
      cursor: pointer;
      padding: 10px;
    }
  }

  &.is-active .search-modal__input {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-modal__results {
  position: absolute;
  left: 0;
  width: 99%;
  background: #eaecf7;
  z-index: 3;
  height: 70vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
  gap: 10px;
  padding-top: 10px;

}

.no-results {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  font-size: 40px;
  background-color: white;
  width: 300px;
  height: 100px;
  font-weight: 800;
  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 1px;
  transition: all 0.3s ease;
}

.vacancy_result, .sailor_result, .news_result {
  height: 100px;
  width: 100%;
}

.search-modal__icon:hover {
  background-color: rgb(201, 201, 201);
}

@media screen and (max-width: 768px) {
  .search-page-header .container {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hero-title {
    font-size: 20px;
  }
}

@media screen and (max-width: 550px) {
  .search-page-header .container .search-modal__input {
    position: absolute;
    top: 80px;
    width: 80vw;
    transform: translateX(-15%);
    height: 30px;

    input {
      height: 30px;
    }
  }

  .search-modal__icon {
    font-size: 10px;
    height: 10px;
    line-height: 10px;
  }

  .search-modal__icon:hover {
    padding: 0;
  }
}

</style>