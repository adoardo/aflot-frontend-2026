<template>
  <div class="search-block">
    <div class="search-block__header">
      <div
        :class="!showSearch ? 'mor-nav active' : 'mor-nav'"
        style="cursor: pointer"
        @click="showFilters = true; showSearch = false; search_enable = false"
      >
        <img src="assets/img/search/filter.png" alt="" />
        Фильтр по резюме
      </div>
      <div
        :class="showSearch ? 'mor-nav active' : 'mor-nav'"
        style="cursor: pointer"
        @click="showFilters = false; showSearch = true; search_enable = true"
      >
        <img src="assets/img/search/search-blue.svg" alt="" />
        Поиск
      </div>
    </div>

    <div class="search-block__filter mor-tab" ref="rootRef" v-if="showFilters">
      <div class="mor-nav-item mor-nav-work">
        <div class="select" @click="showFilter(0)">
          <div v-if="filterData.positions.length">
            <span>Выбрано: {{ filterData.positions.length }}</span><br />
            {{ filterData.positions[filterData.positions.length - 1].substring(0, 13) }}...
          </div>
          <div v-else style="padding-right: 15px">Должность</div>
        </div>

        <div class="mor-nav-drop" v-if="showFilterVacancy" @click="forceShowFilter(0)">
          <div
            class="header-close menu-close-gray close-reg-about close_position"
            @click.stop="closeAllDropdowns()"
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
            v-if="filterData.salary_from && filterData.salary_to && filterData.salary_to > filterData.salary_from"
            class="ed-moz-zp-val ed-moz-zp-val--full"
          >
            от {{ Number(filterData.salary_from).toLocaleString() }} ₽ до
            {{ Number(filterData.salary_to).toLocaleString() }} ₽
          </div>

          <div
            v-else-if="filterData.salary_from && filterData.salary_to && filterData.salary_to < filterData.salary_from"
            class="ed-moz-zp-val ed-moz-zp-val--full"
          >
            от {{ Number(filterData.salary_from).toLocaleString() }} ₽
          </div>

          <div v-else-if="filterData.salary_from && !filterData.salary_to" class="ed-moz-zp-val ed-moz-zp-val--full">
            от {{ Number(filterData.salary_from).toLocaleString() }} ₽
          </div>

          <div v-else-if="!filterData.salary_from && filterData.salary_to" class="ed-moz-zp-val ed-moz-zp-val--full">
            до {{ Number(filterData.salary_to).toLocaleString() }} ₽
          </div>

          <div v-else class="ed-moz-zp-val ed-moz-zp-val--full">не указана</div>
        </div>

        <div class="mor-nav-drop" v-if="showFilterSalary" @click="forceShowFilter(1)">
          <div
            class="header-close menu-close-gray close-reg-about close_position"
            @click.stop="closeAllDropdowns()"
          >
            <span class="header-close__icon"></span>
          </div>

          <div class="mor-nav-block">
            <div class="mor-nav-item-inner mor-nav-item-inner--half">
              <label>От, ₽: </label>
              <input
                v-model="filterData.salary_from"
                @change="checkSalary()"
                type="number"
                placeholder="От"
                class="mor-nav-search mor-nav-input full-width"
              />
            </div>
            <div class="mor-nav-item-inner mor-nav-item-inner--half">
              <label>До, ₽: </label>
              <input
                v-model="filterData.salary_to"
                type="number"
                placeholder="До"
                class="mor-nav-search mor-nav-input full-width"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="mor-nav-zp mor-nav-status mor-nav-item">
        <div class="select" @click="showFilter(2)">
          <div v-if="filterData.tarif">{{ filterData.tarif }}</div>
          <div v-else>Статус моряка</div>
        </div>

        <div class="mor-nav-drop" v-if="showFilterStatus" @click="forceShowFilter(2)">
          <div
            class="header-close menu-close-gray close-reg-about close_position"
            @click.stop="closeAllDropdowns()"
          >
            <span class="header-close__icon"></span>
          </div>

          <div class="mor-nav-part">
            <label class="custom-checkbox mor-checkbox">
              <input class="status-checkbox" type="radio" name="status" value="" v-model="filterData.tarif" />
              <span class="checkmark"></span>
              Не важно
            </label>

            <label class="custom-checkbox mor-checkbox">
              <input class="status-checkbox" type="radio" name="status" value="Ищу работу" v-model="filterData.tarif" />
              <span class="checkmark"></span>
              Ищу работу
            </label>

            <label class="custom-checkbox mor-checkbox">
              <input
                class="status-checkbox"
                type="radio"
                name="status"
                value="Рассмотрю предложение"
                v-model="filterData.tarif"
              />
              <span class="checkmark"></span>
              Рассмотрю предложение
            </label>

            <label class="custom-checkbox mor-checkbox">
              <input class="status-checkbox" type="radio" name="status" value="Трудоустроен" v-model="filterData.tarif" />
              <span class="checkmark"></span>
              Трудоустроен
            </label>
          </div>
        </div>
      </div>

      <div class="mor-nav-item mor-nav-work">
        <div class="select" @click="showFilter(3)">
          <div v-if="filterData.regions.length">
            <span>Выбрано: {{ filterData.regions.length }}</span><br />
            {{ String(filterData.regions[filterData.regions.length - 1]).substring(0, 13) }}...
          </div>
          <div v-else style="padding-right: 15px">Регионы</div>
        </div>

        <div class="mor-nav-drop" v-if="showFilterPeriod" @click="forceShowFilter(3)">
          <div
            class="header-close menu-close-gray close-reg-about close_position"
            @click.stop="closeAllDropdowns()"
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
            <div class="resume-contact__second cabinet" v-for="(opt, index) in availableRegionOptions" :key="index">
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
            {{ filterData.ships[filterData.ships.length - 1].substring(0, 13) }}...
          </div>
          <div v-else>Oпыт работы</div>
        </div>

        <div class="mor-nav-drop" v-if="showFilterShipType" @click="forceShowFilter(4)">
          <div
            class="header-close menu-close-gray close-reg-about close_position"
            @click.stop="closeAllDropdowns()"
          >
            <span class="header-close__icon"></span>
          </div>

          <input
            type="search"
            v-model="searchShipInput"
            placeholder="Введите тип судна на котором работал моряк"
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
      <input
        v-model="search_position"
        placeholder="Введите название должности"
        class="mor-input-search"
      />
    </div>

    <div class="search-block-end search-block-rend">
      <button @click="resetFilter()" class="search-button-opacity">Сбросить</button>
      <div @click="onSearchClick" class="search-button-red">
        Найти
        <span>→</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useGlobalSettings } from "~/store/useGlobalSettings";
import { storeToRefs } from "pinia";

const emit = defineEmits<{
  (e: "search", payload: { search_enable: boolean; search_position: string; filterData: any }): void;
  (e: "reset"): void;
}>();

const rootRef = ref<HTMLElement | null>(null);

const globalSettings = useGlobalSettings();
const { getAfJobs, getAfShips, getAfRegionsRussia } = storeToRefs(globalSettings);

const filterData = ref({
  positions: [] as string[],
  ships: [] as string[],
  regions: [] as any[],
  salary_from: 0,
  salary_to: 0,
  tarif: "",
});

const search_position = ref("");
const search_enable = ref(false);

const searchInput = ref("");
const searchShipInput = ref("");
const searchRegionInput = ref("");

const availableOptions = computed(() =>
  (getAfJobs.value || []).filter((x: string) =>
    x.trim().toLowerCase().includes(searchInput.value.trim().toLowerCase()),
  ),
);

const availableShipOptions = computed(() =>
  (getAfShips.value || []).filter((x: string) =>
    x.trim().toLowerCase().includes(searchShipInput.value.trim().toLowerCase()),
  ),
);

const availableRegionOptions = computed(() => {
  const q = searchRegionInput.value.trim().toLowerCase();
  const first = getAfRegionsRussia.value?.[0];
  const optionValues = Array.isArray(first?.option_values) ? first.option_values : [];
  const selected = filterData.value.regions;
  const selectedSet = new Set(selected);
  const selectedIndex = new Map<string, number>();
  selected.forEach((v, i) => selectedIndex.set(String(v), i));

  return optionValues
    .map((r) => {
      const value = String(r);
      return {
        value,
        label: value,
        isSelected: selectedSet.has(value),
        selectedOrder: selectedIndex.get(value) ?? 999999, // выбранные раньше — выше
      };
    })
    .filter((o) => o.label.toLowerCase().includes(q))
    .sort((a, b) => {
      if (a.isSelected !== b.isSelected) return a.isSelected ? -1 : 1;
      if (a.isSelected && b.isSelected) return a.selectedOrder - b.selectedOrder;
      return a.label.localeCompare(b.label, "ru");
    })
    .map(({ value, label }) => ({ value, label }));
});

const showFilterVacancy = ref(false);
const showFilterSalary = ref(false);
const showFilterStatus = ref(false);
const showFilterPeriod = ref(false);
const showFilterShipType = ref(false);
const showFilters = ref(true);
const showSearch = ref(false);
const hideFiltersAllow = ref(true);

const closeAllDropdowns = () => {
  showFilterVacancy.value = false;
  showFilterSalary.value = false;
  showFilterStatus.value = false;
  showFilterPeriod.value = false;
  showFilterShipType.value = false;
};

const onDocumentClick = (event: MouseEvent) => {
  const target = event.target as Node | null;
  if (!rootRef.value || !target) return;
  if (rootRef.value.contains(target)) return;
  closeAllDropdowns();
};

onMounted(() => document.addEventListener("click", onDocumentClick, true));
onUnmounted(() => document.removeEventListener("click", onDocumentClick, true));

const hideFilters = () => {
  setTimeout(() => {
    if (hideFiltersAllow.value) closeAllDropdowns();
  }, 5);
};

const showFilter = (filter: number) => {
  hideFiltersAllow.value = false;

  const next0 = filter === 0 ? !showFilterVacancy.value : false;
  const next1 = filter === 1 ? !showFilterSalary.value : false;
  const next2 = filter === 2 ? !showFilterStatus.value : false;
  const next3 = filter === 3 ? !showFilterPeriod.value : false;
  const next4 = filter === 4 ? !showFilterShipType.value : false;

  closeAllDropdowns();

  showFilterVacancy.value = next0;
  showFilterSalary.value = next1;
  showFilterStatus.value = next2;
  showFilterPeriod.value = next3;
  showFilterShipType.value = next4;

  setTimeout(() => {
    hideFiltersAllow.value = true;
  }, 10);
};

const forceShowFilter = (filter: number) => {
  hideFiltersAllow.value = false;

  setTimeout(() => {
    if (filter === 0) showFilterVacancy.value = true;
    if (filter === 1) showFilterSalary.value = true;
    if (filter === 2) showFilterStatus.value = true;
    if (filter === 3) showFilterPeriod.value = true;
    if (filter === 4) showFilterShipType.value = true;
  }, 10);

  setTimeout(() => {
    hideFiltersAllow.value = true;
  }, 20);
};

const checkSalary = () => {
  setTimeout(() => {
    const chk1 = Number(filterData.value.salary_from);
    const chk2 = Number(filterData.value.salary_to);
    if (!chk1) filterData.value.salary_from = 0;
    if (!chk2) filterData.value.salary_to = 0;
  }, 25);
};

const resetFilter = () => {
  filterData.value = {
    positions: [],
    ships: [],
    regions: [],
    salary_from: 0,
    salary_to: 0,
    tarif: "",
  };
  search_enable.value = false;
  search_position.value = "";
  searchInput.value = "";
  searchShipInput.value = "";
  searchRegionInput.value = "";
  hideFilters();
  emit("reset");
};

const onSearchClick = () => {
  emit("search", {
    search_enable: search_enable.value,
    search_position: search_position.value,
    filterData: { ...filterData.value },
  });
};

defineExpose({ hideFilters });
</script>

<style lang="scss" scoped>
.checkmark {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

input:checked + .checkmark:after {
  position: absolute;
  display: block;
  content: "";
  width: 25%;
  height: 50%;
  border: solid white;
  border-width: 0 2px 2px 0;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
}

.mor-nav-search {
  width: 100%;
  padding: 18px 0;
  padding-left: 20px;
}

.mor-nav-part {
  width: 100%;
}

.custom-checkbox {
  display: flex;
  gap: 20px;
}

.status-checkbox {
  margin-right: 10px;
  appearance: none;
  width: 0px;
  height: 0px;
  background-color: #e4e5f8 !important;
}

.mor-nav-item-inner--half {
  width: 90%;
}

.full-width {
  width: 100% !important;
}

.ed-moz-zp-val {
  width: 70%;
}

.select.mor-input.mor-input-zp {
  display: flex;
  gap: 10px;
}

.close_position {
  position: absolute;
  right: 10px;
  top: 10px;
  transform: scale(1.2);
}

.search-block__filter.mor-tab{
  height:70px
}
</style>
