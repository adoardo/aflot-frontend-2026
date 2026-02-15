<template>
  <ClientOnly>
    <NuxtLayout name="default-hero">
      <div class="section-hero section-hero-mal">
        <AfCustomHeader />
        <div class="hero hero-mal">
          <div class="container">
            <div class="hero-block hero-block-mal">
              <div class="vabout-top-block">
                <a href="#" class="vabout-cursor">←</a>
                <div class="vabout-pag">
                  <a href="../index.html" class="vabout-pag-link">
                    Рассылка по вакансии: <strong>{{ position || "..." }}</strong>
                  </a>
                </div>
              </div>

              <h1 class="hero-title">{{ position || "Вакансия" }}</h1>

              <div class="search-block">
                <div class="search-block__header">
                  <div class="mor-nav active" style="cursor: pointer">
                    <img src="assets/img/search/filter.png" alt="" />
                    Фильтр рассылки
                  </div>
                </div>

                <div class="search-block__filter mor-tab" ref="filtersRoot">
                  <!-- POSITIONS -->
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
                        @click.stop="closeAllFilters()"
                      >
                        <span class="header-close__icon"></span>
                      </div>

                      <input
                        type="search"
                        v-model="searchInput"
                        placeholder="Введите должность"
                        class="mor-nav-search"
                      />

                      <div class="mor-nav-part">
                        <div class="resume-contact__second cabinet" v-for="(item, i) in availableOptions" :key="i">
                          <label class="custom-checkbox mor-checkbox">
                            <input type="checkbox" :value="item" v-model="filterData.positions" />
                            <span class="checkmark"></span>
                            {{ item }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- SALARY -->
                  <div class="mor-nav-zp mor-nav-zarp mor-nav-item">
                    <div class="select mor-input mor-input-zp" @click="showFilter(1)">
                      <label>Зарплата</label>
                      <div v-if="filterData.salary_from || filterData.salary_to" class="ed-moz-zp-val">
                        от {{ filterData.salary_from || 0 }} ₽ до {{ filterData.salary_to || 0 }} ₽
                      </div>
                      <div v-else class="ed-moz-zp-val">не указана</div>
                    </div>

                    <div class="mor-nav-drop" v-if="showFilterSalary" @click="forceShowFilter(1)">
                      <div
                        class="header-close menu-close-gray close-reg-about close_position"
                        @click.stop="closeAllFilters()"
                      >
                        <span class="header-close__icon"></span>
                      </div>

                      <div class="mor-nav-block">
                        <div class="mor-nav-item-inner">
                          <label>От, ₽: </label>
                          <input
                            v-model.number="filterData.salary_from"
                            type="number"
                            placeholder="От"
                            class="mor-nav-search mor-nav-input"
                          />
                        </div>
                        <div class="mor-nav-item-inner">
                          <label>До, ₽: </label>
                          <input
                            v-model.number="filterData.salary_to"
                            type="number"
                            placeholder="До"
                            class="mor-nav-search mor-nav-input"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- REGIONS -->
                  <div class="mor-nav-item mor-nav-country">
                    <div class="select select-regions" @click="showFilter(2)">
                      <div v-if="filterData.regions.length">
                        <span>Выбрано: {{ filterData.regions.length }}</span><br />
                        {{ String(filterData.regions[filterData.regions.length - 1]).substring(0, 13) }}...
                      </div>
                      <div v-else>Регионы</div>
                    </div>

                    <div class="mor-nav-drop" v-if="showFilterRegions" @click="forceShowFilter(2)">
                      <div
                        class="header-close menu-close-gray close-reg-about close_position"
                        @click.stop="closeAllFilters()"
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
                        <div class="resume-contact__second cabinet" v-for="(opt, i) in availableRegionOptions" :key="i">
                          <label class="custom-checkbox mor-checkbox">
                            <input type="checkbox" :value="opt.value" v-model="filterData.regions" />
                            <span class="checkmark"></span>
                            {{ opt.label }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- SHIPS -->
                  <div class="mor-nav-item mor-nav-sudno mor-nav-zp mor-nav-right">
                    <div class="select" @click="showFilter(3)">
                      <div v-if="filterData.ships.length">
                        <span>Выбрано: {{ filterData.ships.length }}</span><br />
                        {{ filterData.ships[filterData.ships.length - 1].substring(0, 13) }}...
                      </div>
                      <div v-else>Тип судна</div>
                    </div>

                    <div class="mor-nav-drop" v-if="showFilterShipType" @click="forceShowFilter(3)">
                      <div
                        class="header-close menu-close-gray close-reg-about close_position"
                        @click.stop="closeAllFilters()"
                      >
                        <span class="header-close__icon"></span>
                      </div>

                      <input
                        type="search"
                        v-model="searchShip"
                        placeholder="Введите тип судна"
                        class="mor-nav-search"
                      />

                      <div class="mor-nav-part">
                        <div class="resume-contact__second cabinet" v-for="(item, i) in availableShipOptions" :key="i">
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

                <div class="search-block-end search-block-rend">
                  <button @click="resetFilter" class="search-button-opacity">Сбросить</button>
                  <div @click="resumeData" class="search-button-red">
                    Найти <span>→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="section-flot" @click="hideFilters">
        <div class="container">
          <div class="let">
            <div class="let-block">
              <div class="let-part" v-for="(group, idx) in resumeGroups" :key="idx">
                <div class="let-top accordion">
                  <div class="let-top-title">{{ group.label }}: <span>{{ group.data.length }}</span></div>
                  <div class="let-top-cursor">
                    <img src="assets/img/let/cursor.svg" alt="image" class="let-top-img" />
                  </div>
                </div>

                <div class="let-content panel">
                  <div class="mal-table-block let-table-block">
                    <table class="his-table let-table">
                      <thead>
                        <tr class="his-tr">
                          <th class="his-th transparent"></th>
                          <th class="his-th">№</th>
                          <th class="his-th">ФИО</th>
                          <th class="his-th">Должность</th>
                          <th class="his-th">Зарплата</th>
                          <th class="his-th">Местонахождение</th>
                          <th class="his-th">Работал на судах</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr v-for="(resume, index) in group.data" :key="resume._id" class="his-tr">
                          <td class="his-td">
                            <input
                              type="checkbox"
                              class="let-check"
                              :checked="selectedIds.has(resume._id)"
                              @change="toggleSelect(resume._id)"
                            />
                          </td>
                          <td class="his-td">{{ index + 1 }}</td>
                          <td class="his-td">{{ resume.last_name }} {{ resume.first_name }} {{ resume.patronymic }}</td>
                          <td class="his-td" v-html="formatListWithAbbr(resume.positions)"></td>
                          <td class="his-td">{{ formatSalary(resume.salary) }}</td>
                          <td class="his-td"> {{ resume.country }} , {{resume?.region}} , {{ resume.city }}</td>
                          <td class="his-td" v-html="formatListWithAbbr(resume.worked)"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="let-dop">
                  <div class="let-dop-info">
                    <div class="let-dop-title">Выбрано:</div>
                    <div class="let-dop-num">{{ selectedCount(group.key) }} моряков</div>
                  </div>
                  <div class="let-dop-all" @click="selectAll(group.key)">Выбрать всех</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Teleport to="body">
        <div v-if="mailingModal.open" class="modal modal-thank active">
          <div class="modal-block">
            <img
              v-if="mailingModal.type === 'success'"
              src="assets/img/sudno/green.svg"
              alt="success"
              title="Успешно"
              class="icon-success"
            />
            <img
              v-else-if="mailingModal.type === 'error'"
              src="assets/img/sudno/red.svg"
              alt="error"
              title="Ошибка"
              class="icon-error"
            />

            <h2 class="modal-title">
              {{ mailingModal.title1 }}<br />
              {{ mailingModal.title2 }}
            </h2>

            <button @click="handleMailingModalClose" class="modal-button-blue js-modal-close">
              Закрыть окно
            </button>
          </div>
        </div>

        <div
          :class="['header-overlay', { 'header-overlay__active': mailingModal.open }]"
          @click="handleMailingModalClose"
        ></div>
      </Teleport>

      <div class="resume-buttons let-buttons">
        <button class="primary" @click="sendMailing">
          Отправить {{ totalSelected }} морякам
        </button>
        <button class="secondary" @click="selectedIds.clear()">Сбросить</button>
      </div>
    </NuxtLayout>
  </ClientOnly>
</template>

<script setup>
import api from "@/api/api";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useUsersStore } from "~/store/useUserStore";
import { storeToRefs } from "pinia";
import { useModalStoreRefs, useModalStore } from "~/store/modal";
import { useRoute } from "vue-router";
import { useGlobalSettings } from "~/store/useGlobalSettings";

// NOTE: предполагаю, что WebSocketService глобально доступен как в твоём проекте.
// Если он импортируется — просто добавь import.

const route = useRoute();

const globalSettings = useGlobalSettings();
const { getAfJobs, getAfShips, getAfRegionsRussia } = storeToRefs(globalSettings);

const { modals } = useModalStoreRefs();
const userStore = useUsersStore();
const { userInfo } = storeToRefs(userStore);
const { openModal, closeModal } = useModalStore();

const resumes = ref([]);
const blackList = ref([]);

const searching = ref([]);
const considering = ref([]);
const employed = ref([]);
const blacklistGroup = ref([]);

const selectedIds = ref(new Set());
const vacancy = ref(null);
const vacancyId = ref("");
const position = ref("");

const totalSelected = computed(() => selectedIds.value.size);

const filterData = ref({
  positions: [],
  salary_from: 0,
  salary_to: 0,
  regions: [],
  ships: [],
});

const showFilterVacancy = ref(false);
const showFilterSalary = ref(false);
const showFilterRegions = ref(false);
const showFilterShipType = ref(false);

const hideFiltersAllow = ref(true);
const filtersRoot = ref(null);

const closeAllFilters = () => {
  showFilterVacancy.value = false;
  showFilterSalary.value = false;
  showFilterRegions.value = false;
  showFilterShipType.value = false;
};

const mailingModal = ref({
  open: false,
  type: "success",
  title1: "",
  title2: "",
});

const openMailingModal = (type, title1, title2) => {
  mailingModal.value.open = true;
  mailingModal.value.type = type;
  mailingModal.value.title1 = title1;
  mailingModal.value.title2 = title2;
};

const handleMailingModalClose = () => {
  mailingModal.value.open = false;
};

const onDocumentClick = (e) => {
  if (!filtersRoot.value) return;
  if (!filtersRoot.value.contains(e.target)) closeAllFilters();
};

const searchInput = ref("");
const searchShip = ref("");
const searchRegionInput = ref("");

// ------------------- OPTIONS (jobs/ships) -------------------
const availableOptions = computed(() =>
  (getAfJobs.value || []).filter((x) =>
    x.trim().toLowerCase().includes(searchInput.value.trim().toLowerCase())
  )
);

const availableShipOptions = computed(() =>
  (getAfShips.value || []).filter((x) =>
    x.trim().toLowerCase().includes(searchShip.value.trim().toLowerCase())
  )
);

// ------------------- REGIONS (fixed & universal) -------------------
const normalizeRegions = (src) => {
  const first = src?.[0];
  if (Array.isArray(first?.option_values)) return first.option_values;
  if (Array.isArray(src?.option_values)) return src.option_values;
  if (Array.isArray(src)) return src;
  return [];
};

const availableRegionOptions = computed(() => {
  const q = searchRegionInput.value.trim().toLowerCase();
  const arr = normalizeRegions(getAfRegionsRussia.value);
  const selected = (filterData.value.regions || []).map((x) => String(x).trim()).filter(Boolean);
  const selectedSet = new Set(selected);
  const selectedIndex = new Map();
  selected.forEach((v, i) => selectedIndex.set(v, i));

  return arr
    .map((r) => {
      const value = String(r?.id ?? r?._id ?? r?.value ?? r?.name ?? r ?? "").trim();
      const label = String(r?.name ?? r?.title ?? r?.label ?? r ?? "").trim();

      return {
        value,
        label,
        isSelected: selectedSet.has(value),
        selectedOrder: selectedIndex.has(value) ? selectedIndex.get(value) : 999999,
      };
    })
    .filter((o) => o.value && o.label && o.label.toLowerCase().includes(q))
    .sort((a, b) => {
      if (a.isSelected !== b.isSelected) return a.isSelected ? -1 : 1;
      if (a.isSelected && b.isSelected) return a.selectedOrder - b.selectedOrder;
      return a.label.localeCompare(b.label, "ru");
    })
    .map(({ value, label }) => ({ value, label }));
});

// ------------------- FILTER UI -------------------
const showFilter = (filter) => {
  hideFiltersAllow.value = false;
  closeAllFilters();

  if (filter === 0) showFilterVacancy.value = !showFilterVacancy.value;
  if (filter === 1) showFilterSalary.value = !showFilterSalary.value;
  if (filter === 2) showFilterRegions.value = !showFilterRegions.value;
  if (filter === 3) showFilterShipType.value = !showFilterShipType.value;

  setTimeout(() => (hideFiltersAllow.value = true), 10);
};

const hideFilters = () => {
  setTimeout(() => {
    if (hideFiltersAllow.value) closeAllFilters();
  }, 5);
};

const forceShowFilter = (filter) => {
  hideFiltersAllow.value = false;

  setTimeout(() => {
    if (filter === 0) showFilterVacancy.value = true;
    if (filter === 1) showFilterSalary.value = true;
    if (filter === 2) showFilterRegions.value = true;
    if (filter === 3) showFilterShipType.value = true;
  }, 10);

  setTimeout(() => (hideFiltersAllow.value = true), 20);
};

// ------------------- GROUPS -------------------
const resumeGroups = computed(() => [
  { key: "searching", label: "Моряков со статусом «Ищу работу»", data: searching.value },
  { key: "considering", label: "Моряков со статусом «Рассмотрю предложение»", data: considering.value },
  { key: "employed", label: "Моряков со статусом «Трудоустроен»", data: employed.value },
  { key: "blacklist", label: "Черный список", data: blacklistGroup.value },
]);

function loadVacancyFromUrl() {
  try {
    const id = route.query.v;
    const pos = route.query.n ? decodeURIComponent(route.query.n) : "Вакансия";
    if (!id) throw new Error("URL parameter v not found");

    vacancyId.value = id;
    position.value = pos;
    vacancy.value = { id, position: pos };
  } catch (e) {}
}

// ------------------- API -------------------
const resumeData = async () => {
  try {
    openModal("loader");

    const toIntOrNull = (v) => {
      if (v === "" || v === null || v === undefined) return null;
      const n = Number(v);
      return Number.isFinite(n) ? Math.trunc(n) : null;
    };

    const payload = {
      ...filterData.value,
      salary_from: toIntOrNull(filterData.value.salary_from),
      salary_to: toIntOrNull(filterData.value.salary_to),
    };

    if (Array.isArray(payload.regions)) payload.regions = payload.regions.map(String).filter(Boolean);

    const { data } = await api.post("/resumes-of-mailing/filter", payload);
    resumes.value = data.resumes || [];

    const userEmail = JSON.parse(localStorage.getItem("global/user") || "{}")?.decemail;
    const blackListResponse = await api.post("/get-black-list", { email: userEmail });
    blackList.value = blackListResponse.data.black_list || [];

    let approvedOffers = [];
    if (vacancyId.value) {
      try {
        const vacancyResponse = await api.get(`/all-vacancies/get_vacancy/${vacancyId.value}`);
        approvedOffers = vacancyResponse.data?.vacancy?.approved_offers?.map((id) => String(id)) || [];
      } catch (e) {}
    }

    const blackSet = new Set(blackList.value.map((x) => String(x.sailor_id).trim()));
    const approvedSet = new Set(approvedOffers.map((id) => String(id).trim()));

    const tempSearch = [];
    const tempConsider = [];
    const tempEmployed = [];
    const tempBlack = [];

    for (const r of resumes.value) {
      const id = String(r._id).replace(/ObjectId\(|\)|"/g, "").trim();
      if (approvedSet.has(id)) continue;

      const tarif = String(r.tarif || "").trim();

      if (blackSet.has(id)) {
        const blackItem = blackList.value.find((b) => String(b.sailor_id) === id);
        tempBlack.push({
          ...r,
          black_comment: blackItem?.comment || null,
          black_date: blackItem?.created_at || null,
        });
      } else if (tarif === "Ищу работу") {
        tempSearch.push(r);
      } else if (tarif === "Трудоустроен") {
        tempEmployed.push(r);
      } else {
        tempConsider.push(r);
      }
    }

    searching.value = tempSearch;
    considering.value = tempConsider;
    employed.value = tempEmployed;
    blacklistGroup.value = tempBlack;

    setTimeout(() => closeModal("loader"), 600);
  } catch (err) {
    closeModal("loader");
  }
};

const resetFilter = () => {
  filterData.value = {
    positions: [],
    salary_from: 0,
    salary_to: 0,
    regions: [],
    ships: [],
  };
  resumeData();
};

// ------------------- SELECTING -------------------
const toggleSelect = (id) =>
  selectedIds.value.has(id) ? selectedIds.value.delete(id) : selectedIds.value.add(id);

const selectAll = (key) => {
  const group = resumeGroups.value.find((g) => g.key === key);
  if (!group) return;

  const allSelected = group.data.every((r) => selectedIds.value.has(r._id));
  group.data.forEach((r) =>
    allSelected ? selectedIds.value.delete(r._id) : selectedIds.value.add(r._id)
  );
};

const selectedCount = (key) => {
  const group = resumeGroups.value.find((g) => g.key === key);
  return group ? group.data.filter((r) => selectedIds.value.has(r._id)).length : 0;
};

// ------------------- FORMATTERS -------------------
const formatSalary = (s) => (!s && s !== 0 ? "-" : `${s} RUB`);
const formatListWithAbbr = (arr) =>
  !Array.isArray(arr) || !arr.length
    ? "-"
    : arr.length === 1
    ? arr[0]
    : `<span class="with-tooltip">${arr[0]}<span class="tooltip-content">${arr
        .slice(1)
        .join("<br>")}</span></span>`;

// ------------------- MAILING -------------------
const sendMailing = async () => {
  try {
    const ids = Array.from(selectedIds.value);

    if (!ids.length) {
      openMailingModal("error", "Ошибка!", "Выберите хотя бы одного моряка.");
      return;
    }

    openModal("mailerloader");

    const selectedSailorEmails = resumes.value
      .filter((r) => ids.includes(r._id))
      .map((r) => r.email)
      .filter(Boolean);

    const userData = JSON.parse(localStorage.getItem("global/user") || "{}");
    const company_email = userData?.decemail;
    const vacancy_id = vacancyId.value;
    const usersInfo = userData?.user?.info;

    await Promise.all([
      api.post("/mailing-sailors", { ids, company_email, vacancy_id }),
      api.post("/mailing-history/create", { company_email, sailor_ids: ids, vacancy_id }),
      sendWebSocketOffers(ids, userData, usersInfo),
      sendTelegramNotifications(selectedSailorEmails, vacancy_id),
    ]);

    selectedIds.value.clear();
    openMailingModal("success", "Спасибо!", `Рассылка успешно отправлена ${ids.length} морякам!`);
  } catch (err) {
    openMailingModal("error", "Ошибка!", "Не удалось отправить рассылку. Попробуйте ещё раз.");
  } finally {
    closeModal("mailerloader");
  }
};

const sendWebSocketOffers = async (ids, userData, usersInfo) => {
  for (const sailorId of ids) {
    try {
      if (!WebSocketService?.instance) return;

      const connected = await WebSocketService.instance.waitUntilOpen(5000);
      if (!connected) continue;

      WebSocketService.instance.sendMessage({
        type: "notify",
        receiver_id: sailorId,
        receiver_role: "Моряк",
        message: {
          sender_id: usersInfo?.id,
          role: "Компания",
          name: usersInfo?.first_name,
          resume_id: userData?.userProfileId?.resumeID,
          vacancy_id: vacancyId.value,
          vacancy_name: position.value,
          type: "offer",
        },
      });

      await new Promise((r) => setTimeout(r, 120));
    } catch (e) {}
  }
};

const sendTelegramNotifications = async (emails, vacancy_id) => {
  for (const email of emails) {
    try {
      await api.post("/telegram_message", {
        email,
        vacancy_id,
        type: "mailing",
        vacancy_name: route.query.n ? decodeURIComponent(route.query.n) : "Вакансия",
      });
    } catch (err) {}
  }
};

// ------------------- ACCORDION -------------------
const onClick = (e) => {
  const el = e.target.closest(".accordion");
  if (!el) return;

  const panel = el.nextElementSibling;
  el.classList.toggle("active");
  if (!panel) return;
  panel.style.maxHeight = panel.style.maxHeight ? null : panel.scrollHeight + "px";
};

onMounted(() => {
  loadVacancyFromUrl();
  resumeData();

  document.addEventListener("click", onClick);
  document.addEventListener("click", onDocumentClick, true);
});

onUnmounted(() => {
  document.removeEventListener("click", onClick);
  document.removeEventListener("click", onDocumentClick, true);
});
</script>


<style scoped>
.blue-text {
  color: #007bff;
}
.transparent {
  background-color: #eaecf7;
}
::v-deep .with-tooltip {
  position: relative;
  cursor: default;
  display: inline-block;
  color: #333;
}
::v-deep .tooltip-content {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 100%;
  left: 0;
  width: max-content;
  background: white;
  border: 1px solid #ccc;
  padding: 6px 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  z-index: 10;
  transition: opacity 0.2s;
  white-space: nowrap;
}
::v-deep .with-tooltip:hover .tooltip-content {
  visibility: visible;
  opacity: 1;
}
.let-dop-all {
  cursor: pointer;
}
.mor-nav-search {
  width: 88%;
}
.mor-nav-part {
  width: 100%;
}
.mor-nav-block .mor-nav-item-inner {
  width: 100%;
}
.mor-nav-block input {
  width: 100%;
}
.mor-nav-part.status {
  overflow: unset;
}
.his-table {
  padding-top: 10px !important;
}
.modal-block {
  padding: 30px;
  text-align: center;
}
.modal-block img {
  width: 50px;
  height: 50px;
}
.modal-title {
  margin-top: 10px;
  font-size: 24px;
  font-weight: 600;
  padding-inline: 100px;
}
.modal-button-blue {
  background-color: #3b45a9;
  color: white;
  border: none;
  padding: 25px 65px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.2s;
}
.modal-button-blue:hover {
  background-color: #2f378b;
}
.header-overlay {
  position: fixed;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.45);
  z-index: 9998;
}
.header-overlay__active {
  opacity: 1;
  pointer-events: auto;
}
.modal.active {
  z-index: 9999;
}
.close_position {
  position: absolute;
  right: 10px;
  top: 10px;
  transform: scale(1.2);
}
.select{
  height:40px;
}
.select-regions{
    width:200px;
}
.select.mor-input.mor-input-zp{
  display:flex;
  justify-content:start;
  gap:100px;
}
</style>
