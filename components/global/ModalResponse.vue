<template>
    <div
            class="menu-reg menu-none menu-reg-sailor cabinet"
            id="modal-response"
            :class="{ 'menu-show': isOpen }"
    >
        <div class="modal-block">
            <img src="assets/img/modal/check-green.svg" alt="image">
            <h2 class="modal-title">
                Спасибо!<br>
                Ваше сообщение отправлено!
            </h2>
            <!-- /.modal-title -->

            <button @click="closeModal('modalResponse')" class="modal-button-blue js-modal-close">
                Закрыть окно
            </button>
            <!-- /.modal-button-blue -->

        </div>

    </div>
    <div
            :class="['header-overlay', { 'header-overlay__active': isOpen }]"
            @click="closeModal('modalResponse')"
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