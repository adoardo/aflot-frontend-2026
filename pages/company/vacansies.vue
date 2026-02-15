<template>
  <ClientOnly>
    <NuxtLayout name="default-hero" class="main cabinet">
      <div>
        <AfHeaderColor />
      </div>

      <section id="responses">
        <div class="container">
          <div class="tabs">
            <div class="tab-header">
              <div
                class="tab-label"
                @click="setActiveTab(0)"
                :class="{ active: activeTab === 0 }"
              >
                Вакансии
              </div>

              <div
                class="tab-label"
                @click="setActiveTab(1)"
                :class="{ active: activeTab === 1 }"
              >
                Черновики
              </div>

              <div
                class="tab-label"
                @click="setActiveTab(2)"
                :class="{ active: activeTab === 2 }"
              >
                Неактуальные вакансии
              </div>
            </div>

            <!-- TAB 0 — ACTIVE VACANCIES -->
            <div class="tab-body" v-show="activeTab === 0">
              <div v-if="loading" class="text-center py-5">Загрузка...</div>

              <div v-else-if="!vacanciesActive.length" class="text-center text-gray-500 py-5">
                <span class="notvacancy">Нет активных вакансий</span>

                <div class="suda-top__item vacancy-suda">
                  <div class="suda-top__plus">+</div>
                  <div class="suda-top__content">
                    <a href="/company/new" class="suda-top__title">Создать новую вакансию</a>
                    <div v-if="vacanciesActive.length" class="suda-top__text">
                      Доступно: {{ company?.available_vacancies ?? "—" }}
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="vacancy-detail__list">
                <div
                  class="vacancy vacancy-detail"
                  v-for="(item, i) in vacanciesActive"
                  :key="item._id || item.id || i"
                >
                  <div class="vacancy__label">
                    {{ item.position }}
                    <div class="news-view" v-if="item.view_count">
                      <img src="assets/img/news/icon.svg" alt="views" />
                      <span>{{ item.view_count }}</span>
                    </div>
                  </div>

                  <div class="vacancy__info vacancy__info__four">
                    <div class="vi-item">
                      <div class="vi-label">Название судна:</div>
                      {{ findVesselName(item.vessel) }}
                    </div>

                    <div class="vi-item">
                      <div class="vi-label">Дата посадки:</div>
                      {{ item.date_of_departure_from || "—" }} - {{ item.date_of_departure_to || "—" }}
                    </div>

                    <div class="vi-item">
                      <div class="vi-label">Зарплата:</div>
                      {{ item.salary_from }} - {{ item.salary_to }} RUB
                    </div>

                    <div class="vi-item">
                      <div class="vi-label">Тип судна:</div>
                      {{ findVesselType(item.vessel) }}
                    </div>

                    <div class="vi-item">
                      <div class="vi-label">Email для связи:</div>
                      {{ item.email || "—" }}
                    </div>

                    <div class="vi-item">
                      <div class="vi-label">Телефон №1:</div>
                      {{ item.phone1 || "—" }}
                    </div>

                    <div class="vi-item">
                      <div class="vi-label">Телефон №2:</div>
                      {{ item.phone2 || "—" }}
                    </div>

                    <div class="vi-item">
                      <div class="vi-label">Длит-ть контракта:</div>
                      {{ item.contract_duration || "—" }}
                    </div>
                  </div>

                  <div class="vacancy__links">
                    <div>
                      <span>Готовы к работе</span>
                      <span>Отклики <span class="count">{{ item.responses?.length || 0 }}</span></span>
                      <span>Отправленные предложения</span>
                    </div>

                    <div>
                      <span @click="creating_mailing(item._id || item.id, item.position)">Создать рассылку</span>
                      <span>Поднять в топ 10</span>
                    </div>

                    <div>
                      <span class="blue">Редактировать вакансию</span>
                      <span class="blue">Переопубликовать вакансию</span>
                      <span class="blue">Закрыть вакансию</span>
                    </div>
                  </div>

                  <div class="vacancy__date">
                    {{ new Date(item.created_at).toLocaleDateString("ru-RU") }}
                  </div>
                </div>

                <div class="suda-top__item vacancy-suda">
                  <div class="suda-top__plus">+</div>
                  <div class="suda-top__content">
                    <a href="/company/new" class="suda-top__title">Создать новую вакансию</a>
                    <div class="suda-top__text">
                      Доступно: {{ company?.available_vacancies ?? "—" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- TAB 1 — DRAFTS -->
            <div class="tab-body" v-show="activeTab === 1">
              <div v-if="loading" class="text-center py-5">Загрузка...</div>
              <div v-else-if="!vacanciesDrafts.length" class="text-center text-gray-500 py-5">
                <span class="notvacancy">Нет черновиков</span>
              </div>

              <div v-else class="vacancy-detail__list">
                <div
                  class="vacancy vacancy-detail"
                  v-for="(item, i) in vacanciesDrafts"
                  :key="item._id || item.id || i"
                >
                  <div class="vacancy__label">{{ item.position }}</div>

                  <div class="vacancy__info vacancy__info__four">
                    <div class="vi-item">
                      <div class="vi-label">Название судна:</div>
                      {{ findVesselName(item.vessel) }}
                    </div>

                    <div class="vi-item">
                      <div class="vi-label">Зарплата:</div>
                      {{ item.salary_from }} - {{ item.salary_to }} RUB
                    </div>

                    <div class="vi-item">
                      <div class="vi-label">Тип судна:</div>
                      {{ findVesselType(item.vessel) }}
                    </div>

                    <div class="vi-item">
                      <div class="vi-label">Дата посадки:</div>
                      <span class="red">Не указана</span>
                    </div>
                  </div>

                  <div class="vacancy__links">
                    <div>
                      <span>Редактировать вакансию</span>
                      <span class="blue" @click="verifyVacancy(item._id || item.id)">Проверить вакансию</span>
                    </div>
                    <div><span class="blue">Удалить из черновиков</span></div>
                  </div>

                  <div class="vacancy__date">
                    {{ new Date(item.created_at).toLocaleDateString("ru-RU") }}
                  </div>
                </div>
              </div>
            </div>

            <!-- TAB 2 — INACTIVE VACANCIES -->
            <div class="tab-body" v-show="activeTab === 2">
              <div v-if="loading" class="text-center py-5">Загрузка...</div>
              <div v-else-if="!vacanciesInactive.length" class="text-center text-gray-500 py-5">
                <span class="notvacancy">Нет неактуальных вакансий</span>
              </div>

              <div v-else class="vacancy-detail__list">
                <div
                  class="vacancy vacancy-detail"
                  v-for="(item, i) in vacanciesInactive"
                  :key="item._id || item.id || i"
                >
                  <div class="vacancy__label">{{ item.position }}</div>

                  <div class="vacancy__info vacancy__info__four">
                    <div class="vi-item">
                      <div class="vi-label">Название судна:</div>
                      {{ findVesselName(item.vessel) }}
                    </div>

                    <div class="vi-item">
                      <div class="vi-label">Дата посадки:</div>
                      {{ item.date_of_departure_from }} - {{ item.date_of_departure_to }}
                    </div>

                    <div class="vi-item">
                      <div class="vi-label">Зарплата:</div>
                      {{ item.salary_from }} - {{ item.salary_to }} RUB
                    </div>

                    <div class="vi-item">
                      <div class="vi-label">Тип судна:</div>
                      {{ findVesselType(item.vessel) }}
                    </div>
                  </div>

                  <div class="vacancy__links">
                    <div><span class="blue" @click="verifyVacancy(item._id || item.id)">Переопубликовать вакансию</span></div>
                    <div><span class="blue">Удалить</span></div>
                  </div>

                  <div class="vacancy__date">
                    {{ new Date(item.created_at).toLocaleDateString("ru-RU") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AfCustomFooter :lnkStyle="'footer-block footer-block-transparent'" />
    </NuxtLayout>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "#imports";
import api from "@/api/api";
import { useUsersStore } from "~/store/useUserStore";
import { storeToRefs } from "pinia";

definePageMeta({
  middleware: ["company"],
});

const route = useRoute();
const router = useRouter();

const userStore = useUsersStore();
const { userInfo } = storeToRefs(userStore);

// Tabs: 0=Актуальные, 1=Черновики, 2=Неактуальные
const activeTab = ref(0);

function normalizeTab(val) {
  const raw = Array.isArray(val) ? val[0] : val;
  const n = Number(raw);
  return [0, 1, 2].includes(n) ? n : 0;
}

const setActiveTab = async (tabIndex) => {
  const t = normalizeTab(tabIndex);
  activeTab.value = t;

  // keep URL in sync: /company/vacansies?tab=0|1|2
  await router.replace({
    query: { ...route.query, tab: String(t) },
  });
};

// Sync from URL (works on reload + back/forward + sidebar links)
watch(
  () => route.query.tab,
  (t) => {
    activeTab.value = normalizeTab(t);
  },
  { immediate: true }
);

// Data
const vacanciesActive = ref([]);
const vacanciesDrafts = ref([]);
const vacanciesInactive = ref([]);
const vessels = ref([]);
const company = ref(null);
const loading = ref(false);
const error = ref(null);

// Helpers
function findVesselName(vesselId) {
  const vessel = vessels.value.find((v) => v.id === vesselId);
  return vessel?.vessel_name || "—";
}

function findVesselType(vesselId) {
  const vessel = vessels.value.find((v) => v.id === vesselId);
  return vessel?.ship_type || "—";
}

const verifyVacancy = async (vacancyId) => {
  try {
    const { data } = await api.get(`/company/verify-vacancy/${vacancyId}`);
    console.log("Vacancy verified:", data);

    // Update frontend instantly
    const vacancy =
      vacanciesDrafts.value.find((v) => (v._id || v.id) === vacancyId) ||
      vacanciesInactive.value.find((v) => (v._id || v.id) === vacancyId);

    if (vacancy) {
      vacancy.is_publish = true;
      vacancy.is_active = true;

      vacanciesActive.value.push(vacancy);
      vacanciesDrafts.value = vacanciesDrafts.value.filter((v) => (v._id || v.id) !== vacancyId);
      vacanciesInactive.value = vacanciesInactive.value.filter((v) => (v._id || v.id) !== vacancyId);
    }

    fetchVacancies();
  } catch (e) {
    console.error("Error verifying vacancy:", e);
  }
};

// Fetch data
async function fetchVacancies() {
  try {
    loading.value = true;

    const companyId = JSON.parse(localStorage.getItem("global/user") || "{}")?.userProfileId?.resumeID;
    if (!companyId) {
      console.warn("❌ No company_id found");
      return;
    }

    const { data } = await api.get(`/all-vacancies/get_company_vacancies/${companyId}`);
    console.log("✅ Полученные данные вакансий:", data);

    company.value = data.company;
    vessels.value = data.vessels || [];
    const all = data.vacancies || [];

    vacanciesActive.value = all.filter((v) => v.is_publish && v.is_active);
    vacanciesDrafts.value = all.filter((v) => !v.is_publish);
    vacanciesInactive.value = all.filter((v) => v.is_publish && !v.is_active);
  } catch (err) {
    console.error("Ошибка при загрузке вакансий:", err);
    error.value = err?.message || "Ошибка";
  } finally {
    loading.value = false;
  }
}

const creating_mailing = (vacancyId, position) => {
  window.location.href = `/company/mailings/create-newsletter?v=${vacancyId}&n=${position}`;
};

onMounted(fetchVacancies);
</script>

<style scoped>
.tab-header {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.tab-label {
  cursor: pointer;
  padding: 10px 20px;
  border-bottom: 2px solid transparent;
}

.tab-label.active {
  border-color: #3b45a9;
  font-weight: bold;
}

.text-center {
  text-align: center;
}

.text-gray-500 {
  color: #888;
}

.py-5 {
  padding: 20px 0;
}

.red {
  color: #d33;
}

.notvacancy {
  font-weight: bold;
  font-size: 20px;
}
</style>
