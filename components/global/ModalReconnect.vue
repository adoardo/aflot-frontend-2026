<template>
  <div v-if="isOpen" class="modal modal-warning active">
    <div class="modal-block">
      <img src="assets/img/sudno/red.svg" alt="warning" class="modal-icon" />

      <h2 class="modal-title">Телеграм уже подключен</h2>

      <p class="modal-subtitle">
        Похоже, вы уже подключили Telegram ранее или забыли завершить прошлую сессию.
        Чтобы подключить новый аккаунт — сначала разорвите старое соединение.
      </p>

      <ul class="modal-details">
        <li>Проверьте настройки уведомлений в вашем профиле.</li>
        <li>Отключите старую Telegram-сессию, если она всё ещё активна.</li>
        <li>После этого попробуйте снова подключить Telegram.</li>
      </ul>

      <div class="modal-actions">
        <button class="modal-button-blue" @click="handleClose">
          Закрыть окно
        </button>
      </div>
    </div>
  </div>

  <div
    :class="['header-overlay', { 'header-overlay__active': isOpen }]"
    @click="handleClose"
  ></div>
</template>

<script setup>
import { useModalStore } from "~/store/modal";

defineProps({
  isOpen: { type: Boolean, default: false },
});

const { closeModal } = useModalStore();

const handleClose = () => closeModal("telegramWarning");
</script>

<style scoped>
.modal-block {
  padding: 30px;
  text-align: center;
}

.modal-icon {
  width: 90px;
  margin-bottom: 15px;
}

.modal-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #222;
}

.modal-subtitle {
  font-size: 16px;
  color: #555;
  line-height: 1.5;
  margin-bottom: 20px;
  padding: 0 40px;
}

.modal-details {
  text-align: left;
  margin: 0 auto 25px;
  display: inline-block;
  color: #444;
  font-size: 15px;
  line-height: 1.5;
}

.modal-details li {
  list-style: disc;
  margin-left: 20px;
  margin-bottom: 5px;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.modal-button-blue {
  background-color: #3b45a9;
  color: #fff;
  border: none;
  padding: 15px 35px;
  cursor: pointer;
  font-size: 15px;
  border-radius: 5px;
  transition: 0.2s;
}

.modal-button-blue:hover {
  background-color: #2f378b;
}

.modal-button-gray {
  background-color: #e3e3e3;
  color: #222;
  border: none;
  padding: 15px 35px;
  cursor: pointer;
  font-size: 15px;
  border-radius: 5px;
  transition: 0.2s;
}

.modal-button-gray:hover {
  background-color: #ccc;
}
</style>
