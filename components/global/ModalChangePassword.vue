<template>
  <div
    class="menu-reg menu-none menu-reg-sailor cabinet"
    id="modal-response"
    :class="{ 'menu-show': isOpen }"
  >
    <div class="modal-block">
      <h2 class="modal-title">
        Для восстановления доступа, введите ваш емейл, инн, телефон 
      </h2>
        <img
          @click="closeModal('changepassword')"
          class="js-modal-close modal-close"
          src="assets/img/modal/close.png"
          alt="Закрыть"
        />

      <input
        class="Confirmemail__input"
        type="text"
        placeholder="Введите email ,инн, телефон"
        v-model="email"
      />

      <button
        @click="handleSubmit"
        class="modal-button-blue js-modal-close"
      >
        Подтвердить email
      </button>
    </div>
  </div>

  <div
    :class="['header-overlay', { 'header-overlay__active': isOpen }]"
    @click="closeModal('changepassword')"
  ></div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useModalStore } from "~/store/modal";
import watchScrollModal from "~/utils/watchScrollModal";
import api from "@/api/api";

const { closeModal,openModalCommon, openModal } = useModalStore();

const props = defineProps({
  isOpen: Boolean,
});

const email = ref("");

watch(() => props.isOpen, watchScrollModal);

const handleSubmit = async () => {
  try {
    if (!email.value) {
      return;
    }
    await api.post("/change_password", {
        email: email.value,
        type:"change_password"
      }); 
      closeModal("changepassword")
      openModal('approveemail')
      email.value = ''
  } catch (err) {
        console.log(err);
       openModalCommon(err?.response?.data?.detail || "Ошибка сервера. Попробуйте позже.");
  }
};

</script>

<style scoped>
.menu-reg.menu-none.menu-reg-sailor.cabinet {
  width: 100%;
  padding: 20px 0px 30px !important;
  transition: none !important;
  width: 600px !important;
  /* border: 2px solid red; */
  .modal-block {
    width: 70% !important;
    /* border: 2px solid blue; */
  }
}

.modal-button-blue.js-modal-close {
  padding: 0;
  width: 200px;
  height: 50px;
}

.Confirmemail__input {
  width: 100%;
  height: 50px;
  padding: 0 20px;
  font-size: 16px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid #c4c4c4;
}

.btn_group {
  display: flex;
  align-items: center;
  gap: 10px;

  .inp_holder {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    visibility: hidden;
  }

  label {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: #fff;
    transition: background 0.3s;
    padding: 10px 20px;

  }

  input:checked + label {
    background: #3b45a9;
    color: #fff;
  }
 }
}
  .modal-close{
    position:absolute;
    top: 10px;
    right: 10px;
  }
</style>
