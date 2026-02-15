<template>
  <div
    class="menu-reg menu-none menu-reg-sailor cabinet"
    id="modal-response"
    :class="{ 'menu-show': isOpen }"
  >
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
        <img
          @click="closeModal('approveemail')"
          class="js-modal-close modal-close"
          src="assets/img/modal/close.png"
          alt="Закрыть"
        />
        <input
          ref="hiddenInput"
          type="text"
          v-model="codeString"
          class="Approveemail__input"
          maxlength="6"
          @input="handleInput"
        />
      </div>

      <button
        @click="handleVerify"
        class="modal-button-blue js-modal-close"
      >
        Подтвердить
      </button>
    </div>
  </div>
    <div
    :class="['header-overlay', { 'header-overlay__active': isOpen }]"
    @click="handerModalCloseing"
  ></div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import watchScrollModal from "~/utils/watchScrollModal";
import api from "@/api/api";

import { useModalStore } from "~/store/modal";
const { closeModal , openModal , toggleModal } = useModalStore();
const props = defineProps({ isOpen: Boolean });

const codeString = ref("");
const verificationStatus = ref(""); // "", "correct", "wrong"
const hiddenInput = ref(null);

const handerModalCloseing = () => {
  codeString.value = "";
  verificationStatus.value = "";
  closeModal("approveemail");
};

const focusHiddenInput = () => {
  hiddenInput.value?.focus();
};

const handleInput = async () => {
  codeString.value = codeString.value.replace(/\D/g, "").slice(0, 6);
  verificationStatus.value = ""; // reset on input

  if (codeString.value.length === 6) {
    await handleVerify();
  }
};

const code = computed(() => {
  const arr = codeString.value.split("");
  while (arr.length < 6) arr.push("");
  return arr;
});

const handleVerify = async () => {
  try {
    const response = await api.post("/verify_code", {
      code: codeString.value,
      action : "confirm_password_change"
    });
    verificationStatus.value = "correct";
    setTimeout(() => {
      codeString.value = "";
      verificationStatus.value = "";
      closeModal("approveemail");
      toggleModal('confirmpassword');
    }, 1000);
  } catch (err) {
    console.error(err.response?.data || err.message);
    if (codeString.value.length === 6) verificationStatus.value = "wrong"; // error → red
  }
};

watch(() => props.isOpen, watchScrollModal);
</script>

<style scoped>
@font-face {
    font-family: "Myriad Pro Light";
    src: url("../fonts/MyriadPro/Light/MyriadPro-Light.eot");
    src: url("../fonts/MyriadPro/Light/MyriadPro-Light.eot?#iefix") format("embedded-opentype"), url("../fonts/MyriadPro/Light/MyriadPro-Light.woff") format("woff"), url("../fonts/MyriadPro/Light/MyriadPro-Light.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
}
#modal-response{
  padding: 10px 50px;
}
.approveSixElements__element {
  width: 50px;
  height: 70px;
  border: 2px solid #818181;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  transition: border-color 0.2s;
}

.approveSixElements__element.active {
  border-color: #818181;
}

.approveSixElements__element.correct {
  border-color: #00c853; /* green */
}

.approveSixElements__element.wrong {
  border-color: #d50000; /* red */
}

  #modal-response{
  }
  .cabinet{
    max-width: unset !important;
    height: 400px !important;
    display: grid;
    place-content: center;
    font-family: "Myriad Pro Light", sans-serif;
  }
  .modal-block{
    height: 300px;
    display: flex;
    justify-content: space-around;
    
  }

.header-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(77, 81, 114, 0.5);
  cursor: default;
  z-index: 30;
  display:none;
  &_active{
    display:flex;
  }
}
  .approveSixElements{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    div{
      width: 50px;
      height: 70px;
      border: 2px solid #818181;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40px;

    }
  }
  .Approveemail__input{
    border: 1px solid red;
    /* width: 100%;
    height: 100%; */
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0px;
    opacity: 0  ;
    /* border: none; */
  }
  .modal-close{
    position:absolute;
    top:10px;
    right:10px;
  }
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
