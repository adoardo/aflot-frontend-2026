<template>
  <div ref="dropdownRef">
  <p v-if="data.length === 0" class="text-gray-500 text-center">
    <div
      class="header-close menu-close-gray close-reg-about"
    >
    <div class="header-close menu-close-gray close-reg-about">
        <button
          type="button"
          class="header-close__text notif_close"
          id="close-reg-sailor"
          @click.stop.prevent="emit('close')"
        >
          <span class="header-close__icon"></span>
        </button>
      </div>
    </div>
    Нет новых уведомлений
  </p>
  <ul v-else>
    <li
      v-for="(guest, index) in data"
      :key="index"
      class="p-2 hover:bg-gray-100"
      style="width: 100%; cursor: pointer; display: flex; justify-content: space-between;"
    >

      <!-- 🔹 VISIT -->
      <template v-if="guest.type === 'visit'">
        <a style="width: calc(100% - 25px);" v-if="guest.role === 'Моряк'"
           :href="'/sailor/' + guest.resume_id">
          Моряк <strong class="notif-name">"{{ guest.name }}"</strong> просмотрел Вашу вакансию
        </a>
        <a style="width: calc(100% - 25px);" v-else
           :href="'/company/vacancies/' + guest.resume_id">
          Компания <strong class="notif-name">"{{ guest.name }}"</strong> просмотрела Ваше резюме
        </a>
        <span class="notif-close" @click="(e) => deleteNotification(e, guest)">x</span>
      </template>

      <!-- 🔹 RESPOND (Sailor → Company) -->
      <template v-if="guest.type === 'respond'">
        <a style="width: calc(100% - 25px);" :href="'/company/incoming-responses'">
          Моряк <strong class="notif-name">"{{ guest.name }}"</strong>
          откликнулся на вакансию
          <strong class="notif-name">"{{ guest.vacancy_name }}"</strong>
        </a>
        <span class="notif-close" @click="(e) => deleteNotification(e, guest)">x</span>
      </template>

      <!-- 🔹 RESPOND_ACCEPT (Company → Sailor) -->
      <template v-if="guest.type === 'respond_accept'">
        <a style="width: calc(100% - 25px);" :href="'/vacancy/' + guest.vacancy_id">
          Компания <strong class="notif-name">"{{ guest.name }}"</strong>
          приняла Ваш отклик на вакансию
          <strong class="notif-name">"{{ guest.vacancy_name }}"</strong>!
        </a>
        <span class="notif-close" @click="(e) => deleteNotification(e, guest)">x</span>
      </template>

      <!-- 🔹 RESPOND_CANCEL (Company → Sailor) -->
      <template v-if="guest.type === 'respond_reject'">
        <a style="width: calc(100% - 25px);" :href="'/vacancy/' + guest.vacancy_id">
          Компания <strong class="notif-name">"{{ guest.name }}"</strong>
          отклонила Ваш отклик на вакансию
          <strong class="notif-name">"{{ guest.vacancy_name }}"</strong>.
        </a>
        <span class="notif-close" @click="(e) => deleteNotification(e, guest)">x</span>
      </template>

      <!-- 🔹 OFFER (Company → Sailor) -->
      <template v-if="guest.type === 'offer'">
        <a style="width: calc(100% - 25px);" :href="'/sailor/incoming-offers'">
          Компания <strong class="notif-name">"{{ guest.name }}"</strong>
          предлагает Вам вакансию
          <strong class="notif-name">"{{ guest.vacancy_name }}"</strong>
        </a>
        <span class="notif-close" @click="(e) => deleteNotification(e, guest)">x</span>
      </template>

      <!-- 🔹 OFFER_ACCEPT (Sailor → Company) -->
      <template v-if="guest.type === 'offer_accept'">
        <a style="width: calc(100% - 25px);" :href="'/sailor/' + guest.resume_id">
          Моряк <strong class="notif-name">"{{ guest.name }}"</strong>
          принял Ваше предложение по вакансии
          <strong class="notif-name">"{{ guest.vacancy_name }}"</strong>!
        </a>
        <span class="notif-close" @click="(e) => deleteNotification(e, guest)">x</span>
      </template>

      <!-- 🔹 OFFER_CANCEL (Sailor → Company) -->
      <template v-if="guest.type === 'offer_cancel'">
        <a style="width: calc(100% - 25px);" :href="'/sailor/' + guest.resume_id">
          Моряк <strong class="notif-name">"{{ guest.name }}"</strong>
          отклонил Ваше предложение по вакансии
          <strong class="notif-name">"{{ guest.vacancy_name }}"</strong>.
        </a>
        <span class="notif-close" @click="(e) => deleteNotification(e, guest)">x</span>
      </template>

    </li>
  </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import api from "~/api/api.js";
import { useUsersStore } from "~/store/useUserStore.js";
import { useGuestsStore } from "~/store/useGuestsStore";

const userStore = useUsersStore();
const { userInfo, isAuth, userProfileId } = storeToRefs(userStore);

const guests = useGuestsStore();

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(["close"]);

const dropdownRef = ref(null);

const handleClickOutside = (event) => {
  if (!dropdownRef.value) return;
  if (!dropdownRef.value.contains(event.target)) {
    emit("close");
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const deleteNotification = async (e, guest) => {
  e.preventDefault()
  console.log(guest, 'deleteNotification')
  console.log(userInfo.value.info.id)

  let params = '?resume_id=' + guest.resume_id + '&sender_id=' + guest.sender_id + '&role=' + guest.role + '&type=' + guest.type + '&vacancy_id=' + guest.vacancy_id + '&vacancy_name=' + guest.vacancy_name;
  console.log(params)
  console.log("params")

  await api.delete('/notifications/' + userInfo.value.info.id + params, {
    params: {
      user_id: userInfo.value.info.id,
      sender_id: guest.resume_id
    }
  }).then((response) => {
    console.log('deleted: ', response)
    guests.getNotifications()
  })
}
</script>

<style scoped>
ul {
  z-index:1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
ul li {
  border-bottom: 1px solid #d0d0d0;
}
ul li:last-child {
  border: none;
}

.notif-name {
  text-decoration: underline;
  color: #3b45a9;
}
.notif-close {
  cursor: pointer;
  font-weight: bold;
}
</style>