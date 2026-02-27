<template>
  <div class="vacancy vacancy-item-off">
    <div class="vacancy-top-off">
      <div v-if="data.photo_path" class="vacancy__logo">
        <img :src="data.photo_path" alt="logo" />
      </div>
      <div v-else class="vacancy__logo vacancy__logo_empty">
        <div class="ed-lk-fn-ln">
          {{ data.last_name.substring(0, 1).toUpperCase() }}
          {{ data.first_name.substring(0, 1).toUpperCase() }}
        </div>
        <img src="assets/img/header/logo-white.png" alt="logo" />
        <text>⚓</text>
      </div>

      <div class="vacancy-content-off">
        <div class="vacancy__label">
          {{ data.first_name }} {{ data.last_name }}
          <br v-if="data.patronymic" />
          {{ data.patronymic }}
          <img src="assets/img/dop-page/icon-red.svg" alt="image" />
        </div>
        <div class="vacancy__meta">
          <div class="vacancy__info">
            <div class="vi-item">
              <div class="vacancy-subwork-off">{{ convertPositions(data.positions) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="vacancy__meta">
      <div class="vacancy__info">
        <div class="vi-item">
          <div class="vi-label">Минимальная зарплата:</div>
          <strong v-if="data.salary">{{ data.salary }} ₽</strong>
          <strong v-else>не указана</strong>
        </div>
        <div class="vi-item">
          <div class="vi-label">Местонахождение:</div>
          {{ convertLocation(data) }}
        </div>
        <Worked :data="data" />
      </div>
    </div>

    <div class="vacancy__buttons">
      <a :href="'/sailor/' + data._id" target="_blank" class="vacancy__button">
        <img src="assets/img/dop-page/blue-info.svg" alt="image" />
        Подробнее
      </a>
      <div @click="sendResponse(vacancy, data._id, vacancyname)" class="vacancy__button red">
        <img src="assets/img/dop-page/red-check.svg" alt="" />
        Принять
      </div>
      <div @click="cancelResponse(vacancy, data._id, vacancyname)" class="vacancy__button">
        <img src="assets/img/responses/cancel.png" alt="" />
        Отклонить
      </div>
    </div>

    <div class="vacancy__date new vacancy-dateoff vacancy__date-blue">
      <div class="vacancy-dateoff-text">Рассмотрю предложение</div>
      <div class="vacancy-off-date">{{ afDate }}</div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import api from "@/api/api";
import convertAFDate from "../../utils/convertAFDate.js";
import convertLocation from "../../utils/convertLocation.js";
import convertPositions from "../../utils/convertPositions.js";
import Worked from "~/components/list/helpers/Worked.vue";
import { useUsersStore } from "~/store/useUserStore";
import { storeToRefs } from "pinia";

// --- PROPS ---
const props = defineProps({
  data: Object,
  vacancy: String,
  vacancyname: String,
});

// --- STORES ---
const userStore = useUsersStore();
const { userInfo } = storeToRefs(userStore);
const ResumeId = JSON.parse(localStorage.getItem("global/user") || "{}")?.userProfileId?.resumeID;
const afDate = ref(convertAFDate(props.data.created_at, true));
const emit = defineEmits(["refresh"]);

import {useModalStore} from "~/store/modal";
const {openModal, closeModal} = useModalStore();

// --- DELETE NOTIFICATION ---
const deleteNotification = async (sailorResumeId, vacancyId) => {
  const companyId = userInfo.value.info.id; // 🏢 company's user_id (notification owner)
  try {
    await api.delete(`/notifications/${companyId}`, {
      params: {
        sender_id: sailorResumeId,
        resume_id: sailorResumeId,
        vacancy_id: vacancyId,
        type: "respond",
      },
    });
    console.log("✅ Notification deleted successfully");
  } catch (err) {
    console.error("❌ Failed to delete notification:", err);
  }
};

const sendTelegramMessage = async (email, type, vacancyName, companyName) => {
  try {
    await api.post("/telegram_message", {
      email: email,
      type: type,
      vacancy_name: vacancyName,
      company_name: companyName,
    });
    console.log(`📨 Telegram message sent [${type}]`);
  } catch (err) {
    console.error(`❌ Telegram message error [${type}]:`, err);
  }
};

const sendResponse = async (vacancyId, sailorId, vacancyname) => {
  openModal('loader')
  try {
    await api.post(`/company-vacancy-incoming-response/${vacancyId}/accept/${sailorId}`);
    const UserData =JSON.parse(localStorage.getItem("global/user") || '{}')?.userdata
    await deleteNotification(props.data._id, vacancyId);

    await sendTelegramMessage(
      props.data.email,
      "respond_accept",
      vacancyname,
      UserData.company_name
    );

    if (WebSocketService.instance) {
      WebSocketService.instance.sendMessage({
        type: "notify",
        receiver_id: sailorId,
        receiver_role: "Моряк",
        message: {
          sender_id: userInfo.value.info.id,
          role: userInfo.value.info.role,
          name: userInfo.value.info.first_name,
          resume_id: props.data._id,
          vacancy_id: vacancyId,
          vacancy_name: vacancyname,
          type: "respond_accept",
        },
      });
    }
    emit("refresh");
    window.location.href = "/accepted-sailors";
  } catch (e) {
    console.log("❌ Accept error:", e);
  }
  closeModal('loader')
};

const cancelResponse = async (vacancyId, sailorId, vacancyname) => {
  openModal('loader')
  try {
    await api.post(`/company-vacancy-incoming-response/${vacancyId}/cancel/${sailorId}`);
    const UserData =JSON.parse(localStorage.getItem("global/user") || '{}')?.userdata
    await deleteNotification(props.data._id, vacancyId);

    await sendTelegramMessage(
      props.data.email,
      "respond_reject",
      vacancyname,
      UserData.company_name
    );

    if (WebSocketService.instance) {
      WebSocketService.instance.sendMessage({
        type: "notify",
        receiver_id: sailorId,
        receiver_role: "Моряк",
        message: {
          sender_id: userInfo.value.info.id,
          role: userInfo.value.info.role,
          name: userInfo.value.info.first_name,
          resume_id: props.data._id,
          vacancy_id: vacancyId,
          vacancy_name: vacancyname,
          type: "respond_reject",
        },
      });
    }

    emit("refresh");
    //window.location.href = "/";
  } catch (e) {
    console.log("❌ Cancel error:", e);
  }
  closeModal('loader')
};
</script>


<style lang="scss" scoped>
.vacancy__logo_empty {
  position: relative;
}

.vacancy__logo_empty .ed-lk-fn-ln {
  width: 107px;
  height: 107px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  background-color: #3b45a9;
  font-size: 26px;
}

.vacancy__logo_empty text {
  position: absolute;
  bottom: 5px;
  left: calc(50% - 14px);
  font-size: 20px;
  filter: grayscale(1) brightness(2);
  opacity: 0.6;
}

.vacancy__logo_empty img {
  position: absolute;
  top: 14px;
  display: flex;
  width: auto;
  left: calc(50% - 32px);
  height: 12px;
  opacity: 0.8;
}
</style>
