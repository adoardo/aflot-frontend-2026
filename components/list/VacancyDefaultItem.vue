<template>
  <div class="vacancy">
    <div class="vacancy__label-top">
      <div class="vacancy__label">
        <text>{{ data.position }}</text>

        <img
          v-if="!isFavorite"
          class="fav_icon added_fav_icon"
          src="assets/img/mor/icon-2.png"
          alt="add to favorite"
          @click="toggleFavoriteVacancy()"
        />

        <img
          v-else
          class="fav_icon removed_fav_icon"
          src="assets/img/mor/icon-1.png"
          alt="remove from favorite"
          @click="toggleFavoriteVacancy()"
        />
      </div>

      <div v-if="data.photo_path" class="vacancy__logo">
        <img :src="data.photo_path" alt="logo" />
      </div>
      <div v-else class="vacancy__logo vacancy__logo_empty no-fio">
        <div class="ed-lk-fn-ln"></div>
        <text>⚓</text>
      </div>
    </div>

    <div class="vacancy__meta">
      <div v-if="data.company_id" class="vak-dop-link">
        <img src="assets/img/responses/company.png" alt=""/>
        <a class="vak-dop-link" :href="'/company/vacancies/'+data.company_id" target="_blank">
          <span>{{ data.company_name }}</span>
        </a>
      </div>
      <div v-if="data.vessel" class="vak-dop-link">
        <img src="assets/img/responses/ship.png" alt=""/>
        <a class="vak-dop-link" :href="'/navy/vacancies/'+data.vessel" target="_blank">
          <span>{{ data.vessel_data.vessel_name }}</span>
        </a>
      </div>
    </div>

    <div class="vacancy__info">
      <div class="vi-item">
        <div class="vi-label">Зарплата:</div>
        <strong v-if="data.salary_from && data.salary_to">
          {{ data.salary_from }} - {{ data.salary_to }} ₽
        </strong>
        <strong v-else-if="data.salary_from">от {{ data.salary_from }} ₽</strong>
        <strong v-else-if="data.salary_to">до {{ data.salary_to }} ₽</strong>
        <strong v-else>не указана</strong>
      </div>

      <div class="vi-item">
        <div class="vi-label">Дата посадки:</div>
        {{ data.departureDateDisplay }}
      </div>

      <div class="vi-item">
        <div class="vi-label">Длит-ть контракта:</div>
        {{ data.contract_duration }}
      </div>
    </div>

    <div class="vacancy__buttons">
      <div class="vacancy__button blue" @click="goVacancyInfo()">
        <img src="assets/img/dop-page/blue-info.svg" alt="" />Подробнее
      </div>

      <div
        v-if="isAuth && !hasResponded && userInfo?.info?.role === 'Моряк'"
        class="vacancy__button red"
        @click="sendResponse()"
      >
        <img src="assets/img/search/link.png" alt="" />Отправить отклик
      </div>

      <div
        v-else-if="isAuth && hasResponded && userInfo?.info?.role === 'Моряк'"
        class="vacancy__button vacancy_disabled_button"
      >
        <img src="assets/img/mor/icon-3.png" alt="icon" />Отклик отправлен
      </div>

      <div v-else-if="!isAuth" class="vacancy__button red" @click="toggleModal('lk')">
        <img src="assets/img/search/link.png" alt="" />Авторизуйтесь
      </div>
    </div>

    <div class="vacancy__date">{{ afDate }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import api from "@/api/api";
import convertAFDate from "@/utils/convertAFDate.js";
import { useUsersStore } from "~/store/useUserStore";
import { useModalStore } from "~/store/modal";

const props = defineProps({
  data: { type: Object, required: true },
});

const emit = defineEmits(["respond-sent"]);

const userStore = useUsersStore();
const { userInfo, isAuth, userProfileId } = storeToRefs(userStore);

const modalStore = useModalStore();
const { openModalAfNotifications, toggleModal, closeModal } = modalStore;

const afDate = ref(convertAFDate(props.data.created_at, true));
const isFavorite = ref(false);
const justResponded = ref(false);

const getVacancyId = () => String(props.data?._id || props.data?.id || "");

const getResumeId = () => {
  const fromStore = userProfileId.value?.resumeID;
  if (fromStore) return String(fromStore);

  try {
    const dataLocal = JSON.parse(localStorage.getItem("global/user") || "{}");
    const fromLS = dataLocal?.userProfileId?.resumeID;
    return fromLS ? String(fromLS) : "";
  } catch {
    return "";
  }
};

const hasResponded = computed(() => {
  if (justResponded.value) return true;
  const resumeId = getResumeId();
  const responses = props.data?.responses?.map(String) || [];
  return resumeId ? responses.includes(resumeId) : false;
});

const checkFavoriteStatus = async () => {
  const role = userInfo.value?.info?.role;
  if (!isAuth.value || role !== "Моряк") return;

  try {
    const resp = await api.get("/resume-full");
    const favorites = (resp.data?.favorite_vacancies ?? []).map(String);
    isFavorite.value = favorites.includes(getVacancyId());
  } catch (e) {}
};

const addFavoriteVacancy = async () => {
  const vid = getVacancyId();
  openModalAfNotifications("Вакансия добавлена в избранное", "");

  try {
    await api.post(`/all-vacancies-favorite/vacancy/${vid}`);
    isFavorite.value = true;
  } catch (e) {
  } finally {
    setTimeout(() => closeModal("afnotifications"), 4000);
  }
};

const cancelFavoriteVacancy = async () => {
  const vid = getVacancyId();
  openModalAfNotifications("Вакансия удалена из избранного", "");

  try {
    await api.post(`/all-vacancies-favorite/vacancy-cancel/${vid}`);
    isFavorite.value = false;
  } catch (e) {
  } finally {
    setTimeout(() => closeModal("afnotifications"), 4000);
  }
};

const toggleFavoriteVacancy = async () => {
  if (!isAuth.value) return toggleModal("lk");
  if (isFavorite.value) return cancelFavoriteVacancy();
  return addFavoriteVacancy();
};

const sendResponse = async () => {
  if (!isAuth.value) return toggleModal("lk");

  const vacancyId = getVacancyId();
  const position = props.data.position;
  const resumeId = getResumeId();

  openModalAfNotifications("Вы оставили отклик на вакансию:", position);

  try {
    await api.post(`/all-vacancies/${vacancyId}/respond`);
    justResponded.value = true;

    if (props.data.email) {
      await api.post("/telegram_message", {
        email: props.data.email,
        type: "respond",
        vacancy_name: position,
        company_name: props.data.company_name,
        vacancy_id: vacancyId,
        fio: `${userInfo.value?.info?.last_name || ""} ${userInfo.value?.info?.first_name || ""}`.trim(),
        resumeId,
      });
    }

    const WS = (globalThis && globalThis.WebSocketService) ? globalThis.WebSocketService : undefined;
    WS?.instance?.sendMessage?.({
      type: "notify",
      receiver_id: props.data.company_id,
      receiver_role: "Компания",
      message: {
        sender_id: userInfo.value?.info?.id,
        resume_id: resumeId,
        vacancy_id: vacancyId,
        vacancy_name: position,
        type: "respond",
      },
    });

    emit("respond-sent");
    setTimeout(() => closeModal("afnotifications"), 5000);
  } catch (e) {
    closeModal("afnotifications");
    openModalAfNotifications("Ошибка при отправке отклика", "");
    setTimeout(() => closeModal("afnotifications"), 4000);
  }
};

const goVacancyInfo = () => {
  window.location.href = "/vacancy/" + getVacancyId();
};

onMounted(() => {
  checkFavoriteStatus();
});
</script>

<style lang="scss" scoped>
.vacancy__button.vacancy_disabled_button {
  cursor: default;
  color: #3fb05d;

  img {
    width: 24px;
  }
}

.vacancy__label {
  min-height: 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.fav_icon {
  transform: scale(0.6);
  cursor: pointer;
  transition: 0.25s ease;
}

.removed_fav_icon {
  transform: translateX(-5px) scale(0.6);
}

.vak-dop-link:hover span {
  border-bottom: 1px solid #fff;
}

.vacancy__label {
  height: 107px;
  flex-wrap: nowrap;
}

.vak-dop-link:hover span {
  border-bottom: 1px solid #fff;
}
.vacancy__logo_empty.no-fio {
  position: relative;
  opacity: .8;
}
.vacancy__logo_empty.no-fio .ed-lk-fn-ln {
  width: 63px;
  height: 63px;
  background: transparent;
  border:1px solid #3b45a9;
}
.vacancy__logo_empty.no-fio text {
  bottom: 18px;
  left: calc(50% - 13px);
  font-size: 20px;
}
</style>
