<template>
  <NuxtLayout name="default-hero">
    <div class="page-root">
      <div class="section-hero">
        <AfCustomHeader />
        <div class="hero">
          <div class="container">
            <div class="hero-block">
              <h1 class="hero-title">Резюме моряков</h1>
            </div>

            <div class="filter-wrap" ref="filterRootRef">
              <AfFiltrResume
                ref="filtrRef"
                @search="onResumeSearch"
                @reset="onResumeReset"
              />
            </div>
          </div>
        </div>
      </div>

      <section class="section-flot section-res">
        <div class="container">
          <div class="flot">
            <div class="flot-block flot-block-side">
              <div class="flot-info flot-info-full">
                <div class="flot-content flot-content-search">
                  <div class="vacancy-list search-vacancy-list">
                    <ResumeItem
                      v-for="item in resumes"
                      :key="getResumeKey(item)"
                      :data="item"
                      :company="company"
                      @updated="onResumeItemUpdated"
                    />
                  </div>
                </div>

                <div v-if="total_pages > 0 && total_pages < 8" class="flot-nav news-nav">
                  <a
                    v-show="current_page !== 1 && total_pages > 1"
                    @click.prevent="fetchResumes(1, true)"
                    class="flot-nav__prev flot-nav__a"
                  >
                    <img src="assets/img/flot/prev.svg" alt="image" />
                  </a>

                  <div class="flot-nav__block">
                    <a
                      v-for="i of total_pages"
                      :key="'pag-item-' + i"
                      @click.prevent="fetchResumes(i, true)"
                      class="flot-nav__a"
                      :class="{ active: current_page === i }"
                    >
                      {{ i }}
                    </a>
                  </div>

                  <a
                    v-show="current_page !== total_pages && total_pages > 1"
                    @click.prevent="fetchResumes(total_pages, true)"
                    class="flot-nav__next flot-nav__a"
                  >
                    <img src="assets/img/flot/next.svg" alt="image" />
                  </a>
                </div>

                <div v-if="total_pages > 7" class="flot-nav news-nav">
                  <a
                    v-show="current_page !== 1 && total_pages > 1"
                    @click.prevent="fetchResumes(1, true)"
                    class="flot-nav__prev flot-nav__a"
                  >
                    <img src="assets/img/flot/prev.svg" alt="image" />
                  </a>

                  <div class="flot-nav__block">
                    <template v-for="i of total_pages" :key="'pag-item-' + i">
                      <a
                        v-if="i < 6 || i === total_pages"
                        @click.prevent="fetchResumes(i, true)"
                        class="flot-nav__a"
                        :class="{ active: current_page === i }"
                      >
                        {{ i }}
                      </a>

                      <a
                        v-if="i > 6 && i !== total_pages && hidden_pages"
                        :key="'pag-item-hidden-' + i"
                        @click.prevent="fetchResumes(i, true)"
                        class="flot-nav__a"
                        :class="{ active: current_page === i }"
                      >
                        {{ i }}
                      </a>

                      <a
                        v-if="i === 7 && !hidden_pages"
                        @click.prevent="hidden_pages = !hidden_pages"
                        class="flot-nav__a"
                      >
                        ...
                      </a>
                    </template>
                  </div>

                  <a
                    v-show="current_page !== total_pages && total_pages > 1"
                    @click.prevent="fetchResumes(total_pages, true)"
                    class="flot-nav__next flot-nav__a"
                  >
                    <img src="assets/img/flot/next.svg" alt="image" />
                  </a>
                </div>

                <template v-if="resumes_total === 0">
                  <div class="no-results">
                    <span>Результатов не найдено</span>
                    <img src="assets/img/ship-drawing.svg" alt="image" class="dock-img" />
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AfCustomFooter />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
// @ts-ignore
import api from "@/api/api";

import AfFiltrResume from "~/components/AfFiltrResume.vue";
import ResumeItem from "~/components/list/ResumeItem.vue";
import { useUsersStore } from "~/store/useUserStore";

type LastFilters =
  | {
      search_enable?: boolean;
      search_position?: string;
      filterData?: any;
    }
  | null;

const userStore = useUsersStore();
const { userInfo, isAuth } = storeToRefs(userStore);

const company = ref<any>({});
const resumes = ref<any[]>([]);
const total_pages = ref(0);
const current_page = ref(1);
const hidden_pages = ref(false);
const resumes_total = ref(0);

const lastFilters = ref<LastFilters>(null);

const filtrRef = ref<any>(null);
const filterRootRef = ref<HTMLElement | null>(null);

const hideFilters = () => {
  filtrRef.value?.hideFilters?.();
};

const onGlobalClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement | null;
  if (!target) return;

  const filterRoot = filterRootRef.value;
  if (filterRoot && filterRoot.contains(target)) return;

  if (target.closest?.(".v-popper__popper, .u-popover, .u-dropdown")) return;

  hideFilters();
};

const onGlobalKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") hideFilters();
};

const normalizeCsv = (arr: any[]) =>
  arr.map((x) => String(x ?? "").trim()).filter(Boolean).join(",");

const buildParamsFromFilters = (page: number, useFilter: boolean) => {
  const params: any = { page };

  if (!useFilter || !lastFilters.value) return params;

  const { search_enable, search_position, filterData } = lastFilters.value;

  if (search_enable && (search_position || "").trim()) {
    params.search = String(search_position).trim();
    return params;
  }

  if (!filterData) return params;

  if (Array.isArray(filterData.positions) && filterData.positions.length) {
    params.positions = normalizeCsv(filterData.positions);
  }

  if (Array.isArray(filterData.ships) && filterData.ships.length) {
    params.ships = normalizeCsv(filterData.ships);
  }

  if (Array.isArray(filterData.regions) && filterData.regions.length) {
    params.regions = normalizeCsv(filterData.regions);
  }

  const sf = Number(filterData.salary_from);
  const st = Number(filterData.salary_to);

  if (!Number.isNaN(sf) && sf > 0) params.salary_from = sf;
  if (!Number.isNaN(st) && st > 0) params.salary_to = st;

  if ((filterData.tarif || "").trim()) params.tarif = String(filterData.tarif).trim();

  return params;
};

const fetchResumes = async (page = 1, useFilter = true) => {
  const params = buildParamsFromFilters(page, useFilter);

  try {
    const { data } = await api.get("/resumes", { params });

    resumes.value = data?.resumes || [];
    total_pages.value = Number(data?.total_pages || 0);
    current_page.value = Number(data?.current_page || 1);
    resumes_total.value = Number(data?.total_resumes ?? resumes.value.length);
  } catch (e) {
    resumes.value = [];
    total_pages.value = 0;
    current_page.value = 1;
    resumes_total.value = 0;
  }
};

const onResumeSearch = (payload: any) => {
  lastFilters.value = payload;
  hidden_pages.value = false;
  fetchResumes(1, true);
};

const onResumeReset = () => {
  lastFilters.value = null;
  hidden_pages.value = false;
  fetchResumes(1, false);
};

const onResumeItemUpdated = async () => {
  const useFilter = !!lastFilters.value;
  await fetchResumes(current_page.value || 1, useFilter);
};

const fetchCompanyProfileIfNeeded = async () => {
  if (!isAuth.value) return;
  if (userInfo.value?.info?.role !== "Компания") return;

  try {
    const { data } = await api.get("/company/profile");
    company.value = data || {};
  } catch {
    company.value = {};
  }
};

const getResumeKey = (item: any) => String(item?._id ?? item?.id ?? item?.email ?? Math.random());

onMounted(async () => {
  document.addEventListener("click", onGlobalClick, true);
  document.addEventListener("keydown", onGlobalKeydown);

  await fetchCompanyProfileIfNeeded();
  await fetchResumes(1, false);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onGlobalClick, true);
  document.removeEventListener("keydown", onGlobalKeydown);
});
</script>

<style scoped></style>
