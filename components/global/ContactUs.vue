<template>
  <div
    class="menu-reg menu-none"
    id="contact-us-modal"
    v-if="!ifSend"
    :class="{ 'menu-show': isOpen }"
  >
    <div class="modal-block">
      <div class="modal-top">
        <h2 class="modal-title">Связаться с нами</h2>
        <img
          @click="closeModal('contactus')"
          class="js-modal-close modal-close"
          src="assets/img/modal/close.png"
          alt="Закрыть"
        />
      </div>

      <div class="suda-item__text">
        Заполните форму, и мы свяжемся с вами в ближайшее время.
      </div>

      <div class="vabout-info vabout-info-vak modal-vabout modal-vabout__two modal-vabout__line">
        <div class="iunput_holder">
          <label for="name" class="af-label">Имя</label>
          <input
            id="name"
            type="text"
            placeholder="Ваше имя"
            v-model="formData.name"
            :class="{ 'input-error': v$.name.$error }"
            autocomplete="off"
          />
        </div>

        <div class="iunput_holder">
          <label for="email" class="af-label">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Ваш email"
            v-model="formData.email"
            :class="{ 'input-error': v$.email.$error }"
            autocomplete="off"
          />
        </div>
      </div>

      <div class="vabout-info vabout-info-vak modal-vabout modal-vabout__line">
        <div class="vabout-item" style="width: 100%">
          <label for="message" class="af-label">Сообщение:</label>
          <textarea
            id="message"
            v-model="formData.message"
            :class="{ 'input-error': v$.message.$error }"
            placeholder="Ваше сообщение"
            rows="5"
          ></textarea>
        </div>
      </div>
    </div>

    <button class="modal-button" @click="send">
      Отправить
    </button>
  </div>

  <div
    :class="['header-overlay', { 'header-overlay__active': isOpen }]"
    @click="closeModal('contactus')"
  ></div>

  <div v-if="ifSend" class="modal modal-thank active">
    <div class="modal-block">
      <img src="assets/img/modal/check-green.svg" alt="Успешно" />
      <h2 class="modal-title">
        Спасибо!<br />
        Ваше сообщение успешно отправлено!
      </h2>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useModalStore } from "~/store/modal";
import api from "@/api/api";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

const { closeModal } = useModalStore();

const props = defineProps({
  isOpen: Boolean,
});

const ifSend = ref(false);

const formData = ref({
  name: "",
  email: "",
  message: "",
});

const rules = {
  name: { required },
  email: { required, email },
  message: { required },
};

const v$ = useVuelidate(rules, formData);

const send = async () => {
  v$.value.$touch();

  if (!v$.value.$error) {
    try {
      const response = await api.post(
        '/send',
        {
          name: formData.value.name,
          email: formData.value.email,
          message: formData.value.message,
        }
      );
      console.log('Ответ от сервера:', response.data);
      if (response.data.status === 'ok') {
        ifSend.value = true;

        // Автоматическое закрытие модального окна через 3 секунды
        setTimeout(() => {
          closeModal('contactus');
          ifSend.value = false;
          formData.value = {
            name: "",
            email: "",
            message: "",
          };
          v$.value.$reset();
        }, 3000);

      } else {
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
    }
  }
};

watch(
  () => props.isOpen,
  (val) => {
    if (!val) {
      v$.value.$reset();
      ifSend.value = false;
      formData.value = {
        name: "",
        email: "",
        message: "",
      };
    }
  }
);
</script>
<style scoped>
.menu-reg.menu-none {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 90%;
  max-width: 600px;
  max-height: 70vh;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 40;
  display: flex;
  overflow: hidden;
  flex-direction: column;
}

.menu-reg.menu-none.menu-show {
  opacity: 1;
  visibility: visible;
}

.modal-block {
  width: 100%;
}

.modal-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.modal-title {
  font-family: "Myriad Pro Light", sans-serif;
  font-weight: 600;
  font-size: 28px;
  color: #000;
  margin: 0;
}

.modal-close {
  cursor: pointer;
  width: 28px;
  height: 28px;
}

.suda-item__text {
  font-size: 15px;
  color: #333;
  margin-bottom: 25px;
  line-height: 1.4;
  font-weight: 600;
}

.vabout-info {
  display: flex;
  gap: 20px;
  flex-wrap: nowrap;
  margin-bottom: 20px;
  justify-content: space-between;
}

.vabout-info-vak.modal-vabout__two > .vabout-item {
  flex: 1 1 45%;
  min-width: 200px;
}

.vabout-info-vak.modal-vabout__line > .vabout-item {
  flex: 1 1 100%;
}

.vabout-item label.af-label,
.vabout-item label {
  font-weight: 600;
  font-size: 16px;
  color: #000;
  margin-bottom: 6px;
  display: inline-block;
}

textarea {
  width: 100%;
  border: 1px solid #3b44a96c;
  border-radius: 3px;
  padding: 8px 10px;
  font-family: inherit;
  font-size: 14px;
  resize: none;
  transition: border-color 0.3s ease;
  min-height: 300px;
  box-sizing: border-box;
}

textarea:focus {
  border-color: #3b45a9;
  outline: none;
}

.input-error {
  border-color: red !important;
}

.modal-button {
  background-color: #3b45a9;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 16px;
  padding: 12px 25px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  user-select: none;
}

.modal-button:hover:not(:disabled) {
  background-color: #3b45a9;
}

.modal-button:disabled {
  background-color: gray;
  cursor: default;
}

.header-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(77, 81, 114, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease;
  z-index: 30;
}

.header-overlay.header-overlay__active {
  opacity: 1;
  visibility: visible;
}

.modal-thank {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 90%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transform: translate(-50%, -50%);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 45;
  padding: 30px 25px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-thank.active {
  opacity: 1;
  visibility: visible;
}

.modal-thank img {
  width: 70px;
  margin-bottom: 20px;
}

.modal-thank .modal-title {
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 30px;
  color: #000;
  text-align: center;
  
}

.modal-button-blue {
  background-color: #3fb05d;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  border-radius: 5px;
  padding: 12px 25px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.modal-button-blue:hover {
  background-color: #339e53;
}
.af-label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  color: #000;
}

.iunput_holder{
  width: 100%;
}
.iunput_holder_Info{
  width: 100%;
}

input {
  width: 100%;
  padding: 8px 10px;
  font-size: 14px;
  height: 50px;
  border: 1px solid #3b44a96c;
  border-radius: 3px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #3b45a9;
  outline: none;
}

.input-error {
  border-color: #d9534f;
}
.modal-title{
  text-align: center;
  width: 100%;
}
.modal-close{
  position: absolute;
  right: 10px;
  top: 10px;
  transform:scale(0.7) ;
}
</style>
