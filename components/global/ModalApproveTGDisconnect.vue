<template>
  <div v-if="isOpen" class="modal-approve-tg-disconnect">
    <div class="modal-content">
      <h2>Вы уверены, что хотите отключить Telegram?</h2>
      <div class="modal-actions">
        <button @click="closeModal('approveTGDisconnect')">Нет</button>
        <button @click="confirmDisconnect">Да</button>
      </div>
    </div>
  </div>
  <div
    :class="[
      'header-overlay header-overlay-commonmodal',
      { 'header-overlay__active': isOpen },
    ]"
    @click="closeModal('approveTGDisconnect')"
  ></div>
</template>

<script>
import api from "@/api/api";
import { useModalStore } from "~/store/modal";

export default {
  name: "ModalApproveTGDisconnect",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeModal(modalName) {
      const { closeModal } = useModalStore();
      closeModal(modalName);
    },
    async confirmDisconnect() {
      try {
        const response = await api.get("/tg_dissconnect");
        console.log("Telegram отключен:", response.data);
        this.closeModal("approveTGDisconnect");
        window.location.reload()
      } catch (error) {
        console.error("Ошибка при отключении Telegram:", error);
      }
    },
  },
};
</script>

<style scoped>
.modal-approve-tg-disconnect {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 90%;
  max-width: 400px;
  padding: 20px;
}
.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  gap: 15px;
}
.modal-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.modal-actions button {
  width: 150px;
  height: 40px;
}
.modal-actions button:nth-child(1) {
  background-color: rgba(179, 179, 179, 0.767);
  color: #000000;
}
.modal-actions button:nth-child(2) {
  background-color: #3b45a9;
  color: #fff;
}
</style>