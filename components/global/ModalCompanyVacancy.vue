<template>
  <div
      class="menu-reg menu-none menu-reg-sailor cabinet"
      id="modal-response"
      :class="{ 'menu-show': isOpen }"
  >
    <div class="modal-block">
      <div class="modal-pred__top">
        <h2 class="modal-title">
          Предложить вакансию:
        </h2>
        <!-- /.modal-title -->

        <div class="modal-info__item modal-pred__item">
          <div class="modal-pred__send">Вы еще можете отправить:</div>
          <!-- /.modal-info__gray -->
          <div class="modal-pred__blue">598 предложений</div>
          <!-- /.modal-info__black -->
        </div>
      </div>

      <template v-if="vacs.length">
        <select class="modal-pred__select" v-model="selectedVac">
          <option v-for="(vac, i) in vacs" :value="vac._id">{{vac.position}}</option>
        </select>
      </template>
      <template v-else>
        <text class="modal-pred__novacs">Подходящие вакансии отсутствуют</text>
      </template>
      <div class="modal-pred__buttons">
        <button v-if="vacs.length" @click="sendOffer()" class="modal-button-blue modal-button-red js-modal-close">
          Предложить
        </button>
        <!-- /.modal-button-blue -->

        <button @click="closeModal('companyvac')" class="modal-button-blue js-modal-close">
          Закрыть окно
        </button>
        <!-- /.modal-button-blue -->
      </div>

      <!-- /.modal-button-blue -->

    </div>

  </div>
  <div
      :class="['header-overlay', { 'header-overlay__active': isOpen }]"
      @click="closeModal('companyvac')"
  ></div>
</template>
<script setup>
import { ref, watch } from "vue";
import api from "@/api/api";
import { useModalStoreRefs, useModalStore } from "~/store/modal";
import { useUsersStore } from "~/store/useUserStore";
import watchScrollModal from "~/utils/watchScrollModal";
import { storeToRefs } from "pinia";

const fetchedData = ref({});
const vacs = ref([]);
const selectedVac = ref(false);
const selectedVacName = ref(false);

const { openModal, closeModal } = useModalStore();
const userStore = useUsersStore();
const { userInfo } = storeToRefs(userStore);

const props = defineProps({
  isOpen: Boolean,
  sailorId: String
});

watch(() => props.isOpen, watchScrollModal);

watch(
  () => props.sailorId,
  () => {
    fetchVacs();
  }
);

/* ================================
   LOAD VACANCIES
================================ */
const fetchVacs = async () => {
  try {
    //const companyId = JSON.parse(localStorage.getItem("global/user") || '{}')?.userProfileId?.id;

    //const { data } = await api.get("/all-vacancies-company-available/" + companyId);
    const { data } = await api.get("/all-vacancies-company-available/" + props.sailorId);

    fetchedData.value = data;
    vacs.value = data?.vacancies || [];

    if (vacs.value[0]) {
      selectedVac.value = vacs.value[0]._id;
      selectedVacName.value = vacs.value[0].position;
    } else {
      selectedVac.value = null;
      selectedVacName.value = null;
    }
  } catch (error) {
    console.error("Error fetching vacancies:", error);
  }
};

/* ================================
   HELPERS
================================ */

const sendSingleMailingToSailor = async (sailorId, company_email) => {
  try {
    await api.post("/mailing-sailors", { ids: [sailorId], company_email });
  } catch (err) {
    console.error("❌ Ошибка при создании рассылки (mailing-sailors):", err);
  }
};

const saveSingleMailingHistory = async (company_email, sailorId, vacancy_id) => {
  try {
    await api.post("/mailing-history/create", {
      company_email,
      sailor_ids: [sailorId],
      vacancy_id
    });
  } catch (err) {
    console.error("❌ Ошибка при сохранении истории рассылки:", err);
  }
};

const fetchSailorEmail = async (sailorId) => {
  try {
    const { data } = await api.get(`/sailorinfo/${sailorId}`);
    return data?.email || null;
  } catch (e) {
    console.warn("⚠️ Не удалось получить email моряка:", e);
    return null;
  }
};

/* ================================
   SEND TELEGRAM MESSAGE FOR OFFER
================================ */
const sendTelegramForOffer = async (email, vacancyId, vacancyName) => {
  if (!email) {
    console.warn("⚠️ Email моряка отсутствует, Telegram уведомление не отправлено");
    return;
  }

  try {
    const userData = JSON.parse(localStorage.getItem("global/user") || "{}");

    const company_name =
      userData?.user?.info?.company_name ||
      userData?.userProfileId?.name ||
      "Компания";
console.log('AAA TRY')
    await api.post("/telegram_message", {
      email,
      type: "offer",
      vacancy_id: vacancyId,
      vacancy_name: vacancyName,
      company_name
    });
    console.log('AAA END')

    console.log(`✅ Telegram уведомление успешно отправлено для ${email}`);
  } catch (err) {
    console.error(`❌ Ошибка отправки Telegram уведомления (${email}):`, err);
  }
};

/* ================================
   MAIN FLOW: SEND OFFER
================================ */
const sendOffer = async () => {
  openModal('loader')
  // 1️⃣ Determine selected vacancy name
  for (let i = 0; i < vacs.value.length; i++) {
    if (selectedVac.value === vacs.value[i]._id) {
      selectedVacName.value = vacs.value[i].position;
      break;
    }
  }

  // 2️⃣ Counter endpoint
  await api.post('/send_offers/1');
  if (userStore.user.info.role === "Компания") {
    userStore.getCompanyData();
  }

  // 3️⃣ Create relation
  await api.post(`/vacancy-offer/${selectedVac.value}/add/${props.sailorId}`);

  try {
    const userData = JSON.parse(localStorage.getItem("global/user") || "{}");
    const company_email =
      userData?.decemail ||
      userData?.user?.info?.email ||
      null;
    console.log(1)
    // 4️⃣ Mailing
    if (company_email) {
      await sendSingleMailingToSailor(props.sailorId, company_email);
    }
    console.log(2)
    // 5️⃣ Mailing history
    await saveSingleMailingHistory(company_email, props.sailorId, selectedVac.value);
    console.log(3)
    // 6️⃣ WebSocket notify
    if (WebSocketService.instance) {
      WebSocketService.instance.sendMessage({
        type: "notify",
        receiver_id: props.sailorId,
        receiver_role: "Моряк",
        message: {
          sender_id: userInfo.value.info.id,
          role: userInfo.value.info.role,
          name: userInfo.value.info.first_name,
          resume_id: props.sailorId,
          vacancy_id: selectedVac.value,
          vacancy_name: selectedVacName.value,
          type: "offer"
        }
      });
      console.log(4)
    }
    console.log(5)
    // 7️⃣ Get sailor email
    const sailorEmail = await fetchSailorEmail(props.sailorId);
    console.log(6)
    // 8️⃣ Telegram notify
    if (sailorEmail) {
      await sendTelegramForOffer(
        sailorEmail,
        selectedVac.value,
        selectedVacName.value
      );
    }
    console.log(7)

  } catch (e) {
    console.error("❌ Ошибка при создании рассылки/истории/телеграм:", e);
  }
  console.log(8)
  // 9️⃣ Refresh UI + close modal
  fetchVacs();
  closeModal("companyvac");
  closeModal('loader')
};
</script>



<style scoped>
  .modal-pred__novacs {
    font-size: 18px;
    font-weight: 600;
  }
</style>