<template>
  <div
      class="menu-reg menu-none menu-reg-sailor cabinet"
      id="modal-response"
      :class="{ 'menu-show': isOpen }"
  >
    <div class="modal-block">
      <div class="modal-pred__top">
        <h2 class="modal-title">
          Комментарий:
        </h2>
        <!-- /.modal-title -->

      </div>

      <div class="modal-content-new">
        <textarea v-model="comment"
                  placeholder="Комментарий"
                  class="modal-textarea"></textarea>
      </div>

      <div class="modal-pred__buttons">
        <button @click="sendBL()" class="modal-button-blue modal-button-red js-modal-close">
          Добавить
        </button>
        <!-- /.modal-button-blue -->

        <button @click="closeModal('blacklist')" class="modal-button-blue js-modal-close">
          Отмена
        </button>
        <!-- /.modal-button-blue -->
      </div>

      <!-- /.modal-button-blue -->

    </div>

  </div>
  <div
      :class="['header-overlay', { 'header-overlay__active': isOpen }]"
      @click="closeModal('companyvac')"
  ></div>
</template>

<script setup>
import api from "@/api/api";

import {useModalStore} from "~/store/modal";
import watchScrollModal from "~/utils/watchScrollModal";

const {closeModal, toggleModal} = useModalStore();

const props = defineProps({
  isOpen: {
    type: Boolean,
  },
  sailorId: {
    type: String,
  }
});

const comment = ref('');

watch(() => props.isOpen, watchScrollModal)

const sendBL = async () => {
  let data = {
    sailor_id: props.sailorId,
    created_at: Date.now() + 3 * (60 * 60 * 1000),
    comment: comment.value
  }
  await api.post("/resumes/blacklist/add/" + props.sailorId, data).then((data) => {
    //blackSend.value = true
    window.location.reload()
  });
}

</script>