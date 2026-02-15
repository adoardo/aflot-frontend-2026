<template>
  <div
      class="menu-reg menu-none menu-reg-sailor cabinet"
      id="modal-response"
      :class="{ 'menu-show': isOpen }"
  >
    <div class="modal-block">
      <h2 class="modal-title">
        На указанный email<br>
        отправлено письмо с подтверждением.
      </h2>
      <!-- /.modal-title -->

      <button @click="closeModal('approveemail')" class="modal-button-blue js-modal-close">
        Закрыть окно
      </button>
      <!-- /.modal-button-blue -->

    </div>

  </div>
  <div
      :class="['header-overlay', { 'header-overlay__active': isOpen }]"
      @click="closeModal('approveemail')"
  ></div>
</template>

<script setup>
import {useModalStore} from "~/store/modal";
import watchScrollModal from "~/utils/watchScrollModal";

const {closeModal, toggleModal} = useModalStore();

const props = defineProps({
  isOpen: {
    type: Boolean,
  },
});

watch(() => props.isOpen, watchScrollModal)
</script>