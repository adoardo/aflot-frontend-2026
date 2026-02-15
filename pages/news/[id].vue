<template>
  <NuxtLayout name="custom">
    <section class="section-post" v-if="news && news.current_news">
      <div class="container">
        <div class="post">
          <NuxtLink to="/news/" class="post-link">
            <span class="post-link__icon">←</span>
            <span class="post-link__text">К морским новостям</span>
          </NuxtLink>

          <h1 class="post-title">{{ news.current_news.title }}</h1>

          <div class="news-info">
            <div class="news-date">{{ news.current_news.created_at }}</div>

            <div class="news-view" v-if="news.current_news.view_count">
              <img src="assets/img/news/icon.svg" alt="image"/><span>{{
                news.current_news.view_count
              }}</span>
            </div>
          </div>

          <div class="post-block">
            <img v-if="news.current_news.photo_path" :src="news.current_news.photo_path" :alt="news.current_news.title" class="post-img"/>
            <div class="afn-logo-r afn-logo-r-none" v-if="!news.current_news.photo_path"></div>
            <p class="post-text">
              {{ news.current_news.content }}
            </p>
          </div>

          <div class="post-end">
            <NuxtLink
                :to="news.prev_news._id"
                class="post-end__link"
                v-if="news.prev_news != null"
            >
              <span class="post-icon">←</span>
              К предыдущей новости
            </NuxtLink>
            <div class="post-line" v-if="news.prev_news && news.next_news"></div>

            <NuxtLink
                :to="news.next_news._id"
                class="post-end__link post-end__red"
                v-if="news.next_news != null"
            >
              К следующей новости
              <span class="post-icon">→</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup>
import api from "@/api/api";
import {useRoute, useRouter} from "vue-router";

const news = ref(null);

const route = useRoute();
const router = useRouter();

async function getNewsId(id) {
  const {data} = await api.get(`/news/${id}`);
  news.value = data;
}

onMounted(async () => {
  await getNewsId(route.params.id);
});
</script>

<style lang="scss" scoped>
.post-link{
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  text-decoration: none;
  width: 250px;
}

</style>

