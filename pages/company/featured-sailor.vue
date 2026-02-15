<template>
  <ClientOnly>
    <NuxtLayout name="custom" class="main cabinet">
      <div>
      </div>

      <section id="responses">
        <div class="container">
          <div class="tabs">
            <div class="tab-header">
              <div class="tab-label"
                   @click="tab1=true;tab2=false;changeHref('favorite-list')"
                   :class="{ active: tab1 }">
                Избранные моряки
              </div>
              <div class="tab-label"
                   @click="tab1=false;tab2=true;changeHref('black-list')"
                   :class="{ active: tab2 }">
                Черный список
              </div>
            </div>

            <div class="tab-body" v-if="tab1">
              <div class="vacancy-list">
                <template v-if="favoriteList.length">
                  <ResumeFavoriteItem
                    v-for="(item, i) in favoriteList"
                    :key="item._id || i"
                    :data="item"
                  />
                </template>
                <template v-else>
                  <div class="no-results">
                    <span>Список избранного пуст</span>
                    <img src="assets/img/ship-drawing.svg" alt="image" class="dock-img" />
                  </div>
                </template>
              </div>
            </div>

            <div class="tab-body" v-if="tab2">
              <div class="vacancy-list">
                <template v-if="blackList.length">
                  <ResumeBlackItem
                    v-for="(item, i) in blackList"
                    :key="item._id || i"
                    :data="item"
                  />
                </template>
                <template v-else>
                  <div class="vacancy-list-empty">
                    <div class="no-results">
                      <span>Черный список пуст</span>
                      <img src="assets/img/ship-drawing.svg" alt="image" class="dock-img" />
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </section>
    </NuxtLayout>
  </ClientOnly>
</template>

<script setup>
definePageMeta({
  middleware: ["company"],
  ssr: false, // ✅ disable SSR rendering entirely
})

import api from "@/api/api";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import ResumeBlackItem from "~/components/list/ResumeBlackItem.vue";
import ResumeFavoriteItem from "~/components/list/ResumeFavoriteItem.vue";

const route = useRoute();

const tab1 = ref(true);
const tab2 = ref(false);
const favoriteList = ref([]);
const blackList = ref([]);

const changeHref = (hash) => {
  history.pushState({}, "", route.path + "#" + hash);
};

const fetchResponses = async (companyId) => {
  try {
    const { data } = await api.get("/bflist/" + companyId);
    favoriteList.value = data.favorites || [];
    blackList.value = data.black_list || [];

    for (let i = 0; i < (data.blc || []).length; i++) {
      if (blackList.value[i]) blackList.value[i].blc = data.blc[i];
    }
  } catch (error) {
    console.error("❌ Failed to load favorites:", error);
  }
};

onMounted(() => {
  document.body.classList.add("bg-white");

  const userData = localStorage.getItem("global/user");
  if (!userData) return;

  const companyId = JSON.parse(userData)?.userProfileId?.id;
  if (!companyId) return;

  if (route.hash === "#black-list") {
    tab1.value = false;
    tab2.value = true;
  } else {
    tab1.value = true;
    tab2.value = false;
  }

  fetchResponses(companyId);
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
