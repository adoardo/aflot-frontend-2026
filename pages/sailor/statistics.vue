<template>
  <ClientOnly>
    <NuxtLayout class="section-hero section-hero-post section-back-none main" name="custom">
      <section class="section-about">
        <div class="container">
          <div class="about">
            <div class="tarif-top tarif-top-off">
              <h1 class="about-title">
                Статистика
              </h1>

              <ul class="tarif-list" id="tabNav">
                <li><a @click="at=true,lm=false" :class="{ tactive: at }">За всё время</a></li>
                <li><a @click="at=false,lm=true" :class="{ tactive: lm }">За последний месяц</a></li>
              </ul>
            </div>

            <div id="tabsWrap" class="tarif-block">
              <!-- =========================
                   ALL TIME
              ========================== -->
              <div class="tarif-tab" v-if="at" id="tab1">
                <div class="about-block tarif-block-off">

                  <div class="about-item" v-if="statsAll.offers">
                    <img src="assets/img/about/icon-1.svg" alt="image" class="about-item__img">
                    <div class="about-info">
                      <div class="tarif-off-part">
                        <div class="tarif-off-blue">Итого возможностей:</div>
                        <div class="about-info__title">
                          {{ statsAll.offers }}
                          <span class="about-info__plus">предложений</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="about-item" v-if="statsAll.offers">
                    <img src="assets/img/dop-page/icon-2.svg" alt="image" class="about-item__img">
                    <div class="about-info">
                      <div class="tarif-off-part">
                        <div class="tarif-off-blue">Вы получили:</div>
                        <div class="about-info__title">
                          {{ statsAll.offers }}
                          <span class="about-info__plus">предложений</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="about-item" v-if="statsAll.offers_accepted">
                    <img src="assets/img/dop-page/icon-2.svg" alt="image" class="about-item__img">
                    <div class="about-info">
                      <div class="tarif-off-part">
                        <div class="tarif-off-blue">Вы согласились рассмотреть:</div>
                        <div class="about-info__title">
                          {{ statsAll.offers_accepted }}
                          <span class="about-info__plus">вакансий</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="about-item" v-if="statsAll.responses">
                    <img src="assets/img/dop-page/icon-3.svg" alt="image" class="about-item__img">
                    <div class="about-info">
                      <div class="tarif-off-part">
                        <div class="tarif-off-blue">Вы откликнулись на:</div>
                        <div class="about-info__title">
                          {{ statsAll.responses }}
                          <span class="about-info__plus">вакансий</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="about-item" v-if="statsAll.responses_accepted">
                    <img src="assets/img/dop-page/icon-3.svg" alt="image" class="about-item__img">
                    <div class="about-info">
                      <div class="tarif-off-part">
                        <div class="tarif-off-blue">Ваши отклики приняло:</div>
                        <div class="about-info__title">
                          {{ statsAll.responses_accepted }}
                          <span class="about-info__plus">компаний</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="about-item" v-if="statsAll.viewed">
                    <img src="assets/img/dop-page/icon-4.svg" alt="image" class="about-item__img">
                    <div class="about-info">
                      <div class="tarif-off-part">
                        <div class="tarif-off-blue">Ваше резюме просмотрели:</div>
                        <div class="about-info__title">
                          {{ statsAll.viewed }}
                          <span class="about-info__plus">раз</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="!hasAnyAll" style="padding: 10px;">
                    Нет данных
                  </div>
                </div>
              </div>

              <!-- =========================
                   LAST MONTH
              ========================== -->
              <div class="tarif-tab" v-if="lm" id="tab2">
                <div class="about-block tarif-block-off">

                  <div class="about-item" v-if="statsMonth.offers">
                    <img src="assets/img/about/icon-1.svg" alt="image" class="about-item__img">
                    <div class="about-info">
                      <div class="tarif-off-part">
                        <div class="tarif-off-blue">Итого возможностей:</div>
                        <div class="about-info__title">
                          {{ statsMonth.offers }}
                          <span class="about-info__plus">предложений</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="about-item" v-if="statsMonth.offers">
                    <img src="assets/img/dop-page/icon-2.svg" alt="image" class="about-item__img">
                    <div class="about-info">
                      <div class="tarif-off-part">
                        <div class="tarif-off-blue">Вы получили:</div>
                        <div class="about-info__title">
                          {{ statsMonth.offers }}
                          <span class="about-info__plus">предложений</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="about-item" v-if="statsMonth.offers_accepted">
                    <img src="assets/img/dop-page/icon-2.svg" alt="image" class="about-item__img">
                    <div class="about-info">
                      <div class="tarif-off-part">
                        <div class="tarif-off-blue">Вы согласились рассмотреть:</div>
                        <div class="about-info__title">
                          {{ statsMonth.offers_accepted }}
                          <span class="about-info__plus">вакансий</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="about-item" v-if="statsMonth.responses">
                    <img src="assets/img/dop-page/icon-3.svg" alt="image" class="about-item__img">
                    <div class="about-info">
                      <div class="tarif-off-part">
                        <div class="tarif-off-blue">Вы откликнулись на:</div>
                        <div class="about-info__title">
                          {{ statsMonth.responses }}
                          <span class="about-info__plus">вакансий</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="about-item" v-if="statsMonth.responses_accepted">
                    <img src="assets/img/dop-page/icon-3.svg" alt="image" class="about-item__img">
                    <div class="about-info">
                      <div class="tarif-off-part">
                        <div class="tarif-off-blue">Ваши отклики приняло:</div>
                        <div class="about-info__title">
                          {{ statsMonth.responses_accepted }}
                          <span class="about-info__plus">компаний</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="about-item" v-if="statsMonth.viewed">
                    <img src="assets/img/dop-page/icon-4.svg" alt="image" class="about-item__img">
                    <div class="about-info">
                      <div class="tarif-off-part">
                        <div class="tarif-off-blue">Ваше резюме просмотрели:</div>
                        <div class="about-info__title">
                          {{ statsMonth.viewed }}
                          <span class="about-info__plus">раз</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="!hasAnyMonth" style="padding: 10px;">
                    Нет данных
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </NuxtLayout>
  </ClientOnly>
</template>

<script>
import api from "@/api/api";

export default {
  setup() {},

  data() {
    return {
      at: true,
      lm: false,

      // response from backend
      stats: {
        global: {
          offers: 0,
          offers_accepted: 0,
          responses: 0,
          responses_accepted: 0,
          viewed: 0,
        },
        last_month: {
          offers: 0,
          offers_accepted: 0,
          responses: 0,
          responses_accepted: 0,
          viewed: 0,
        },
      },
    };
  },

  computed: {
    statsAll() {
      return this.stats?.global || {
        offers: 0,
        offers_accepted: 0,
        responses: 0,
        responses_accepted: 0,
        viewed: 0,
      };
    },
    statsMonth() {
      return this.stats?.last_month || {
        offers: 0,
        offers_accepted: 0,
        responses: 0,
        responses_accepted: 0,
        viewed: 0,
      };
    },

    hasAnyAll() {
      const s = this.statsAll;
      return !!(s.offers || s.offers_accepted || s.responses || s.responses_accepted || s.viewed);
    },
    hasAnyMonth() {
      const s = this.statsMonth;
      return !!(s.offers || s.offers_accepted || s.responses || s.responses_accepted || s.viewed);
    },
  },

  methods: {
    getSailorId() {
    const sailorId = JSON.parse(localStorage.getItem("global/user") || '{}')?.userProfileId?.resumeID;
    return sailorId
    },

    async fetchStats() {
      try {
        const sailorId = this.getSailorId();
        if (!sailorId) {
          console.error("❌ sailor_id not found (localStorage/global/user)");
          return;
        }

        const res = await api.get(`/sailor/statistics/${sailorId}`);
        this.stats = res?.data || this.stats;
      } catch (e) {
        console.error(
          "❌ fetch sailor stats error:",
          e?.response?.data?.detail || e?.response?.data?.message || e?.message || e
        );
      }
    },
  },

  mounted() {
    this.fetchStats();
  },
};

definePageMeta({
  middleware: ["sailor"],
});
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
  min-height: 100vh;
}
.tarif-list a.tactive {
  border-bottom: 4px solid #3b45a9;
  color: #3b45a9;
}
.tarif-tab {
  display: flex;
}
</style>
