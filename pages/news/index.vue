<template>
  <NuxtLayout name="default-hero">
    <div class="section-hero section-hero-news">
      <AfCustomHeader/>
      <div class="hero hero-news">
        <div class="container">
          <div class="hero-block">
            <h1 class="hero-title hero-title-dock">Морские новости</h1>
            <div style="display: none;" class="hero-text">Пример краткого текста</div>
          </div>
        </div>
      </div>
    </div>

    <section class="section-news">
      <div class="container">
        <div class="news">
          <div class="news-block">

            <div class="news-item" v-for="item in news" :key="item._id">
              <NuxtLink :to="`/news/${item._id}`" class="news-img">
                <img v-if="item.photo_path" :src="item.photo_path" :alt="item.title"/>
                <div class="afn-logo-r-list" v-if="!item.photo_path"></div>
              </NuxtLink>
              <div class="news-content">
                <div class="news-info">
                  <div class="news-date">{{ item.created_at }}</div>
                  <div v-if="item.view_count" class="news-view">
                    <img src="assets/img/news/icon.svg" alt="image"/><span>{{
                      item.view_count
                    }}</span>
                  </div>
                </div>
                <NuxtLink :to="`/news/${item._id}`" class="news-title">{{
                    item.title
                  }}
                </NuxtLink>
                <div class="news-text">{{ truncateText(item.content) }}</div>
                <NuxtLink :to="`/news/${item._id}`" class="news-link"
                >Читать подробнее
                </NuxtLink
                >
              </div>
            </div>
          </div>

          <div v-if="total_pages > 0 && total_pages < 8" class="flot-nav news-nav">
            <a v-show="current_page !== 1 && total_pages > 1" @click="fetchNews(1);" class="flot-nav__prev flot-nav__a">
              <img src="assets/img/flot/prev.svg" alt="image"/>
            </a>

            <div class="flot-nav__block">
              <a v-for="i of total_pages" :key="'pag-item-' + i" @click="fetchNews(i);" class="flot-nav__a"
                 :class="{ 'active':current_page === i }">{{ i }}</a>
            </div>

            <a v-show="current_page !== total_pages && total_pages > 1" @click="fetchNews(total_pages);"
               class="flot-nav__next flot-nav__a">
              <img src="assets/img/flot/next.svg" alt="image"/>
            </a>
          </div>

          <div v-if="total_pages > 7" class="flot-nav news-nav">
            <a v-show="current_page !== 1 && total_pages > 1" @click="fetchNews(1);" class="flot-nav__prev flot-nav__a">
              <img src="assets/img/flot/prev.svg" alt="image"/>
            </a>

            <div class="flot-nav__block">
              <template v-for="i of total_pages" :key="'pag-item-' + i">
                <a v-if="(i < 6 || i === total_pages)" @click="fetchNews(i);" class="flot-nav__a"
                   :class="{ 'active':current_page === i }">{{ i }}</a>
                <a v-if="(i > 6 && i !== total_pages) && hidden_pages" :key="'pag-item-' + i"
                   @click="fetchNews(i);" class="flot-nav__a"
                   :class="{ 'active':current_page === i }">{{ i }}</a>
                <a v-if="i === 7 && !hidden_pages" @click="hidden_pages = !hidden_pages" class="flot-nav__a">...</a>

              </template>
            </div>

            <a v-show="current_page !== total_pages && total_pages > 1" @click="fetchNews(total_pages);"
               class="flot-nav__next flot-nav__a">
              <img src="assets/img/flot/next.svg" alt="image"/>
            </a>
          </div>

        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup>
import {truncateText} from "~/utils/WrapText";
import api from "@/api/api";
import {ref} from "vue";

const news = ref(null);

const total_pages = ref(0);
const current_page = ref(1);
const hidden_pages = ref(false);

async function fetchNews(page) {
  try {
    const {data} = await api.get("/news?page=" + page);
    news.value = data.news
    total_pages.value = data.total_pages
    current_page.value = data.current_page
  } catch (error) {
    console.log(error);
  }
}

fetchNews(1);
</script>

<style lang="scss" scoped></style>
