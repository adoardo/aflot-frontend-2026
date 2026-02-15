<template>
  <NuxtLayout name="default-hero">
    <div class="section-hero">
      <AfCustomHeader />
      <div class="hero">
        <div class="container">
          <div class="hero-block">
            <h1 class="hero-title">Вакансии для моряков</h1>

            <div class="search-block">
              <div class="search-block__header">
                <div
                  :class="(!showSearch) ? 'mor-nav active' : 'mor-nav'"
                  style="cursor: pointer"
                  @click="showFilters = true; showSearch = false; search_enable = false;"
                >
                  <img src="assets/img/search/filter.png" alt="" />
                  Фильтр по вакансиям
                </div>

                <div
                  :class="(showSearch) ? 'mor-nav active' : 'mor-nav'"
                  style="cursor: pointer"
                  @click="showFilters = false; showSearch = true; search_enable = true;"
                >
                  <img src="assets/img/search/search-blue.svg" alt="" />
                  Поиск
                </div>
              </div>

              <div class="search-block__filter mor-tab" ref="searchRootRef" v-if="showFilters">
                <div class="mor-nav-item mor-nav-work">
                  <div class="select" @click="showFilter(0)">
                    <div v-if="filterData.positions.length">
                      <span>Выбрано: {{ filterData.positions.length }}</span><br />
                      {{ String(filterData.positions[filterData.positions.length - 1]).substring(0, 13) }}...
                    </div>

                    <div v-else style="padding-right: 15px;">
                      Должность
                    </div>
                  </div>

                  <div class="mor-nav-drop" v-if="showFilterVacancy" @click="forceShowFilter(0)">
                    <div
                      class="header-close menu-close-gray close-reg-about close_position"
                      @click.stop="showFilter(0)"
                    >
                      <span class="header-close__icon"></span>
                    </div>

                    <input
                      type="search"
                      v-model="searchInput"
                      placeholder="Введите название должности"
                      class="mor-nav-search"
                    />

                    <div class="mor-nav-part">
                      <div class="resume-contact__second cabinet" v-for="(item, index) in availableOptions" :key="index">
                        <label class="custom-checkbox mor-checkbox">
                          <input type="checkbox" :value="item" v-model="filterData.positions" />
                          <span class="checkmark"></span>
                          {{ item }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mor-nav-zp mor-nav-zarp mor-nav-item">
                  <div class="select mor-input mor-input-zp" @click="showFilter(1)">
                    <label>Зарплата</label>

                    <div
                      v-if="filterData.salary_from && filterData.salary_to && (filterData.salary_to > filterData.salary_from)"
                      class="ed-moz-zp-val"
                    >
                      от {{ filterData.salary_from.toLocaleString() }} ₽ до
                      {{ filterData.salary_to.toLocaleString() }} ₽
                    </div>

                    <div
                      v-else-if="filterData.salary_from && filterData.salary_to && (filterData.salary_to < filterData.salary_from)"
                      class="ed-moz-zp-val"
                    >
                      от {{ filterData.salary_from.toLocaleString() }} ₽
                    </div>

                    <div v-else-if="filterData.salary_from && !filterData.salary_to" class="ed-moz-zp-val">
                      от {{ filterData.salary_from.toLocaleString() }} ₽
                    </div>

                    <div v-else-if="!filterData.salary_from && filterData.salary_to" class="ed-moz-zp-val">
                      до {{ filterData.salary_to.toLocaleString() }} ₽
                    </div>

                    <div v-else class="ed-moz-zp-val">не указана</div>
                  </div>

                  <select v-if="false" class="select mor-input mor-input-select">
                    <option value="">RUB</option>
                    <option value="">USD</option>
                  </select>

                  <div class="mor-nav-drop" v-if="showFilterSalary" @click="forceShowFilter(1)">
                    <div
                      class="header-close menu-close-gray close-reg-about close_position"
                      @click.stop="showFilter(1)"
                    >
                      <span class="header-close__icon"></span>
                    </div>

                    <div class="mor-nav-block">
                      <div class="mor-nav-item-inner">
                        <label>От, ₽: </label>
                        <input
                          v-model="filterData.salary_from"
                          @change="checkSalary()"
                          type="number"
                          placeholder="От"
                          class="mor-nav-search mor-nav-input"
                        />
                      </div>

                      <div class="mor-nav-item-inner">
                        <label>До, ₽: </label>
                        <input
                          v-model="filterData.salary_to"
                          type="number"
                          placeholder="До"
                          class="mor-nav-search mor-nav-input"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mor-nav-zp mor-nav-date mor-nav-item" @click="showDatePicker()">
                  <label @click="showDatePicker()">Дата посадки:</label>

                  <div class="datepicker">
                    <UPopover :popper="{ placement: 'bottom-start' }">
                      <UButton icon="i-heroicons-calendar-days-20-solid">
                        <span class="dpsi">
                          {{ format(selected.start, 'd MMM yyy', { locale: ru }) }}<br />
                          {{ format(selected.end, 'd MMM yyy', { locale: ru }) }}
                        </span>
                      </UButton>

                      <template #panel="{ close }">
                        <div class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800">
                          <div class="hidden sm:flex flex-col py-4">
                            <UButton
                              v-for="(range, index) in ranges"
                              :key="index"
                              :label="range.label"
                              color="gray"
                              variant="ghost"
                              class="rounded-none px-6"
                              :class="[
                                isRangeSelected(range.duration)
                                  ? 'bg-gray-100 dark:bg-gray-800'
                                  : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                              ]"
                              truncate
                              @click="selectRange(range.duration)"
                            />
                          </div>

                          <DatePicker v-model="selected" @close="close" />
                        </div>
                      </template>
                    </UPopover>
                  </div>
                </div>

                <div class="mor-nav-item mor-nav-work">
                  <div class="select" @click="showFilter(3)">
                    <div v-if="filterData.regions.length">
                      <span>Выбрано: {{ filterData.regions.length }}</span><br />
                      {{ String(filterData.regions[filterData.regions.length - 1]).substring(0, 13) }}...
                    </div>

                    <div v-else style="padding-right: 15px;">
                      Регионы
                    </div>
                  </div>

                  <div class="mor-nav-drop" v-if="showFilterPeriod" @click="forceShowFilter(3)">
                    <div
                      class="header-close menu-close-gray close-reg-about close_position"
                      @click.stop="showFilter(3)"
                    >
                      <span class="header-close__icon"></span>
                    </div>

                    <input
                      type="search"
                      v-model="searchRegionInput"
                      placeholder="Введите регион"
                      class="mor-nav-search"
                    />

                    <div class="mor-nav-part">
                      <div
                        class="resume-contact__second cabinet"
                        v-for="(opt, index) in availableRegionOptions"
                        :key="index"
                      >
                        <label class="custom-checkbox mor-checkbox">
                          <input type="checkbox" :value="opt.value" v-model="filterData.regions" />
                          <span class="checkmark"></span>
                          {{ opt.label }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mor-nav-item mor-nav-sudno mor-nav-zp mor-nav-right">
                  <div class="select" @click="showFilter(4)">
                    <div v-if="filterData.ships.length">
                      <span>Выбрано: {{ filterData.ships.length }}</span><br />
                      {{ String(filterData.ships[filterData.ships.length - 1]).substring(0, 13) }}...
                    </div>

                    <div v-else>
                      Тип судна
                    </div>
                  </div>

                  <div class="mor-nav-drop" v-if="showFilterShipType" @click="forceShowFilter(4)">
                    <div
                      class="header-close menu-close-gray close-reg-about close_position"
                      @click.stop="showFilter(4)"
                    >
                      <span class="header-close__icon"></span>
                    </div>

                    <input
                      type="search"
                      v-model="searchShipInput"
                      placeholder="Введите тип судна"
                      class="mor-nav-search"
                    />

                    <div class="mor-nav-part">
                      <div class="resume-contact__second cabinet" v-for="(item, index) in availableShipOptions" :key="index">
                        <label class="custom-checkbox mor-checkbox">
                          <input type="checkbox" :value="item" v-model="filterData.ships" />
                          <span class="checkmark"></span>
                          {{ item }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mor-tab" v-if="showSearch">
                <input v-model="search_position" placeholder="Введите название должности" class="mor-input-search" />
              </div>

              <div class="search-block-end search-block-rend">
                <button @click="resetFilter()" class="search-button-opacity">Сбросить</button>

                <div @click="fetchVacancies(1)" class="search-button-red">
                  Найти <span>→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section @click="hideFilters()" class="section-flot section-res">
      <div class="container">
        <div class="flot">
          <h2 class="search-title">Вакансий под заданные критерии: <span>{{ vacancies_total }}</span></h2>

          <div class="flot-block flot-block-side flot-block-vak">
            <div class="flot-info">
              <div class="flot-content flot-content-search">
                <div class="vacancy-list search-vacancy-list">
                  <VacancyDefaultItem
                    v-for="(item, i) in vacancies"
                    :data="item"
                    :key="'vacancies-item-' + i"
                    @respond-sent="onRespondSent"
                  />
                </div>
              </div>

              <template v-if="vacancies_total > 0">
                <div v-if="total_pages > 0 && total_pages < 8" class="flot-nav news-nav">
                  <a
                    v-show="current_page !== 1 && total_pages > 1"
                    @click="fetchVacancies(1, false)"
                    class="flot-nav__prev flot-nav__a"
                  >
                    <img src="assets/img/flot/prev.svg" alt="image" />
                  </a>

                  <div class="flot-nav__block">
                    <a
                      v-for="i of total_pages"
                      :key="'pag-item-' + i"
                      @click="fetchVacancies(i, false)"
                      class="flot-nav__a"
                      :class="{ active: current_page === i }"
                    >
                      {{ i }}
                    </a>
                  </div>

                  <a
                    v-show="current_page !== total_pages && total_pages > 1"
                    @click="fetchVacancies(total_pages, false)"
                    class="flot-nav__next flot-nav__a"
                  >
                    <img src="assets/img/flot/next.svg" alt="image" />
                  </a>
                </div>

                <div v-if="total_pages > 7" class="flot-nav news-nav">
                  <a
                    v-show="current_page !== 1 && total_pages > 1"
                    @click="fetchVacancies(1, false)"
                    class="flot-nav__prev flot-nav__a"
                  >
                    <img src="assets/img/flot/prev.svg" alt="image" />
                  </a>

                  <div class="flot-nav__block">
                    <template v-for="i of total_pages" :key="'pag-item-' + i">
                      <a
                        v-if="(i < 6 || i === total_pages)"
                        @click="fetchVacancies(i, false)"
                        class="flot-nav__a"
                        :class="{ active: current_page === i }"
                      >
                        {{ i }}
                      </a>

                      <a
                        v-if="(i > 6 && i !== total_pages) && hidden_pages"
                        :key="'pag-item-' + i"
                        @click="fetchVacancies(i, false)"
                        class="flot-nav__a"
                        :class="{ active: current_page === i }"
                      >
                        {{ i }}
                      </a>

                      <a v-if="i === 7 && !hidden_pages" @click="hidden_pages = !hidden_pages" class="flot-nav__a">
                        ...
                      </a>
                    </template>
                  </div>

                  <a
                    v-show="current_page !== total_pages && total_pages > 1"
                    @click="fetchVacancies(total_pages, false)"
                    class="flot-nav__next flot-nav__a"
                  >
                    <img src="assets/img/flot/next.svg" alt="image" />
                  </a>
                </div>
              </template>

              <template v-else>
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
  </NuxtLayout>
</template>

<script setup lang="ts">
// @ts-ignore
import api from "@/api/api";
// @ts-ignore
import { computed, ref, watch, onMounted, onBeforeUnmount } from "vue";
// @ts-ignore
import VacancyDefaultItem from "~/components/list/VacancyDefaultItem";
// @ts-ignore
import DatePicker from "@/components/DatePicker";
import { sub, format, isSameDay, type Duration } from "date-fns";
import ru from "date-fns/locale/ru";

import { storeToRefs } from "pinia";
import { useUsersStore } from "~/store/useUserStore";
import { useGlobalSettings } from "~/store/useGlobalSettings";

const fetchedData = ref<any>({});
const vacancies = ref<any[]>([]);
const vessels = ref<any[]>([]);
const total_pages = ref(0);
const current_page = ref(1);
const hidden_pages = ref(false);
const search_position = ref("");
const search_enable = ref(false);
const vacancies_total = ref(0);

const userStore = useUsersStore();
const { userInfo, isAuth, userProfileId } = storeToRefs(userStore);

const globalSettings = useGlobalSettings();
const { getAfJobs, getAfShips, getAfRegionsRussia } = storeToRefs(globalSettings);

const filterData = ref<{
  positions: any[];
  ships: any[];
  regions: any[];
  date_of_departure: string;
  date_of_departure_from: string;
  date_of_departure_to: string;
  contract_duration: string;
  salary_from: number;
  salary_to: number;
}>({
  positions: [],
  ships: [],
  regions: [],
  date_of_departure: "",
  date_of_departure_from: "",
  date_of_departure_to: "",
  contract_duration: "не указана",
  salary_from: 0,
  salary_to: 0,
});

const ranges = [
  { label: "7 дней", duration: { days: 7 } },
  { label: "14 дней", duration: { days: 14 } },
  { label: "30 дней", duration: { days: 30 } },
  { label: "3 месяца", duration: { months: 3 } },
  { label: "6 месяцев", duration: { months: 6 } },
  { label: "Год", duration: { years: 1 } },
];

const selected = ref({
  start: sub(new Date(), { years: 1 }),
  end: sub(new Date(), { years: -1 }),
});

function isRangeSelected(duration: Duration) {
  return isSameDay(selected.value.start, sub(new Date(), duration)) && isSameDay(selected.value.end, new Date());
}

function selectRange(duration: Duration) {
  selected.value = { start: sub(new Date(), duration), end: new Date() };
}

watch(selected, () => {
  const dFrom =
    selected.value.start.getUTCFullYear() +
    "-" +
    ("0" + (selected.value.start.getUTCMonth() + 1)).slice(-2) +
    "-" +
    ("0" + selected.value.start.getUTCDate()).slice(-2);

  const dTo =
    selected.value.end.getUTCFullYear() +
    "-" +
    ("0" + (selected.value.end.getUTCMonth() + 1)).slice(-2) +
    "-" +
    ("0" + selected.value.end.getUTCDate()).slice(-2);

  filterData.value.date_of_departure = dFrom;
  filterData.value.date_of_departure_from = dFrom;
  filterData.value.date_of_departure_to = dTo;
});

const searchInput = ref("");
const searchShipInput = ref("");
const searchRegionInput = ref("");

const availableOptions = computed(() =>
  (getAfJobs.value || []).filter((x: any) => String(x).trim().toLowerCase().includes(searchInput.value.trim().toLowerCase()))
);

const availableShipOptions = computed(() =>
  (getAfShips.value || []).filter((x: any) => String(x).trim().toLowerCase().includes(searchShipInput.value.trim().toLowerCase()))
);

const availableRegionOptions = computed(() => {
  const q = searchRegionInput.value.trim().toLowerCase();

  const root = getAfRegionsRussia.value?.[0];
  const values = (root?.option_values || []) as string[];

  const selected = filterData.value.regions || [];

  return values
    .map((region) => ({
      value: region,
      label: region,
      selected: selected.includes(region)
    }))
    // поиск
    .filter((o) => o.label.toLowerCase().includes(q))
    // выбранные всегда сверху
    .sort((a, b) => {
      if (a.selected && !b.selected) return -1;
      if (!a.selected && b.selected) return 1;
      return a.label.localeCompare(b.label, "ru");
    });
});



const showFilterVacancy = ref(false);
const showFilterSalary = ref(false);
const showFilterDate = ref(false);
const showFilterPeriod = ref(false);
const showFilterShipType = ref(false);
const showFilters = ref(true);
const showSearch = ref(false);
const hideFiltersAllow = ref(true);

const searchRootRef = ref<HTMLElement | null>(null);

const closeAllDropdowns = () => {
  showFilterVacancy.value = false;
  showFilterSalary.value = false;
  showFilterDate.value = false;
  showFilterPeriod.value = false;
  showFilterShipType.value = false;
};

const onGlobalClick = (e: MouseEvent) => {
  const root = searchRootRef.value;
  if (!root) return;

  const target = e.target as HTMLElement | null;
  if (!target) return;

  if (root.contains(target)) return;
  if (target.closest?.(".v-popper__popper, .u-popover, .u-dropdown")) return;

  closeAllDropdowns();
};

const onGlobalKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") closeAllDropdowns();
};

onMounted(() => {
  document.addEventListener("click", onGlobalClick, true);
  document.addEventListener("keydown", onGlobalKeydown);

  fetchVacancies(1, false);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onGlobalClick, true);
  document.removeEventListener("keydown", onGlobalKeydown);
});

const hideFilters = async () => {
  setTimeout(() => {
    if (hideFiltersAllow.value) closeAllDropdowns();
  }, 5);
};

const showFilter = async (filter: number) => {
  hideFiltersAllow.value = false;

  if (filter === 0) {
    showFilterVacancy.value = !showFilterVacancy.value;
    showFilterSalary.value = false;
    showFilterDate.value = false;
    showFilterPeriod.value = false;
    showFilterShipType.value = false;
  } else if (filter === 1) {
    showFilterSalary.value = !showFilterSalary.value;
    showFilterVacancy.value = false;
    showFilterDate.value = false;
    showFilterPeriod.value = false;
    showFilterShipType.value = false;
  } else if (filter === 2) {
    showFilterDate.value = !showFilterDate.value;
    showFilterVacancy.value = false;
    showFilterSalary.value = false;
    showFilterPeriod.value = false;
    showFilterShipType.value = false;
  } else if (filter === 3) {
    showFilterPeriod.value = !showFilterPeriod.value;
    showFilterVacancy.value = false;
    showFilterSalary.value = false;
    showFilterDate.value = false;
    showFilterShipType.value = false;
  } else if (filter === 4) {
    showFilterShipType.value = !showFilterShipType.value;
    showFilterVacancy.value = false;
    showFilterSalary.value = false;
    showFilterDate.value = false;
    showFilterPeriod.value = false;
  }

  setTimeout(() => {
    hideFiltersAllow.value = true;
  }, 10);
};

const forceShowFilter = async (filter: number) => {
  hideFiltersAllow.value = false;

  setTimeout(() => {
    if (filter === 0) showFilterVacancy.value = true;
    else if (filter === 1) showFilterSalary.value = true;
    else if (filter === 2) showFilterDate.value = true;
    else if (filter === 3) showFilterPeriod.value = true;
    else if (filter === 4) showFilterShipType.value = true;
  }, 10);

  setTimeout(() => {
    hideFiltersAllow.value = true;
  }, 20);
};

const showDatePicker = async () => {
  hideFilters();
  // @ts-ignore
  $(".dpsi").click();
};

const checkSalary = async () => {
  setTimeout(() => {
    const chk1 = Number(filterData.value.salary_from || 0);
    const chk2 = Number(filterData.value.salary_to || 0);

    if (!chk1) filterData.value.salary_from = 0;
    if (!chk2) filterData.value.salary_to = 0;
  }, 25);
};

const buildFilterQuery = (useFilter: boolean) => {
  if (search_enable.value) {
    return `&search=${encodeURIComponent(search_position.value || "")}`;
  }

  if (!useFilter) return "";

  let cdf = filterData.value.contract_duration;
  if (cdf === "не указана") cdf = "";

  const salary_from = Number(filterData.value.salary_from || 0);
  const salary_to = Number(filterData.value.salary_to || 0);

  const positions = (filterData.value.positions || []).map(String).filter(Boolean).join(",");
  const ships = (filterData.value.ships || []).map(String).filter(Boolean).join(",");
  const regions = (filterData.value.regions || []).map(String).filter(Boolean).join(",");

  const date_of_departure = filterData.value.date_of_departure || "";
  const date_of_departure_from = filterData.value.date_of_departure_from || "";
  const date_of_departure_to = filterData.value.date_of_departure_to || "";

  return (
    `&salary_from=${salary_from}` +
    `&salary_to=${salary_to}` +
    `&positions=${encodeURIComponent(positions)}` +
    `&ships=${encodeURIComponent(ships)}` +
    `&regions=${encodeURIComponent(regions)}` +
    `&date_of_departure=${encodeURIComponent(date_of_departure)}` +
    `&contract_duration=${encodeURIComponent(cdf)}` +
    `&date_of_departure_from=${encodeURIComponent(date_of_departure_from)}` +
    `&date_of_departure_to=${encodeURIComponent(date_of_departure_to)}`
  );
};

const buildFilterPayload = (page: number) => ({
  page,
  salary_from: filterData.value.salary_from || undefined,
  salary_to: filterData.value.salary_to || undefined,
  positions: filterData.value.positions,
  ships: filterData.value.ships,
  regions: filterData.value.regions,
  contract_duration:
    filterData.value.contract_duration === "не указана"
      ? undefined
      : filterData.value.contract_duration,
});

const fetchVacancies = async (page: number) => {
  try {
    current_page.value = page;

    if (search_enable.value) {
      fetchedData.value = await api.post("/all-vacancies", {
        params: {
          page,
          search: search_position.value,
        },
      });
    }
    else {
      fetchedData.value = await api.post(
        "/all-vacancies",
        buildFilterPayload(page)
      );
    }

    vacancies.value = fetchedData.value.data.vacancies || [];
    vessels.value = fetchedData.value.data.vessels || [];
    total_pages.value = fetchedData.value.data.total_pages || 0;
    vacancies_total.value = fetchedData.value.data.total_vacancies || 0;

    for (let i = 0; i < vacancies.value.length; i++) {
      vacancies.value[i].company_id = fetchedData.value.data.companies[i].id
      vacancies.value[i].photo_path = fetchedData.value.data.companies[i].photo_path
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

      vacancies.value[i].company_name = fetchedData.value.data.companies[i].company_name

      let tmpFrom = vacancies.value[i].date_of_departure_from.split('-');
      let tmpTo = vacancies.value[i].date_of_departure_to.split('-');
      vacancies.value[i].departureDateDisplay = 'с ' + tmpFrom[2] + '.' + tmpFrom[1] + '.' + tmpFrom[0] + ' по ' + tmpTo[2] + '.' + tmpTo[1] + '.' + tmpTo[0]

    }

  } catch (e) {
    console.error("fetchVacancies error:", e);
  }
};


const resetFilter = async () => {
  filterData.value = {
    positions: [],
    ships: [],
    regions: [],
    date_of_departure: "",
    date_of_departure_from: "",
    date_of_departure_to: "",
    contract_duration: "не указана",
    salary_from: 0,
    salary_to: 0,
  };

  search_enable.value = false;
  showSearch.value = false;
  showFilters.value = true;

  await fetchVacancies(1, false);
};

const onRespondSent = async () => {
  await fetchVacancies(current_page.value || 1, false);
};
</script>

<style lang="scss" scoped>
.section-hero {
  .hero-title {
    color: rgb(255, 255, 255);
    font-weight: 600;
  }
}

.hero-title {
  color: black;
  font-weight: 600;
}

.search-block__filter {
  gap: 5px;
}

.mor-nav-item {
  min-height: 82px;
  display: flex;
  border-right: solid 1px #d5d7ef;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;

  label {
    cursor: pointer;
  }

  > button {
    background: #fff;
  }

  &:hover {
    transition: 0.3s;
    background: #3b82f6;

    label,
    input {
      color: #000;
    }

    color: #fff;

    > button {
      background: #3b82f6;
    }

    .datepicker > div > div > button {
      background: #3b82f6;
      color: #fff;
    }
  }
}

.mor-nav-drop {
  margin-top: 0px;
}

.mor-nav-drop::after {
  filter: drop-shadow(0px -4px 2px rgba(0, 0, 0, 0.1));
}

.mor-nav-search {
  width: calc(100% - 60px);
}

.mor-select {
  &:hover {
    transition: 0.3s;
    background: #3b82f6 !important;
    color: #fff !important;
    cursor: pointer;

    option {
      color: #fff !important;
      cursor: pointer;
    }
  }
}

.mor-nav-part {
  min-height: 40px;
  width: 100%;
}

.mor-input-search {
  min-height: 22px;
}

.mor-date-inp {
  width: 60%;
  padding: 0px 20%;
}

.mor-nav-date {
  > label {
    width: 80%;
    padding: 0px 10%;
    padding-bottom: 5px;
  }

  &:hover {
    label {
      color: #fff;
    }
  }
}

.mor-nav-date .datepicker > div > div > button {
  width: auto;
  margin: 0% 10%;
  background: #fff;
}

.mor-nav-date .datepicker button span.dpsi {
  text-align: left;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  background: transparent;
  bottom: 0;
  color: transparent;
  cursor: pointer;
  height: auto;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: auto;
}

.select.mor-input.mor-input-zp {
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 80%;
  padding: 0px 10%;

  > label {
    padding-bottom: 5px;
  }

  > div {
    white-space: nowrap;
    color: #222;
  }
}

.mor-nav-item-inner {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  label {
    margin-right: 7px;
    width: 65px;
  }
}

.mor-nav-item.mor-nav-contract-duration {
  width: 22%;

  label {
    padding-left: 10%;
    padding-top: 5px;
  }

  select {
    max-height: 60px;
    padding: 0% 10%;
  }

  &:hover {
    label {
      color: #fff;
    }
  }
}

.resume-contact__second {
  width: calc(100% - 40px);
  border-radius: 3px;
  transition: 0.3s;

  label {
    height: 40px;
    display: flex;
    align-items: center;
    width: 100%;

    span {
      left: 7px !important;
    }
  }

  &:hover {
    background: #3b82f6;
    color: #fff;
  }
}

.mor-nav-part {
  grid-gap: 0px;
}

.mor-nav-zp.mor-nav-zarp {
  &:hover {
    > div > label,
    .ed-moz-zp-val {
      color: #fff;
    }
  }
}

.vacancy-aside {
  width: calc(100% - 60px);

  .vacancy__date {
    width: calc(100% - 58px);
  }
}

.mor-nav-item {
  border: solid 1px rgba(59, 69, 169, 0.21);
}

.close_position {
  position: absolute;
  right: 10px;
  top: 10px;
  transform: scale(1.2);
}
</style>
