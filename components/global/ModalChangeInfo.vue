<template>
  <div class="changeinfo-modal-wrapper" :class="{ 'is-open': isOpen }">
    <AfCloseModal modal-name="changeinfo" />

    <transition name="step-fade" mode="out-in">
      <div class="changeinfo-modal" :key="step">
        <!-- SUCCESS OR ERROR ICON -->
        <img
          v-if="showIcon && isSuccess && step != 'code'"
          src="assets/img/sudno/green.svg"
          class="changeinfo-icon"
        />
        <img
          v-if="showIcon && !isSuccess"
          src="assets/img/sudno/red.svg"
          class="changeinfo-icon"
        />

        <!-- STEP 1: PASSWORD -->
        <template v-if="step === 'password'">
          <h2 class="changeinfo-title">Подтверждение личности</h2>

          <p v-if="showIcon && !isSuccess" class="changeinfo-error">
            Неверный пароль
          </p>
          <p v-else class="changeinfo-description">
            Введите ваш текущий пароль.
          </p>

          <form
            @submit.prevent="submitPassword"
            :class="{ shake: showIcon && !isSuccess }"
          >
            <label class="changeinfo-label">Пароль</label>
            <input
              class="changeinfo-input"
              v-model="password"
              type="password"
            />
            <button class="changeinfo-button">Продолжить</button>
          </form>
        </template>

        <!-- STEP 2: NEW EMAIL -->
        <template v-else-if="step === 'email'">
          <h2 class="changeinfo-title">Новый Email</h2>

          <p v-if="showIcon && !isSuccess" class="changeinfo-error">
            {{ emailError }}
          </p>
          <p v-else class="changeinfo-description">
            Введите новый email адрес.
          </p>

          <form
            @submit.prevent="submitEmail"
            :class="{ shake: showIcon && !isSuccess }"
          >
            <label class="changeinfo-label">Email</label>
            <input class="changeinfo-input" v-model="newEmail" type="email" />
            <button class="changeinfo-button">Отправить код</button>
          </form>
        </template>

        <!-- STEP 3: VERIFICATION CODE -->
        <template v-else-if="step === 'code'">
          <h2 class="changeinfo-title">Подтверждение Email</h2>

          <p v-if="showIcon && !isSuccess" class="changeinfo-error">
            Неверный код
          </p>
          <p v-else class="changeinfo-description">
            Код отправлен на <b>{{ newEmail }}</b
            >.
          </p>

          <form
            @submit.prevent="submitCode"
            :class="{ shake: showIcon && !isSuccess }"
          >
            <label class="changeinfo-label">Код</label>
            <input class="changeinfo-input" v-model="verifyCode" type="text" />
            <button class="changeinfo-button">Подтвердить</button>
          </form>
        </template>

        <!-- STEP 4: SUCCESS -->
        <template v-else-if="step === 'success'">
          <img src="assets/img/sudno/green.svg" class="changeinfo-icon" />
          <h2 class="changeinfo-title">Email успешно изменён!</h2>
        </template>
      </div>
    </transition>
  </div>
  <div
    :class="['header-overlay', { 'header-overlay__active': isOpen }]"
    @click="closeModal('existingship')"
  ></div>
</template>
<script setup>
import { ref, watch } from "vue";
import { useModalStore } from "~/store/modal";
import watchScrollModal from "~/utils/watchScrollModal";
import api from "@/api/api";
import AfCloseModal from "../uikit/AfCloseModal.vue";
import { useUsersStore } from "~/store/useUserStore";
const userStore = useUsersStore();

const { closeModal } = useModalStore();

const props = defineProps({ isOpen: Boolean });
watch(() => props.isOpen, watchScrollModal);

// States
const step = ref("password");
const password = ref("");
const newEmail = ref("");
const verifyCode = ref("");

// Icon logic
const showIcon = ref(false);
const isSuccess = ref(false);
const emailError = ref("");

// Helper: show success → wait → go next step
const successTransition = async (nextStep) => {
  isSuccess.value = true;
  showIcon.value = true;
  setTimeout(() => {
    showIcon.value = false;
    isSuccess.value = false;
    step.value = nextStep;
  }, 1500);
};

// Helper: show error only (stay on step)
const showError = () => {
  isSuccess.value = false;
  showIcon.value = true;
};

// Step 1
const submitPassword = async () => {
  showIcon.value = false;
  try {
    await api.post("/verify-password", { password: password.value });
    await successTransition("email");
  } catch {
    showError();
  }
};

// Step 2
const submitEmail = async () => {
  showIcon.value = false;
  emailError.value = "";
  try {
    await api.post("/request-email-changes", { new_email: newEmail.value });
    await successTransition("code");
  } catch (e) {
    emailError.value = e.data?.detail || "Ошибка!";
    showError();
  }
};

// Step 3
const submitCode = async () => {
  showIcon.value = false;
  try {
    await api.post("/confirm-email-change", {
      new_email: newEmail.value,
      code: verifyCode.value,
    });
    await successTransition("success");
    setTimeout(async () => {
      await userStore.logoutAndAutoLogin(newEmail.value, password.value);
    }, 2000);
    setTimeout(() => {
      closeModal("changeinfo");
    }, 3000);
  } catch {
    showError();
  }
};
</script>

<style scoped>
/* WRAPPER */
.changeinfo-modal-wrapper {
  position: fixed;
  top: -200%;
  left: 50%;
  transform: translateX(-50%);
  width: 420px;
  max-width: 90%;
  background: white;
  padding: 25px 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  z-index: 40;
  transition: all 0.35s ease;
  opacity: 0;
}

.changeinfo-modal-wrapper.is-open {
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
}

/* ICON */
.changeinfo-icon {
  width: 70px;
  margin: 0 auto 15px;
}

/* ERROR TEXT */
.changeinfo-error {
  color: #d9534f;
  font-size: 14px;
  margin-bottom: 15px;
  font-weight: 600;
  text-align: center;
}

/* OVERLAY */
.changeinfo-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  pointer-events: none;
  transition: all 0.25s ease;
  z-index: 30;
}

.changeinfo-overlay.is-active {
  opacity: 1;
  pointer-events: auto;
}

/* CONTENT */
.changeinfo-modal {
  text-align: center;
}

.changeinfo-title {
  font-size: 22px;
  margin-bottom: 10px;
  text-align: center;
}

.changeinfo-description {
  font-size: 14px;
  margin-bottom: 15px;
  color: #444;
}

.changeinfo-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  text-align: left;
}

.changeinfo-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  font-size: 15px;
}

/* BUTTON */
.changeinfo-button {
  width: 100%;
  margin-top: 18px;
  padding: 12px;
  background: #3b45a9;
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  height: 40px;
}

.changeinfo-button:hover {
  background: #2f358e;
}

/* ERROR SHAKE ANIMATION */
.shake {
  animation: shake 0.35s ease;
}

@keyframes shake {
  0% {
    transform: translateX(0px);
  }
  25% {
    transform: translateX(-6px);
  }
  50% {
    transform: translateX(6px);
  }
  75% {
    transform: translateX(-6px);
  }
  100% {
    transform: translateX(0px);
  }
}

/* STEP TRANSITIONS */
.step-fade-enter-active,
.step-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.step-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.step-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
