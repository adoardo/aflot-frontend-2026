<template>
  <NuxtLayout class="section-hero navy" name="default-hero">

    <div class="section-hero">
      <AfCustomHeader/>
      <div class="hero">
        <div class="container">
          <div class="hero-block">
            <h1 class="hero-title">Резюме моряков</h1>
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
              <input type="search" value="" class="navy-search" placeholder="Поиск">


            </div>
            <!-- /.flot-sort -->
            <div class="suda-top__item flot-sort-sudno">
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
                <FlotItem v-for="(item, i) in vessels"
                          :data="item"
                          :key="'vessel-item-' + i"/>
              </div>
              <div v-if="total_pages > 0 && total_pages < 8" class="flot-nav news-nav">
                <a v-show="current_page !== 1 && total_pages > 1" @click="fetchNews(1);"
                   class="flot-nav__prev flot-nav__a">
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
                <a v-show="current_page !== 1 && total_pages > 1" @click="fetchNews(1);"
                   class="flot-nav__prev flot-nav__a">
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
        </div>
      </div>
    </section>
    <AfCustomFooter/>
  </NuxtLayout>
</template>

<script setup>
import FlotItem from "~/components/list/FlotItem.vue";
import api from "@/api/api";
import Pagination from "./../components/uikit/Pagination.vue";

const vessels = ref(null);

async function fetchVessels(page) {
  const {data} = await api.get("/navy");
  vessels.value = data;
}

await fetchVessels(1);
</script>

<style lang="scss" scoped></style>
