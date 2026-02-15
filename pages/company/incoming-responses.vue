<template>
  <ClientOnly>
    <NuxtLayout name="default-hero" class="main cabinet">
      <div>
        <AfHeaderColor/>
      </div>

      <section id="responses">
        <div class="container">
          <div class="vacancy-start-title">
            <a href="/" class="vacancy-link-off">
              <span>←</span> входящие предложения по вакансиям:
            </a>
          </div>

          <template v-if="incomingResponses.length">
            <template v-for="(item, index) in incomingResponses" :key="index">
              <div class="vacancy-start-title">
                <div class="flex-title">
                  <h1>{{ item.position }}</h1>
                  <div>от {{ convertAFDate(item.created_at, false) }}</div>
                </div>
              </div>

              <div class="vacancy-list">
                <ResumeItemResponse
                  v-for="(offer, i) in item.incomingOffers"
                  :key="offer._id"
                  :data="offer"
                  :vacancy="item._id"
                  :vacancyname="item.position"
                  @refresh="fetchResponses"
                />
              </div>
            </template>
          </template>

          <template v-else>
            <div class="no-results">
              <span>Отклики по вакансиям отсутствуют</span>
              <img src="assets/img/ship-drawing.svg" alt="image" class="dock-img" />
            </div>
          </template>
        </div>
      </section>

      <AfCustomFooter :lnkStyle="'footer-block footer-block-transparent'" />
    </NuxtLayout>
  </ClientOnly>
</template>

<script setup>
import convertAFDate from "../../utils/convertAFDate.js";
import api from "@/api/api";
import { ref, onMounted } from "vue";
import ResumeItemResponse from "~/components/list/ResumeItemResponse.vue";

definePageMeta({
  middleware: ["company"],
});

const incomingResponses = ref([]);

const fetchResponses = async () => {
  try {
    const { data } = await api.get("/company-vacancy-incoming-responses");
    incomingResponses.value = data.vacancies || [];
    for (let i = 0; i < incomingResponses.value.length; i++) {
      incomingResponses.value[i].incomingOffers = data.sailors[i] || [];
    }
  } catch (error) {
    console.error("❌ Error loading responses:", error);
  }
};

onMounted(() => {
  document.body.classList.add("bg-white");
  fetchResponses();
});
</script>

<style lang="scss" scoped>
.vacancy__info {
  grid-template-columns: repeat(2, auto);

  .vi-item {
    &:last-child {
      grid-column: 2 span;
    }
  }
}
</style>
