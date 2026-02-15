<template>
  <div
    class="menu-reg menu-none menu-reg-sailor cabinet"
    id="modal-response"
    :class="{ 'menu-show': isOpen }"
  >
        <img
          @click="closeModal('confirmemail')"
          class="js-modal-close modal-close"
          src="assets/img/modal/close.png"
          alt="Закрыть"
        />
    <div class="modal-block">
      <h2 class="modal-title">
        На указанный email<br />
        отправлено письмо с подтверждением.
      </h2>

      <!-- контейнер -->
      <div class="approveSixElements" @click="focusHiddenInput">
        <div
          v-for="(digit, index) in code"
          :key="index"
          class="approveSixElements__element"
          :class="{
            active: digit !== '',
            correct: verificationStatus === 'correct',
            wrong: verificationStatus === 'wrong'
          }"
        >
          {{ digit }}
        </div>
        <input
          ref="hiddenInput"
          type="text"
          v-model="codeString"
          class="Approveemail__input"
          maxlength="6"
          @input="handleInput"
        />
      </div>
    </div>
  </div>

  <div
    :class="['header-overlay', { 'header-overlay__active': isOpen }]"
    @click="handerModalCloseing"
  ></div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useModalStore } from "~/store/modal";
import watchScrollModal from "~/utils/watchScrollModal";
import api from "@/api/api";
import { useUsersStore } from "~/store/useUserStore";

const userStore = useUsersStore();
const { userInfo } = storeToRefs(userStore);
const { closeModal } = useModalStore();
const props = defineProps({ isOpen: Boolean });
const codeString = ref("");
const verificationStatus = ref("");
const hiddenInput = ref(null);

const handerModalCloseing = () => {
  codeString.value = "";
  verificationStatus.value = "";
  closeModal("confirmemail");
};

const focusHiddenInput = () => hiddenInput.value?.focus();

const handleInput = async () => {
  codeString.value = codeString.value.replace(/\D/g, "").slice(0, 6);
  verificationStatus.value = "";
  if (codeString.value.length === 6) await handleVerify();
};

const code = computed(() => {
  const arr = codeString.value.split("");
  while (arr.length < 6) arr.push("");
  return arr;
});

const handleVerify = async () => {
  try {
    await api.post("/verify_code", {
      code: codeString.value,
      action: "confirm_email"
    });
    verificationStatus.value = "correct";
    const response2 = await api.post('/telegram_message',{
      email:JSON.parse(localStorage.getItem("global/user") || '{}')?.decemail,
      type:"confirm_connection_email"
    })
    setTimeout(() => {
      codeString.value = "";
      closeModal("confirmemail");
      verificationStatus.value = "";
    }, 1000);
    userInfo.value.info.is_verified = true;
    window.location.reload();
  } catch (err) {
    userInfo.value.info.is_verified = false;
    console.error(err.response?.data || err.message);
    if (codeString.value.length === 6) verificationStatus.value = "wrong";
  }
};

watch(() => props.isOpen, watchScrollModal);
</script>

<style scoped>
/* Fonts */
@font-face {
  font-family: "Myriad Pro Light";
  src: url("../fonts/MyriadPro/Light/MyriadPro-Light.eot");
  src: url("../fonts/MyriadPro/Light/MyriadPro-Light.eot?#iefix")
      format("embedded-opentype"),
    url("../fonts/MyriadPro/Light/MyriadPro-Light.woff") format("woff"),
    url("../fonts/MyriadPro/Light/MyriadPro-Light.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

/* Overlay */
.header-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  cursor: default;
  z-index: 30;
}

/* Modal container */
#modal-response {
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Myriad Pro Light", sans-serif;
  z-index: 40;
}

.menu-show {
  display: flex !important;
}

.modal-block {
  width: 100%;
  max-width: 480px;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
}

/* Title */
.modal-title {
  font-size: 1.2rem;
  line-height: 1.4;
}

/* Six-digit container */
.approveSixElements {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  position: relative;
  cursor: text;
}

.approveSixElements__element {
  width: 50px;
  height: 70px;
  border: 2px solid #818181;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border-radius: 6px;
  transition: border-color 0.2s;
}

.approveSixElements__element.active {
  border-color: #818181;
}
.approveSixElements__element.correct {
  border-color: #00c853;
}
.approveSixElements__element.wrong {
  border-color: #d50000;
}

/* Hidden input */
.Approveemail__input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
}

/* Close button */
.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

/* Verify button */
.modal-button-blue {
  padding: 12px 20px;
  background: #3b45a9;
  border: none;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.modal-button-blue:hover {
  background: #2b327cff;
}

/* Responsive */
@media (max-width: 600px) {
  .modal-block {
    padding: 15px;
    max-width: 90%;
  }
  .approveSixElements__element {
    width: 40px;
    height: 60px;
    font-size: 1.5rem;
  }
  .modal-title {
    font-size: 1rem;
  }
  .modal-button-blue {
    font-size: 0.9rem;
    padding: 10px 16px;
  }
}

@media (max-width: 400px) {
  .approveSixElements__element {
    width: 35px;
    height: 50px;
    font-size: 1.2rem;
  }
}
</style>
