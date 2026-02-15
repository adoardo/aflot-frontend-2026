<template>
  <div class="modal-confirm-password-change" v-if="isOpen">
    <h2>{{ headerMessage }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="inpHolder">
        <AfInputChangePassword
          v-model="password"
          title="Новый пароль"
          :error="errorMessage !== ''"
          :errormsg="errorMessage"
          @clear-error="errorMessage = ''"
        />

      </div>
      <div>
        <AfInputChangePassword
          v-model="confirmPassword"
          title="Повторите пароль"
          :error="errorMessage !== ''"
          :errormsg="errorMessage"
          @clear-error="errorMessage = ''"
        />

      </div>
        <img
          @click="closeModal('confirmpassword')"
          class="js-modal-close modal-close"
          src="assets/img/modal/close.png"
          alt="Закрыть"
        />
      <div class="submit_btn">
        <button type="submit">Подтвердить</button>
      </div>
    </form>
  </div>
  <div
    :class="['header-overlay', { 'header-overlay__active': isOpen }]"
    @click="handerModalCloseing"
  ></div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useModalStore } from "~/store/modal";
import watchScrollModal from "~/utils/watchScrollModal";
import api from "@/api/api";
import AfInputChangePassword from "../../components/uikit/AfInputChangePassword.vue";


const { closeModal , openModal } = useModalStore();
const props = defineProps({ isOpen: Boolean });
const { isOpen } = props;

const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const headerMessage = ref("Укажите новый пароль");

const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    headerMessage.value = "Пароли не совпадают";
    errorMessage.value = "Пароли должны совпадать.";
    return;
  }

  if (password.value.length < 8) {
    headerMessage.value = "Пароль слишком короткий, укажите минимум 8 символов";
    errorMessage.value = "Минимальная длина пароля — 8 символов.";
    return;
  }

  try {
    const response = await api.post("/confirm_changed_password", {
      password: password.value,
    });
    password.value = "";
    confirmPassword.value = "";
    errorMessage.value = "";
    headerMessage.value = "Укажите новый пароль";
    openModal("confirmingpassword");
    closeModal("confirmpassword");
    const respone2 = await api.post("/telegram_message" , {
      email:JSON.parse(localStorage.getItem("global/user") || '{}')?.decemail,
      type:"password_changed"
    })
  } catch (err) {
    console.error(err.response?.data || err.message);
    errorMessage.value =
      err.response?.data?.detail || "Ошибка при изменении пароля.";
  }
};

// close/reset when modal closes
watch(
  () => props.isOpen,
  (isOpen) => {
    watchScrollModal(isOpen);
    if (!isOpen) {
      password.value = "";
      confirmPassword.value = "";
      errorMessage.value = "";
      headerMessage.value = "Укажите новый пароль";
    }
  }
);
const handerModalCloseing = () => {
  closeModal("confirmpassword");
  password.value = "";
  confirmPassword.value = "";
};
</script>

<style scoped>

@font-face {
  font-family: "Myriad Pro Light";
  src: url("../fonts/MyriadPro/Light/MyriadPro-Light.eot");
  src: url("../fonts/MyriadPro/Light/MyriadPro-Light.eot?#iefix") format("embedded-opentype"),
       url("../fonts/MyriadPro/Light/MyriadPro-Light.woff") format("woff"),
       url("../fonts/MyriadPro/Light/MyriadPro-Light.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

.modal-confirm-password-change {
  width: 500px;
  max-width: 90%;
  min-height: 280px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  font-family: "Myriad Pro Light", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  z-index: 40;
  font-weight: 600;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

h2 {
  font-size: 28px;
  font-family: "Myriad Pro Light", sans-serif;
  color: black;
  font-weight: 300;
  margin: 0px;
  margin-block: 10px 20px;
  text-align: center;
}

.modal-confirm-password-change form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: grey;
  justify-content: center;

  input {
    width: 100%;
    height: 48px;
    padding: 0 16px;
    font-size: 16px;
    box-sizing: border-box;
    border: 1px solid #c4c4c4;
    border-radius: 6px;
  }

  .submit_btn {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  button {
    padding: 0;
    width: 200px;
    height: 48px;
    font-size: 18px;
    color: white;
    background-color: #3b45a9;
    border-radius: 6px;
    font-family: "Myriad Pro", sans-serif;
    white-space: nowrap;
    margin-top: 20px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  button:hover {
    background-color: #2e3685;
  }
}

input {
  border: 1px solid grey;
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
}

.error-message {
  border: 1px solid red;
}

.inpHolder{
  margin-bottom: 40px;
}

@media (max-width: 768px) {
  .modal-confirm-password-change {
    width: 90%;
    padding: 16px;
  }

  h2 {
    font-size: 22px;
  }

  .modal-confirm-password-change form input {
    height: 44px;
    font-size: 14px;
  }

  .modal-confirm-password-change form button {
    width: 160px;
    height: 44px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .modal-confirm-password-change {
    width: 95%;
    padding: 12px;
  }

  h2 {
    font-size: 20px;
  }

  .modal-confirm-password-change form {
    gap: 10px;
  }

  .modal-confirm-password-change form input {
    height: 40px;
    font-size: 14px;
  }

  .modal-confirm-password-change form button {
    width: 100%;
    height: 42px;
    font-size: 16px;
  }
}
.modal-close{
  position:absolute;
  top:10px;
  right:10px;
  cursor:pointer;
}

</style>
