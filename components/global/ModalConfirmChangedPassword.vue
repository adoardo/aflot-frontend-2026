<template>
  <div v-if="isOpen" class="modal modal-thank active">
    <div class="modal-block">
      <img src="assets/img/modal/check-green.svg" alt="image">
      <h2 class="modal-title">
        Пароль успешно изменён
      </h2>
      <button @click="closeImmediately" class="modal-button-blue js-modal-close">
        Закрыть окно
      </button>
    </div>
  </div>
    <div
    :class="['header-overlay', { 'header-overlay__active': isOpen }]"
  ></div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useModalStore } from "~/store/modal";

const { closeModal } = useModalStore();
const props = defineProps({ isOpen: Boolean });

const showModal = ref(false);

watch(() => props.isOpen, (val) => {
  if (val) {
    showModal.value = true;

    setTimeout(() => {
      closeModal("confirmingpassword");
      showModal.value = false;
    }, 1000);
  }
});

const closeImmediately = () => {
  closeModal("confirmingpassword");
  showModal.value = false;
};
</script>
<style scoped>
.modal-thank {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 45;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: white;
  padding: 20px 100px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.25);
}

.modal-thank .modal-block img {
  width: 60px;
  height: 60px;
  margin-bottom: 20px;
}

.modal-thank .modal-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 25px;
  color: #1a1a1a;
  line-height: 1.4;
}

.modal-thank .modal-button-blue {
  padding: 12px 30px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: #3b45a9;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.modal-thank .modal-button-blue:hover {
  background-color: #2e3685;
}

.header-overlay{
  z-index:30;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-thank {
    padding: 25px 30px;
  }

  .modal-thank .modal-title {
    font-size: 20px;
  }

  .modal-thank .modal-button-blue {
    font-size: 14px;
    padding: 10px 25px;
  }
}

@media (max-width: 480px) {
  .modal-thank {
    width: 90%;
    padding: 20px 20px;
  }

  .modal-thank .modal-title {
    font-size: 18px;
  }

  .modal-thank .modal-button-blue {
    width: 100%;
    padding: 10px 0;
    font-size: 14px;
  }
}
</style>
