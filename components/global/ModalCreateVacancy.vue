<template>
  <div v-if="isOpen" class="modal modal-thank active">
    <div class="modal-block">
      <img src="assets/img/modal/check-green.svg" alt="success" />
      <h2 class="modal-title">
        Вакансия опубликована
      </h2>
      <button
        @click="handleCloseVac"
        class="modal-button-blue js-modal-close"
      >
        К анкетам моряков
      </button>
    </div>
  </div>
  <div
    :class="['header-overlay', { 'header-overlay__active': isOpen }]"
    @click="handleClose"
  ></div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { useModalStore } from "~/store/modal";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);
const { closeModal } = useModalStore();

const handleClose = () => {
  closeModal("vacancySuccess");
  emit("close");
  window.location.reload();
};
const handleCloseVac = () => {
  // closeModal("vacancySuccess");
  // emit("close");
  // window.location.reload();
  window.location.href = '/resumes'
};
</script>

<style scoped>
.modal-block {
  padding: 30px;
  text-align: center;
}

.modal-title {
  margin-top: 10px;
  font-size: 24px;
  font-weight: 600;
  padding-inline:100px
}

.modal-subtitle {
  color: #555;
  margin: 10px 0 25px;
  font-size: 16px;
  line-height: 1.4;
}

.modal-button-blue {
  background-color: #3b45a9;
  color: white;
  border: none;
  padding: 25px 65px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.2s;
}

.modal-button-blue:hover {
  background-color: #2f378b;
}
</style>
