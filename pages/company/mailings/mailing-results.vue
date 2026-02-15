<template>
  <ClientOnly>
    <NuxtLayout name="default-hero">
      <div class="section-hero section-hero-mal">
        <AfCustomHeader />
        <div class="hero hero-mal">
          <div class="container">
            <div class="hero-block hero-block-mal">
              <div class="vabout-top-block">
                <a href="#" class="vabout-cursor"> ← </a>
                <div class="vabout-pag">
                  <a href="#" class="vabout-pag-link">
                    Результаты рассылок по вакансии:
                  </a>
                </div>
              </div>

              <h1 class="hero-title">Старший помощник капитана</h1>
              <div class="hero-title-date">от {{ currentDate }}</div>
            </div>
          </div>
        </div>
      </div>

      <section class="section-flot">
        <div class="container">
          <div class="flot">
            <h2 class="search-title">
              Всего рассылок: <span>{{ mailings.length }}</span>
            </h2>

            <div class="mal-table-block" v-if="mailings.length">
              <table class="his-table mal-table">
                <tr class="his-tr">
                  <th class="his-th">№</th>
                  <th class="his-th">Период рассылки</th>
                  <th class="his-th">Принято</th>
                  <th class="his-th">Отправлено</th>
                  <th class="his-th">Отклонило</th>
                  <th class="his-th">Не определились</th>
                  <th class="his-th"></th>
                </tr>

                <tr
                  v-for="(m, i) in mailings"
                  :key="m._id || i"
                  class="his-tr"
                >
                  <td class="his-td">
                    <div class="mal-td-numb">{{ i + 1 }}</div>
                  </td>

                  <td class="his-td">
                    <div class="mal-td-date">{{ formatDate(m.mailing_date) }}</div>
                  </td>

                  <td class="his-td">
                    <div class="mal-td-red">{{ m.accepted }} моряков</div>
                  </td>

                  <td class="his-td">{{ m.sent }} предложений</td>
                  <td class="his-td">{{ m.rejected }} моряков</td>
                  <td class="his-td">{{ m.undecided }} моряков</td>

                  <td class="his-td infoBtn" @click="goMailingInfo(m.id)">
                    <img
                      src="/assets/img/dop-page/red-info.svg"
                      alt="image"
                      class="mal-icon-red"
                    />
                  </td>
                </tr>

                <tr class="his-tr">
                  <td class="his-td">
                    <div class="mal-end">
                      <div class="mal-end-title">Всего рассылок</div>
                      <div class="mal-end-cont">
                        <div class="mal-end-num">{{ mailings.length }}</div>
                        <div class="mal-end-text">рассылки</div>
                      </div>
                    </div>
                  </td>

                  <td class="his-td"></td>

                  <td class="his-td">
                    <div class="mal-end">
                      <div class="mal-end-title">Принято</div>
                      <div class="mal-end-cont">
                        <div class="mal-end-num">{{ acceptedCount }}</div>
                        <div class="mal-end-text">моряков</div>
                      </div>
                    </div>
                  </td>

                  <td class="his-td">
                    <div class="mal-end">
                      <div class="mal-end-title">Отправлено</div>
                      <div class="mal-end-cont">
                        <div class="mal-end-num">{{ sentCount }}</div>
                        <div class="mal-end-text">предложений</div>
                      </div>
                    </div>
                  </td>

                  <td class="his-td">
                    <div class="mal-end">
                      <div class="mal-end-title">Отклонило</div>
                      <div class="mal-end-cont">
                        <div class="mal-end-num">{{ rejectedCount }}</div>
                        <div class="mal-end-text">моряков</div>
                      </div>
                    </div>
                  </td>

                  <td class="his-td">
                    <div class="mal-end mal-end-opacity">
                      <div class="mal-end-title">Не определились</div>
                      <div class="mal-end-cont">
                        <div class="mal-end-num">{{ undecidedCount }}</div>
                        <div class="mal-end-text">моряков</div>
                      </div>
                    </div>
                  </td>

                  <td class="his-td"></td>
                </tr>
              </table>
            </div>

            <div v-else class="mal-empty">
              <p>Нет данных рассылок</p>
            </div>
          </div>
        </div>
      </section>

      <AfCustomFooter />
    </NuxtLayout>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useUsersStore } from "~/store/useUserStore";
import { storeToRefs } from "pinia";
import api from "@/api/api";

definePageMeta({
  middleware: ["company"],
});

const userStore = useUsersStore();
const { userInfo } = storeToRefs(userStore);

const mailings = ref([]);
const sentCount = ref(0);
const acceptedCount = ref(0);
const rejectedCount = ref(0);
const undecidedCount = ref(0);

const currentDate = computed(() =>
  new Date().toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
);

function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

async function fetchMailings() {
  try {
    const user = JSON.parse(localStorage.getItem("global/user") || "{}");
    const { data } = await api.post("/mailing-results", {
      email: user?.decemail,
      resumeId:user?.userProfileId?.resumeID
    });

    mailings.value = Array.isArray(data) ? data : [];

    sentCount.value = mailings.value.reduce((s, m) => s + (m.sent || 0), 0);
    acceptedCount.value = mailings.value.reduce(
      (s, m) => s + (m.accepted || 0),
      0
    );
    rejectedCount.value = mailings.value.reduce(
      (s, m) => s + (m.rejected || 0),
      0
    );
    undecidedCount.value = mailings.value.reduce(
      (s, m) => s + (m.undecided || 0),
      0
    );
  } catch (err) {
    console.error("Ошибка загрузки рассылок:", err);
  }
}

function goMailingInfo(mailing_id) {
  if (!mailing_id) return;
  window.location.href = `/company/mailings/specific-newsletter?m=${mailing_id}`;
}

onMounted(fetchMailings);
</script>

<style lang="scss" scoped>
.mal-empty {
  text-align: center;
  color: #999;
  padding: 40px 0;
  font-size: 1.1rem;
}
.infoBtn{
  cursor:pointer;
}
</style>
