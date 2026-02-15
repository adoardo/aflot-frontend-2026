<template>
  <ClientOnly>
    <NuxtLayout name="custom" class="main cabinet">
      <div>
      </div>
      <section id="responses">
        <div class="container">

          <div class="vacancy-start-title">
            <a href="/" class="vacancy-link-off">
              <span>←</span> Исходящие отклики по вакансии:
            </a>
          </div>


          <template v-if="outgoingVacs.length" v-for="(item, index) in outgoingVacs">
            <div class="vacancy-start-title">
              <div class="flex-title">
                <h1>{{ item.position }}</h1>
                <div>от {{ convertAFDate(item.created_at, false) }}</div>
              </div>
            </div>
            <div class="vacancy-list">
              <template v-for="(offer, index) in item.outgoingOffers">
                <ResumeOutgoingItem :data="offer" :vacancy="item._id"/>
              </template>
            </div>
          </template>
          <template v-else>
            <div class="no-results">
              <span>Исходящие предложения по вакансиям отсутствуют</span>
              <img src="assets/img/ship-drawing.svg" alt="image" class="dock-img">
            </div>
          </template>

        </div>
      </section>
    </NuxtLayout>
  </ClientOnly>
</template>

<script setup>
definePageMeta({
  middleware: ["company"],
})
import api from "@/api/api";
import {ref} from "vue";

import ResumeOutgoingItem from "~/components/list/ResumeOutgoingItem.vue";
import convertAFDate from "../../utils/convertAFDate.js";

const outgoingVacs = ref({})

const fetchResponses = async () => {
  try {
    let {data} = await api.get("/company-vacancy-outgoing-offers");
    outgoingVacs.value = data.outgoing_vacancies

    for (let i = 0; i < outgoingVacs.value.length; i++) {
      outgoingVacs.value[i].outgoingOffers = data.outgoing_offers[i]
    }
  } catch (error) {
    console.log(error);
  }
}
fetchResponses();

onMounted(() => {
  document.body.classList.add('bg-white');
});
</script>

<style lang="scss" scoped>

</style>