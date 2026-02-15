<template>
  <div
    class="menu-reg menu-none menu-reg-sailor cabinet"
    id="modal-error-reporting"
    :class="{ 'menu-show': isOpen }"
  >
    <div class="modal-block">
      <div class="modal-top">
        <h2 class="modal-title">Сообщить об ошибке:</h2>
        <img
          @click="closeModal('errorReporting')"
          class="js-modal-close modal-close"
          src="assets/img/modal/close.png"
          alt="Закрыть"
        />
      </div>

      <!-- Ship info -->
      <div class="modal-info">
        <div class="modal-info__item" v-for="(value, label) in shipFields" :key="label">
          <div class="modal-info__gray">{{ label }}:</div>
          <div class="modal-info__black">{{ value }}</div>
        </div>
      </div>

      <!-- Form -->
      <div class="resume-grid col2 cabinet modal-form-three">
        <div class="input">
          <label>Ваше имя:</label>
          <input
            type="text"
            v-model="form.name"
            :class="{ 'input-error': v$.name.$error }"
            placeholder="Александр"
          />
        </div>

        <div class="input">
          <label>Контактная почта:</label>
          <input
            type="email"
            v-model="form.email"
            :class="{ 'input-error': v$.email.$error }"
            placeholder="orionstar@company.ru"
          />
        </div>

        <div class="input">
          <label>Телефон:</label>
          <input
            type="text"
            v-model="form.phone"
            :class="{ 'input-error': v$.phone.$error }"
            placeholder="+7 812 777 77 77"
          />
        </div>

        <textarea
          v-model="form.message"
          :class="{ 'input-error': v$.message.$error }"
          placeholder="Укажите неточность в информации о судне, либо интересующий Вас вопрос"
        ></textarea>
      </div>

      <!-- Consent -->
      <div class="modal-check">
        <label for="check" class="contact-label contact-label-check">
          <input
            id="check"
            type="checkbox"
            v-model="form.agree"
            :class="{ 'input-error': v$.agree.$error }"
          />
          <span class="contact-check__text">
            Я даю согласие на обработку
            <a href="#">персональных данных</a>
          </span>
        </label>
      </div>
    </div>

    <button @click="submitForm" class="modal-button">
      Отправить сообщение
      <img src="assets/img/modal/plus-cursor.svg" alt="image" />
    </button>
  </div>

  <div
    :class="['header-overlay', { 'header-overlay__active': isOpen }]"
    @click="closeModal('errorReporting')"
  ></div>
</template>

<script setup>
import { reactive, computed, watch } from "vue";
import { useModalStore } from "~/store/modal";
import { useGlobalSettings } from "~/store/useGlobalSettings";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import api from "@/api/api";
import watchScrollModal from "~/utils/watchScrollModal";

const props = defineProps({ isOpen: Boolean });
const { closeModal, toggleModal } = useModalStore();
const globalSettings = useGlobalSettings();

// Reactive form
const form = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
  agree: false
});

// Validation rules
const rules = {
  name: { required },
  email: { required, email },
  phone: { required },
  message: { required },
  agree: { required }
};

const v$ = useVuelidate(rules, form);

// Ship fields for display
const shipFields = computed(() => {
  const ship = globalSettings.currentShip;
  return {
    "Название судна": ship.vessel_name || "-",
    "IMO судна": ship.imo || "-"
  };
});

// Submit form
const submitForm = async () => {
  v$?.value.$touch();

  if (v$?.value.$error) {
    alert("Пожалуйста, заполните все обязательные поля правильно!");
    return;
  }

  try {
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
    };

    const response = await api.post("/send", payload);
    console.log("Отправлено:", response.data);

    // Show confirmation modal
    closeModal("errorReporting");
    toggleModal("modalResponse");

    // Reset form
    form.name = "";
    form.email = "";
    form.phone = "";
    form.message = "";
    form.agree = false;
    v$?.value.$reset();
  } catch (error) {
    console.error("Ошибка отправки:", error);
    alert("Произошла ошибка при отправке сообщения.");
  }
};

// Reset form when modal closes
watch(
  () => props.isOpen,
  (val) => {
    if (!val) v$?.value.$reset();
  }
);

watch(() => props.isOpen, watchScrollModal);
</script>

<style scoped>
.input-error {
  border: 1px solid red;
}
</style>
