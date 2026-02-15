<template>
  <ClientOnly>
    <NuxtLayout name="section-hero" class="main cabinet">
      <div class="section-hero">
        <AfCustomHeader />
            <div class="mailing-vacancies__intro">
              <h1>Рассылки по вакансиям</h1>
              <p>Выберите активную вакансию и запустите рассылку морякам напрямую из карточки.</p>
            </div>

      </div>
        <section>
          <div class="container">

            <!-- INTRO -->
            <!-- TABS -->
            <div class="tabs">
              <!-- TAB 1 — ACTIVE VACANCIES -->
              <div class="tab-body" v-show="activeTab === 'tab1'">

                <div v-if="loading" class="text-center py-5">Загрузка...</div>

                <div
                  v-else-if="!vacanciesActive.length"
                  class="text-center text-gray-500 py-5"
                >
                  <span class="notAvVac">Нет активных вакансий</span>
                  <div class="suda-top__item vacancy-suda">
                    <div class="suda-top__plus">+</div>
                    <div class="suda-top__content">
                      <a href="/company/new" class="suda-top__title">
                        Создать новую вакансию
                      </a>
                    </div>
                  </div>
                </div>

                <!-- VACANCY GRID -->
                <div v-else class="vacancy-list">
                  <VacancyCardmailing
                    v-for="(item, i) in vacanciesActive"
                    :key="item._id || i"
                    :item="item"
                    :company="company"
                    :vessels="vessels"
                  />
                </div>

                <!-- CREATE NEW BOTTOM BUTTON -->
              </div>
            </div>
            <!-- /tabs -->
          </div>
        </section>

        <AfCustomFooter :lnkStyle="'footer-block footer-block-transparent'" />
    </NuxtLayout>
  </ClientOnly>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "@/api/api";
import { useUsersStore } from "~/store/useUserStore";
import { storeToRefs } from "pinia";
import VacancyCardmailing from "~/components/list/VacancyCardmailing.vue";
import AfCustomFooter from "~/components/AfCustomFooter.vue";

definePageMeta({
  middleware: ["company"],
});

const userStore = useUsersStore();
const { userInfo } = storeToRefs(userStore);
const router = useRouter();

// Tabs
const activeTab = ref("tab1");
const setActiveTab = (tab) => (activeTab.value = tab);

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

const formatSalary = (vacancy) => {
  if (!vacancy) return "не указана";
  const { salary_from, salary_to } = vacancy;
  if (salary_from && salary_to) return `${salary_from} - ${salary_to} ₽`;
  if (salary_from) return `от ${salary_from} ₽`;
  if (salary_to) return `до ${salary_to} ₽`;
  return "не указана";
};

const formatDeparture = (vacancy) => {
  if (!vacancy) return "не указана";
  const from =
    vacancy.date_of_departure_from ||
    vacancy.departure_from ||
    vacancy.date_from ||
    vacancy.date_of_departure ||
    "";
  const to =
    vacancy.date_of_departure_to ||
    vacancy.departure_to ||
    vacancy.date_to ||
    "";

  if (from && to) return `${from} - ${to}`;
  return from || to || "не указана";
};

const formatDate = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("ru-RU");
};

const goToVacancyDetails = (vacancy) => {
  const vacancyId = vacancy?._id || vacancy?.id;
  if (!vacancyId) return;
  router.push(`/vacancy/${vacancyId}`);
};

const verifyVacancy = async (vacancyId) => {
  try {
    const { data } = await api.get(`/company/verify-vacancy/${vacancyId}`);
    console.log("Vacancy verified:", data);

    // Update frontend instantly
    const vacancy =
      vacanciesDrafts.value.find(v => v._id === vacancyId) ||
      vacanciesInactive.value.find(v => v._id === vacancyId);

    if (vacancy) {
      vacancy.is_publish = true;
      vacancy.is_active = true;

      vacanciesActive.value.push(vacancy);
      vacanciesDrafts.value = vacanciesDrafts.value.filter(v => v._id !== vacancyId);
      vacanciesInactive.value = vacanciesInactive.value.filter(v => v._id !== vacancyId);
    }
    fetchVacancies();
  } catch (error) {
    console.error("Error verifying vacancy:", error);
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
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

const goToCreateMailing = (vacancy) => {
  if (!vacancy) return;

  const vacancyId = vacancy._id || vacancy.id;
  if (!vacancyId) {
    console.warn("❌ Vacancy id is missing");
    return;
  }

  router.push({
    path: "/company/mailings/create-newsletter",
    query: {
      v: vacancyId,
      n: vacancy.position || "Вакансия",
    },
  });
};

onMounted(fetchVacancies);
</script>

<style scoped>
.section-hero{
  padding-top: 30px;
}
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

.mailing-vacancies__intro {
  margin-bottom: 24px;
  padding: 50px 100px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.mailing-vacancies__intro h1 {
  margin-bottom: 8px;
  font-size: 28px;
  max-width: 1200px;
  width: 100%;
}

.mailing-vacancies__intro p {
  margin: 0;
  max-width: 1200px;
  width: 100%;
}

.vacancy-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;
}

.link-btn {
  display: inline-flex;
  margin-right: 18px;
  cursor: pointer;
  color: #3b45a9;
  font-weight: 600;
}

.link-btn.danger {
  color: #ef3f51;
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
.notAvVac{
  font-size: 18px;
  font-weight: 600;
}

@media screen and (max-width: 950px) {
  .vacancy-list {
    grid-template-columns: 1fr;
    gap: 40px;
  }

}
</style>
