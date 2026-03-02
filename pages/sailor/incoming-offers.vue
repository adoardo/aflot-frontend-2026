<template>
  <ClientOnly>
    <NuxtLayout name="custom" class="main cabinet">
      <div>
      </div>

      <section id="responses">
        <div class="container">
          <div class="vacancy-start-title">
            <a class="vacancy-link-off">
              <span>←</span> входящие предложения по вакансиям:
            </a>
          </div>

          <div class="vacancy-list" v-if="vacancies.length">
            <div
              v-for="(item, i) in vacancies"
              :key="'vacancies-item-' + i"
              class="vacancy vacancy-item-off"
            >
              <div class="vacancy__label-top">
                <div class="vacancy__label">
                  <text>{{ item.position }}</text>
                  <img src="assets/img/responses/fav.png" alt="" />
                </div>
                <div style="display: none" class="vacancy__logo">
                  <img src="assets/img/flot/logo-cart.png" alt="logo" />
                </div>
              </div>

              <div class="vacancy__meta">
                <div
                  v-if="item.company_id"
                  class="vacancy__company"
                  style="cursor: pointer;"
                >
                  <img src="assets/img/responses/company.png" alt="" />
                  <a
                    :href="'/company/vacancies/' + item.company_id"
                    target="_blank"
                  >
                    {{ item.company_name }}
                  </a>
                </div>

                <div
                  v-if="item.vessel_data"
                  class="vacancy__ship"
                  style="cursor: pointer;"
                >
                  <img src="assets/img/responses/ship.png" alt="" />
                  <a
                    :href="'/navy/vacancies/' + item.vessel"
                    target="_blank"
                  >
                    {{ item.vessel_data.vessel_name }}
                  </a>
                </div>
              </div>

              <div class="vacancy__info">
                <div class="vi-item">
                  <div class="vi-label">Зарплата:</div>
                  <strong v-if="item.salary_from && item.salary_to">
                    {{ item.salary_from }} - {{ item.salary_to }} ₽
                  </strong>
                  <strong v-else-if="item.salary_from">
                    от {{ item.salary_from }} ₽
                  </strong>
                  <strong v-else-if="item.salary_to">
                    до {{ item.salary_to }} ₽
                  </strong>
                  <strong v-else>не указана</strong>
                </div>

                <div class="vi-item">
                  <div class="vi-label">Дата посадки:</div>
                  {{ item.departureDateDisplay }}
                </div>

                <div class="vi-item">
                  <div class="vi-label">Длит-ть контракта:</div>
                  {{ item.contract_duration }}
                </div>
              </div>

              <div class="vacancy__buttons">
                <div class="vacancy__button" @click="goVacancyInfo(item.id)">
                  <img src="assets/img/dop-page/blue-info.svg" alt="image" />
                  Подробнее
                </div>
                <div class="vacancy__button red" @click="acceptVacancyOffer(item.mailing_id , item.id,item.company_id , item.position)">
                  <img src="assets/img/dop-page/red-check.svg" alt="" />
                  Принять
                </div>
                <div class="vacancy__button" @click="cancelVacancyOffer(item.mailing_id , item.id , item.company_id  , item.position),item.company_id">
                  <img src="assets/img/responses/cancel.png" alt="" />
                  Отклонить
                </div>
              </div>

              <div class="vacancy__date">{{ item.vacancyDate }}</div>
            </div>
          </div>

          <div v-else class="no-results">
            <span>Входящих предложений не найдено</span>
            <img src="assets/img/ship-drawing.svg" alt="image" class="dock-img" />
          </div>
        </div>
      </section>

    </NuxtLayout>
  </ClientOnly>
</template>
<script setup>
import { ref } from "vue";
import api from "~/api/api.js";

definePageMeta({
  middleware: ["sailor"],
});

const vacancies = ref([]);
const fetchedData = ref({});

import { useModalStore } from "~/store/modal";
const { openModal, closeModal } = useModalStore();

// === Fetch vacancies ===
const fetchVacancies = async () => {
  try {
    const mon = [
      "января", "февраля", "марта", "апреля", "мая", "июня",
      "июля", "августа", "сентября", "октября", "ноября", "декабря",
    ];

    const { data } = await api.get("/all-vacancies-offers");
    console.log("Fetched vacancies data:", data);

    if (!data.vacancies || !Array.isArray(data.vacancies)) {
      vacancies.value = [];
      return;
    }

    fetchedData.value = data;
    vacancies.value = data.vacancies.map((v, i) => {
      const company = data.companies?.[i] || {};
      const vessel = data.vessels?.find((x) => x.id === v.vessel);

      const tmpFrom = v.date_of_departure_from?.split("-") || [];
      const tmpTo = v.date_of_departure_to?.split("-") || [];

      const fromDate = tmpFrom.length
        ? `с ${tmpFrom[2]}.${tmpFrom[1]}.${tmpFrom[0]}`
        : "";
      const toDate = tmpTo.length
        ? ` по ${tmpTo[2]}.${tmpTo[1]}.${tmpTo[0]}`
        : "";

      const created = v.created_at?.split("T")[0]?.split("-") || [];
      const vacancyDate =
        created.length === 3
          ? `${parseInt(created[2])} ${
              mon[parseInt(created[1]) - 1].toUpperCase()
            } ${created[0]}`
          : "";

      return {
        ...v,
        company_id: company.id,
        company_name: company.company_name,
        company_email: company.email, // <-- we’ll use this for Telegram message
        vessel_data: vessel,
        departureDateDisplay: fromDate + toDate,
        vacancyDate,
      };
    });
  } catch (err) {
    console.error("Error fetching vacancies:", err);
  }
};

fetchVacancies();

// === Navigation ===
const goVacancyInfo = async (vacancyId) => {
  window.location.href = '/vacancy/' + vacancyId;
};

// === Separate function for sending Telegram messages (to company) ===
const sendTelegramMessage = async (companyEmail, companyName, vacancyId, position, responseType) => {
  try {
    const userData = JSON.parse(localStorage.getItem("global/user") || '{}');
    const sailorName = userData?.user?.info?.first_name || "Моряк";
    const messageType = responseType === "accepted" ? "offer_accept" : "offer_reject";

    await api.post("/telegram_message", {
      email: companyEmail, // ✅ send to COMPANY
      type: messageType,
      vacancy_name: position,
      company_name: companyName,
      vacancy_id: vacancyId,
      fio: sailorName,
    });

    console.log(`📨 Telegram message sent to company (${messageType})`);
  } catch (err) {
    console.error("❌ Error sending Telegram message:", err);
  }
};

// === Send response logic ===
const sendResponse = async (mailing_id, vacancyId, company_id, position, responseType) => {
  openModal('loader')
  try {
    const userData = JSON.parse(localStorage.getItem("global/user") || '{}');
    const sailorResumeId = userData?.userProfileId?.resumeID;
    const sailorUserId = userData?.userProfileId?.id;

    const payload = {
      mailing_id,
      sailor_id: sailorResumeId,
      vacancy_id: vacancyId,
      response: responseType,
    };

    // Find company data from current vacancy list
    const company = vacancies.value.find(v => v.company_id === company_id);
    const companyEmail = company?.email;
    const companyName = company?.company_name;

    // 1️⃣ Send response update to backend
    await api.post("/mailing/response", payload);
    await api.post(`/vacancy-offer/${vacancyId}/add/${sailorResumeId}`);

    // 2️⃣ Delete previous notification
    await api.delete(`/notifications/${sailorUserId}`, {
      params: {
        sender_id: company_id,
        resume_id: company_id,
        vacancy_id: vacancyId,
        type: "offer",
      },
    });

    // 3️⃣ Send Telegram message (separate function, to company)
    if (companyEmail) {
      await sendTelegramMessage(companyEmail, companyName, vacancyId, position, responseType);
    } else {
      console.warn("⚠️ No company email found for Telegram message");
    }

    // 4️⃣ Send WebSocket live push to company
    if (WebSocketService.instance) {
      const messageType = responseType === "accepted" ? "offer_accept" : "offer_cancel";
      WebSocketService.instance.sendMessage({
        type: "notify",
        receiver_id: company_id,
        receiver_role: "Компания",
        message: {
          sender_id: sailorUserId,
          role: "Моряк",
          name: userData?.user?.info?.first_name,
          resume_id: sailorResumeId,
          vacancy_id: vacancyId,
          vacancy_name: position,
          type: messageType,
        },
      });
    }

    console.log(`✅ Offer ${responseType}`);
    window.location.href = "/sailor/incoming-offers";
  } catch (err) {
    console.error("❌ Error sending response:", err);
  }

};

// === Accept / Reject buttons ===
const acceptVacancyOffer = async (mailing_id, vacancyId, company_id, position) => {
  console.log(1)
  await sendResponse(mailing_id, vacancyId, company_id, position, "accepted");
  console.log(2)
  window.location.href = '/vacancy/' + vacancyId;
};

const cancelVacancyOffer = async (mailing_id, vacancyId, company_id, position) => {
  await sendResponse(mailing_id, vacancyId, company_id, position, "rejected");
};
</script>



<style lang="scss" scoped>
.vacancy-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

</style>
