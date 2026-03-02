<template>
  <ClientOnly>
    <NuxtLayout class="section-hero section-hero-post section-back-none main" name="custom">
      <section class="section-about">
        <div class="container">
          <div class="about">
            <div class="tarif-top tarif-top-off">
              <h1 class="set-title about-title">
                Итоговая статистика:
              </h1>

              <ul class="tarif-list" id="tabNav">
                <li><a @click="at=true,lm=false" :class="{ tactive: at }">За всё время</a></li>
                <li><a @click="at=false,lm=true" :class="{ tactive: lm }">За последний месяц</a></li>
              </ul>
            </div>

            <div id="tabsWrap" class="tarif-block">
              <div class="tarif-tab" v-if="at" id="tab1">
                <div class="about-block tarif-block-off">
                  <div class="about-item" v-if="globalAll.total_accepted">
                    <div class="about-image-block">
                      <img src="assets/img/dop-page/itog-1.svg" alt="image" class="about-item__img">
                    </div>
                    <div class="about-info">
                      <div class="tarif-off-part">
                        <div class="tarif-off-blue">Итого принято:</div>
                        <div class="about-info__title">
                          {{ globalAll.total_accepted }}
                          <span class="about-info__plus">моряков</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="about-item" v-if="globalAll.published">
                    <div class="about-image-block">
                      <img src="assets/img/dop-page/itog-2.svg" alt="image" class="about-item__img">
                    </div>
                    <div class="about-info">
                      <div class="tarif-off-part">
                        <div class="tarif-off-blue">Итого опубликовано</div>
                        <div class="about-info__title">
                          {{ globalAll.published }}
                          <span class="about-info__plus">вакансий</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="about-item" v-if="globalAll.responses">
                    <div class="about-image-block">
                      <img src="assets/img/dop-page/itog-3.svg" alt="image" class="about-item__img">
                    </div>
                    <div class="about-info">
                      <div class="tarif-off-part">
                        <div class="tarif-off-blue">Поступило:</div>
                        <div class="about-info__title">
                          {{ globalAll.responses }}
                          <span class="about-info__plus">откликов</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="about-item" v-if="globalAll.responses_accepted">
                    <div class="about-image-block">
                      <img src="assets/img/dop-page/itog-3.svg" alt="image" class="about-item__img">
                    </div>
                    <div class="about-info">
                      <div class="tarif-off-part">
                        <div class="tarif-off-blue">Из них, вы приняли:</div>
                        <div class="about-info__title">
                          {{ globalAll.responses_accepted }}
                          <span class="about-info__plus">откликов моряков</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="about-item" v-if="globalAll.offers_sent">
                    <div class="about-image-block">
                      <img src="assets/img/dop-page/itog-4.svg" alt="image" class="about-item__img">
                    </div>
                    <div class="about-info">
                      <div class="tarif-off-part">
                        <div class="tarif-off-blue">Вы отправили:</div>
                        <div class="about-info__title">
                          {{ globalAll.offers_sent }}
                          <span class="about-info__plus">предложений</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="about-item" v-if="globalAll.offers_accepted">
                    <div class="about-image-block">
                      <img src="assets/img/about/icon-4.svg" alt="image" class="about-item__img">
                    </div>
                    <div class="about-info">
                      <div class="tarif-off-part">
                        <div class="tarif-off-blue">Ваше предложение приняли:</div>
                        <div class="about-info__title">
                          {{ globalAll.offers_accepted }}
                          <span class="about-info__plus">моряков</span>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div v-if="!hasAnyGlobalAll" style="padding:10px;">
                    Нет данных
                  </div>
                </div>
              </div>
              <div class="tarif-tab" v-if="lm" id="tab2">
                <div class="about-block tarif-block-off">

                  <div class="about-item" v-if="globalMonth.total_accepted">
                    <div class="about-image-block">
                      <img src="assets/img/dop-page/itog-1.svg" alt="image" class="about-item__img">
                    </div>
                    <div class="about-info">
                      <div class="tarif-off-part">
                        <div class="tarif-off-blue">Итого принято:</div>
                        <div class="about-info__title">
                          {{ globalMonth.total_accepted }}
                          <span class="about-info__plus">откликов моряков</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="about-item" v-if="globalMonth.published">
                    <div class="about-image-block">
                      <img src="assets/img/dop-page/itog-2.svg" alt="image" class="about-item__img">
                    </div>
                    <div class="about-info">
                      <div class="tarif-off-part">
                        <div class="tarif-off-blue">Итого опубликовано</div>
                        <div class="about-info__title">
                          {{ globalMonth.published }}
                          <span class="about-info__plus">вакансий</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="about-item" v-if="globalMonth.responses">
                    <div class="about-image-block">
                      <img src="assets/img/dop-page/itog-3.svg" alt="image" class="about-item__img">
                    </div>
                    <div class="about-info">
                      <div class="tarif-off-part">
                        <div class="tarif-off-blue">Поступило:</div>
                        <div class="about-info__title">
                          {{ globalMonth.responses }}
                          <span class="about-info__plus">откликов</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="about-item" v-if="globalMonth.responses_accepted">
                    <div class="about-image-block">
                      <img src="assets/img/dop-page/itog-3.svg" alt="image" class="about-item__img">
                    </div>
                    <div class="about-info">
                      <div class="tarif-off-part">
                        <div class="tarif-off-blue">Из них, вы приняли:</div>
                        <div class="about-info__title">
                          {{ globalMonth.responses_accepted }}
                          <span class="about-info__plus">моряков</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="about-item" v-if="globalMonth.offers_sent">
                    <div class="about-image-block">
                      <img src="assets/img/dop-page/itog-4.svg" alt="image" class="about-item__img">
                    </div>
                    <div class="about-info">
                      <div class="tarif-off-part">
                        <div class="tarif-off-blue">Вы отправили:</div>
                        <div class="about-info__title">
                          {{ globalMonth.offers_sent }}
                          <span class="about-info__plus">предложений</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="about-item" v-if="globalMonth.offers_accepted">
                    <div class="about-image-block">
                      <img src="assets/img/about/icon-4.svg" alt="image" class="about-item__img">
                    </div>
                    <div class="about-info">
                      <div class="tarif-off-part">
                        <div class="tarif-off-blue">Ваше предложение приняли:</div>
                        <div class="about-info__title">
                          {{ globalMonth.offers_accepted }}
                          <span class="about-info__plus">моряков</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="!hasAnyGlobalMonth" style="padding:10px;">
                    Нет данных
                  </div>

                </div>
              </div>
            </div>

            <div class="tarif-top tarif-top-off tarif-top-end">
              <h1 class="set-title about-title">
                По вакансиям:
              </h1>

              <ul class="tarif-list" id="tabNav1">
                <li><a @click="at2=true,lm2=false" :class="{ tactive: at2 }">За всё время</a></li>
                <li><a @click="at2=false,lm2=true" :class="{ tactive: lm2 }">За последний месяц</a></li>
              </ul>
            </div>

            <div id="tabsWrap1" class="tarif-block">
              <div class="tarif-tab" v-if="at2" id="tab3">
                <div class="stat-block">
                  <div
                    v-for="v in vacAllVisible"
                    :key="v.vacancy_id"
                    class="stat-item"
                  >
                    <div class="stat-top">
                      <img src="assets/img/dop-page/stat-1.svg" alt="image" class="stat-top-img">

                      <div class="stat-top-content">
                        <div class="stat-top-title">
                          {{ v.position || "Вакансия" }}
                          <span>от {{ formatDate(v.created_at) }}</span>
                        </div>

                        <div class="stat-top-subtitle">
                          Вакансию просмотрели:
                          <span>{{ v.views }} раз</span>
                        </div>
                      </div>
                    </div>

                    <div class="stat-part">
                      <div class="stat-all" v-if="v.total_accepted">
                        <div class="stat-all-blue">Итого, вы приняли:</div>
                        <div class="stat-all-number">{{ v.total_accepted }}</div>
                        <div class="stat-all-title">моряков</div>
                      </div>

                      <div class="stat-info">
                        <div class="stat-info-item" v-if="v.responses_received">
                          <div class="stat-blue">Поступило:</div>
                          <div class="stat-red">{{ v.responses_received }} <span>откликов</span></div>
                        </div>

                        <div class="stat-info-item" v-if="v.offers_sent">
                          <div class="stat-blue">Индивидуально отправили:</div>
                          <div class="stat-red">{{ v.offers_sent }} <span>предложений</span></div>
                        </div>

                        <div class="stat-info-item" v-if="v.approved_responses">
                          <div class="stat-blue">По откликам, принято:</div>
                          <div class="stat-red">{{ v.approved_responses }} <span>моряка</span></div>
                        </div>

                        <div class="stat-info-item" v-if="v.approved_offers">
                          <div class="stat-blue">Ваше предложение приняло:</div>
                          <div class="stat-red">{{ v.approved_offers }} <span>моряка</span></div>
                        </div>

                        <div v-if="!hasAnyVacLine(v)" style="padding:8px 0;">
                          Нет данных по этой вакансии
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    v-if="vacAllVisible.length < vacAll.length"
                    class="stat-button"
                    @click="loadMore('all')"
                  >
                    <img src="assets/img/dop-page/white-plus.svg" alt="img" class="stat-button-icon">
                    <div class="stat-button-title">
                      Загрузить еще
                      <span class="stat-button-num">({{ vacAll.length - vacAllVisible.length }})</span>
                    </div>
                  </button>

                  <div v-if="vacAll.length === 0" style="padding:10px;">
                    Нет данных по вакансиям
                  </div>
                </div>
              </div>

              <!-- LAST MONTH -->
              <div class="tarif-tab" v-if="lm2" id="tab4">
                <div class="stat-block">
                  <div
                    v-for="v in vacMonthVisible"
                    :key="v.vacancy_id"
                    class="stat-item"
                  >
                    <div class="stat-top">
                      <img src="assets/img/dop-page/stat-1.svg" alt="image" class="stat-top-img">

                      <div class="stat-top-content">
                        <div class="stat-top-title">
                          {{ v.position || "Вакансия" }}
                          <span>от {{ formatDate(v.created_at) }}</span>
                        </div>

                        <div class="stat-top-subtitle">
                          Вакансию просмотрели:
                          <span>{{ v.views }} раз</span>
                        </div>
                      </div>
                    </div>

                    <div class="stat-part">
                      <div class="stat-all" v-if="v.total_accepted">
                        <div class="stat-all-blue">Итого, вы приняли:</div>
                        <div class="stat-all-number">{{ v.total_accepted }}</div>
                        <div class="stat-all-title">моряков</div>
                      </div>

                      <div class="stat-info">
                        <div class="stat-info-item" v-if="v.responses_received">
                          <div class="stat-blue">Поступило:</div>
                          <div class="stat-red">{{ v.responses_received }} <span>откликов</span></div>
                        </div>

                        <div class="stat-info-item" v-if="v.offers_sent">
                          <div class="stat-blue">Индивидуально отправили:</div>
                          <div class="stat-red">{{ v.offers_sent }} <span>предложений</span></div>
                        </div>

                        <div class="stat-info-item" v-if="v.approved_responses">
                          <div class="stat-blue">По откликам, принято:</div>
                          <div class="stat-red">{{ v.approved_responses }} <span>моряка</span></div>
                        </div>

                        <div class="stat-info-item" v-if="v.approved_offers">
                          <div class="stat-blue">Ваше предложение приняло:</div>
                          <div class="stat-red">{{ v.approved_offers }} <span>моряка</span></div>
                        </div>

                        <div v-if="!hasAnyVacLine(v)" style="padding:8px 0;">
                          Нет данных по этой вакансии
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    v-if="vacMonthVisible.length < vacMonth.length"
                    class="stat-button"
                    @click="loadMore('month')"
                  >
                    <img src="assets/img/dop-page/white-plus.svg" alt="img" class="stat-button-icon">
                    <div class="stat-button-title">
                      Загрузить еще
                      <span class="stat-button-num">({{ vacMonth.length - vacMonthVisible.length }})</span>
                    </div>
                  </button>

                  <div v-if="vacMonth.length === 0" style="padding:10px;">
                    Нет данных по вакансиям за месяц
                  </div>
                </div>
              </div>
              <!-- /.about-tab -->
            </div>
            <!-- /.tarif-block -->
          </div>
          <!-- /.about -->
        </div>
        <!-- /.container -->
      </section>
    </NuxtLayout>
  </ClientOnly>
</template>

<script setup>
import api from "@/api/api"
import { ref, computed, onMounted } from "vue"
import { useUsersStore } from "~/store/useUserStore"
import { storeToRefs } from "pinia"
import { useModalStore } from "~/store/modal"

definePageMeta({
  middleware: ["company"],
})

const at = ref(true)
const lm = ref(false)
const at2 = ref(true)
const lm2 = ref(false)

const userStore = useUsersStore()
const { userInfo } = storeToRefs(userStore)
const { openModal, closeModal } = useModalStore()

const perPage = ref(6)
const shownAll = ref(6)
const shownMonth = ref(6)

const stats = ref({
  global: { all_time: {}, last_month: {} },
  vacancies: { all_time: [], last_month: [] },
})

const globalAll = computed(() => ({
  total_accepted: stats.value?.global?.all_time?.total_accepted ?? 0,
  published: stats.value?.global?.all_time?.published ?? 0,
  responses: stats.value?.global?.all_time?.responses ?? 0,
  responses_accepted: stats.value?.global?.all_time?.responses_accepted ?? 0,
  offers_sent: stats.value?.global?.all_time?.offers_sent ?? 0,
  offers_accepted: stats.value?.global?.all_time?.offers_accepted ?? 0,
}))

const globalMonth = computed(() => ({
  total_accepted: stats.value?.global?.last_month?.total_accepted ?? 0,
  published: stats.value?.global?.last_month?.published ?? 0,
  responses: stats.value?.global?.last_month?.responses ?? 0,
  responses_accepted: stats.value?.global?.last_month?.responses_accepted ?? 0,
  offers_sent: stats.value?.global?.last_month?.offers_sent ?? 0,
  offers_accepted: stats.value?.global?.last_month?.offers_accepted ?? 0,
}))

// show "Нет данных" blocks
const hasAnyGlobalAll = computed(() => {
  const g = globalAll.value
  return !!(g.total_accepted || g.published || g.responses || g.responses_accepted || g.offers_sent || g.offers_accepted)
})
const hasAnyGlobalMonth = computed(() => {
  const g = globalMonth.value
  return !!(g.total_accepted || g.published || g.responses || g.responses_accepted || g.offers_sent || g.offers_accepted)
})

const vacAll = computed(() => stats.value?.vacancies?.all_time ?? [])
const vacMonth = computed(() => stats.value?.vacancies?.last_month ?? [])

const vacAllVisible = computed(() => (vacAll.value || []).slice(0, shownAll.value))
const vacMonthVisible = computed(() => (vacMonth.value || []).slice(0, shownMonth.value))

const loadMore = (type) => {
  if (type === "all") shownAll.value = Math.min(shownAll.value + perPage.value, vacAll.value.length)
  if (type === "month") shownMonth.value = Math.min(shownMonth.value + perPage.value, vacMonth.value.length)
}

const hasAnyVacLine = (v) => {
  return !!(v?.total_accepted || v?.responses_received || v?.offers_sent || v?.approved_responses || v?.approved_offers)
}

const formatDate = (dt) => {
  if (!dt) return "-"
  const d = new Date(dt)
  if (Number.isNaN(d.getTime())) return "-"
  return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "short", year: "numeric" })
}

const getCompanyId = () => {
    const companyId = JSON.parse(localStorage.getItem("global/user") || '{}')?.userProfileId?.resumeID;
    return companyId    

}

const fetchStats = async () => {
  try {
    openModal("loader")

    const companyId = getCompanyId()
    if (!companyId) {
      console.error("❌ company_id not found (store/localStorage)")
      return
    }

    const res = await api.get(`/statistics/${companyId}`)
    stats.value = res?.data ?? stats.value

    shownAll.value = perPage.value
    shownMonth.value = perPage.value
  } catch (e) {
    console.error(
      "❌ fetchStats error:",
      e?.response?.data?.detail || e?.response?.data?.message || e?.message || e
    )
  } finally {
    closeModal("loader")
  }
}

onMounted(() => {
  fetchStats()
})
</script>

<style lang="scss" scoped>
.tarif-list a.tactive {
  border-bottom: 4px solid #3b45a9;
  color: #3b45a9;
}
.tarif-tab {
  display: flex;
}
</style>
