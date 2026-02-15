<template>
    <div
            class="menu-reg menu-none menu-reg-sailor cabinet"
            id="common-modal"
            :class="{ 'menu-show': isOpen }"
    >
        <div class="modal-block">
            <div class="modal-top">
                <h2 class="modal-title">

                </h2>
                <!-- /.modal-title -->
                <img @click="closeModal('commonmodal')" class="js-modal-close modal-close" src="assets/img/modal/close.png" alt="image">

            </div>
            <!-- /.modal-top -->

            <div class="suda-item__text">{{msg}}</div>
        </div>
        <!-- /.modal-button -->

    </div>
    <div
            :class="['header-overlay header-overlay-commonmodal', { 'header-overlay__active': isOpen }]"
            @click="closeModal('commonmodal')"
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
        msg: {
            type: String,
            default: 'Ошибка. Пожалуйста, попробуйте позже.',
        },
    });

    watch(() => props.isOpen, watchScrollModal)

</script>

<style>
    .header-overlay__active.header-overlay-commonmodal {
        z-index: 101 !important;
    }
    .menu-reg.menu-show#common-modal {
        z-index: 102 !important;
    }
</style>
