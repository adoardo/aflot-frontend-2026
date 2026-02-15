<template>
  <div class="vacancy">
    <div class="vacancy__label-top">
      <div class="vacancy__label">
        <span class="vacancy-label-name">
          {{ fullName }}
          <br v-if="data?.patronymic" />
          {{ data?.patronymic }}
        </span>

        <template v-if="isCompany">
          <img
            v-if="favorite"
            class="fav_icon removed_fav_icon"
            src="assets/img/mor/icon-1.png"
            alt="fav"
            @click="toggleFavorite(false)"
          />
          <img
            v-else
            class="fav_icon added_fav_icon"
            src="assets/img/mor/icon-2.png"
            alt="fav"
            @click="toggleFavorite(true)"
          />
        </template>
      </div>

      <div v-if="data?.photo_path" class="vacancy__logo">
        <img class="vacancy__logo__img" :src="data.photo_path" alt="logo" />
      </div>

      <div v-else class="vacancy__logo vacancy__logo_empty">
        <div class="ed-lk-fn-ln">{{ initials }}</div>
        <img src="assets/img/header/logo-white.png" alt="logo" />
        <span>⚓</span>
      </div>
    </div>

    <div class="vacancy__meta">
      <div class="vacancy__info">
        <div class="vi-item">
          <div class="vi-label">Минимальная зарплата:</div>
          <strong>{{ data?.salary }}</strong>
        </div>

        <div class="vi-item">
          <div class="vi-label">Местонахождение:</div>

          <template v-if="!data?.region && !data?.country">не указано</template>
          <template v-else-if="data?.region && data?.country">{{ data.country }} , {{ data.region }}, {{data?.city}}</template>
          <template v-else-if="!data?.region && data?.country">{{ data.country }}</template>
          <template v-else-if="data?.region && !data?.country">{{ data.region }}</template>
        </div>

        <Worked :data="data" />
      </div>
    </div>

    <div class="vacancy__buttons">
      <div class="vacancy__button blue" @click="goResumeInfo()">
        <img src="assets/img/dop-page/blue-info.svg" alt="" />
        Подробнее о моряке
      </div>

      <div
        v-if="isAuth && isCompany"
        class="vacancy__button red"
        @click="openOfferModal('companyvac', resumeId)"
      >
        <img src="assets/img/responses/more.png" alt="" />
        Предложить вакансию
      </div>
    </div>

    <div
      class="vacancy__date"
      :class="{
        'card-red': data?.tarif === 'Ищу работу',
        'card-blue': data?.tarif === 'Рассмотрю предложение',
        'card-grey': data?.tarif === 'Трудоустроен',
      }"
    >
      {{ data?.tarif }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import api from "@/api/api";
import Worked from "~/components/list/helpers/Worked.vue";
import { useModalStore } from "@/store/modal";
import { useUsersStore } from "~/store/useUserStore";

type AnyObj = Record<string, any>;

const props = defineProps<{
  data: AnyObj;
  company?: AnyObj;
}>();

const userStore = useUsersStore();
const { userInfo, isAuth } = storeToRefs(userStore);

const { openModalAfNotifications, openOfferModal, closeModal } = useModalStore();

const resumeId = computed(() => String(props.data?._id ?? props.data?.id ?? ""));

const isCompany = computed(() => userInfo.value?.info?.role === "Компания");

const fullName = computed(() => {
  const fn = (props.data?.first_name ?? "").trim();
  const ln = (props.data?.last_name ?? "").trim();
  return `${fn} ${ln}`.trim();
});

const initials = computed(() => {
  const ln = String(props.data?.last_name ?? "").trim();
  const fn = String(props.data?.first_name ?? "").trim();
  const a = ln ? ln.substring(0, 1).toUpperCase() : "";
  const b = fn ? fn.substring(0, 1).toUpperCase() : "";
  return `${a} ${b}`.trim();
});

const favorite = ref(false);

const syncFavoriteFromCompany = () => {
  const arr = (props.company?.favorites_resume ?? []) as any[];
  const ids = arr.map((x) => String(x));
  favorite.value = ids.includes(resumeId.value);
};

const addToFavorite = async () => {
  try {
    await api.post(`/resumes/favorite/add/${resumeId.value}`);
    favorite.value = true;
    openModalAfNotifications("Моряк добавлен в избранное", "");
    setTimeout(() => closeModal("afnotifications"), 4000);
  } catch (e) {
    setTimeout(() => closeModal("afnotifications"), 4000);
  }
};

const removeFromFavorite = async () => {
  try {
    await api.post(`/resumes/favorite/remove/${resumeId.value}`);
    favorite.value = false;
    openModalAfNotifications("Моряк удалён из избранного", "");
    setTimeout(() => closeModal("afnotifications"), 4000);
  } catch (e) {
    setTimeout(() => closeModal("afnotifications"), 4000);
  }
};

const toggleFavorite = async (next: boolean) => {
  if (!isAuth.value || !isCompany.value) return;
  if (next) return addToFavorite();
  return removeFromFavorite();
};

const goResumeInfo = () => {
  window.location.href = "/sailor/" + resumeId.value;
};

onMounted(() => {
  syncFavoriteFromCompany();
});
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

.vacancy__logo_empty span {
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

.fav_icon {
  transform: scale(0.6);
  cursor: pointer;
  transition: 0.25s ease;
}

.removed_fav_icon {
  transform: translateX(-5px) scale(0.6);
}

.card-red {
  background-color: #9b2719;
  color: #fff;
  padding: 5px 10px;
  font-size: 12px;
  font-family: "Myriad Pro Semibold", sans-serif;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  z-index: 2;
  text-align: center;
  margin-bottom: 20px;
}

.card-blue {
  text-wrap: nowrap;
  background-color: #3b45a9;
  color: #fff;
  padding: 5px 10px;
  font-family: "Myriad Pro Semibold", sans-serif;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  z-index: 2;
  font-size: 12px;
  text-align: center;
  margin-bottom: 20px;
}

.card-grey {
  background-color: #6c757d;
  color: #fff;
  padding: 5px 10px;
  font-size: 12px;
  font-family: "Myriad Pro Semibold", sans-serif;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  z-index: 2;
  text-align: center;
  margin-bottom: 20px;
}
</style>
