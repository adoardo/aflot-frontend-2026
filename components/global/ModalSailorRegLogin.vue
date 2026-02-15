<template>
    <div :class="{ 'menu-show': isOpen }" class="menu-reg menu-none menu-reg-sailor cabinet" id="reg-sailor-lk">
        <div class="menu-lk-top">
            <div class="menu-lk-title">
                Личный кабинет
            </div>

            <AfCloseModal modalName="modalSeilorRegLogin" />
        </div>
        <!-- /.menu-lk-top -->

        <div class="menu-lk-content">
            <img src="assets/img/menu/sailor-lk.svg" alt="image" class="menu-lk-img">
            <div class="menu-lk-info">
                <div class="menu-lk-subtitle">
                    Иванов Иван Иванович
                </div>
                <!-- /.menu-lk-subtitle -->

                <select class="menu-lk-select">
                    <option class="menu-lk-option">Рассмотрю варианты</option>
                    <!-- /.menu-lk-option -->
                    <option class="menu-lk-option">Вариант №1</option>
                    <!-- /.menu-lk-option -->
                    <option class="menu-lk-option">Вариант №2</option>
                    <!-- /.menu-lk-option -->
                </select>
                <!-- /#.menu-lk-select -->

                <div class="menu-lk-text">
                    Статус «Ищу работу» повышает
                    вероятность получения предложений
                    в 3 раза!
                </div>
                <!-- /.menu-lk-text -->
            </div>
            <!-- /.menu-lk-info -->
        </div>
        <!-- /.menu-lk-content -->

        <div class="menu-lk-part">
            <a href="#" class="menu-lk-link">
                <img src="assets/img/menu/lk-about-11.svg" alt="image" class="menu-lk-icon">
                <span class="menu-lk-ltext">Поднять резюме в топ</span>
                <!-- /.menu-lk-ltext -->
            </a>
            <!-- /.menu-lk-link -->
            <a href="#" class="menu-lk-link">
                <img src="assets/img/menu/lk-about-12.svg" alt="image" class="menu-lk-icon">
                <span class="menu-lk-ltext">Мои отклики</span>
                <!-- /.menu-lk-ltext -->
            </a>
            <!-- /.menu-lk-link -->
            <a href="#" class="menu-lk-link">
                <img src="assets/img/menu/lk-about-2.svg" alt="image" class="menu-lk-icon">
                <span class="menu-lk-ltext">Входящие предложения</span>
                <!-- /.menu-lk-ltext -->
            </a>
            <!-- /.menu-lk-link -->
            <a href="#" class="menu-lk-link">
                <img src="assets/img/menu/lk-about-13.svg" alt="image" class="menu-lk-icon">
                <span class="menu-lk-ltext">Принятое</span>
                <!-- /.menu-lk-ltext -->
            </a>
            <!-- /.menu-lk-link -->
            <a href="#" class="menu-lk-link">
                <img src="assets/img/menu/lk-about-5.svg" alt="image" class="menu-lk-icon">
                <span class="menu-lk-ltext">Избранное</span>
                <!-- /.menu-lk-ltext -->
            </a>
            <!-- /.menu-lk-link -->
            <a href="#" class="menu-lk-link">
                <img src="assets/img/menu/lk-about-7.svg" alt="image" class="menu-lk-icon">
                <span class="menu-lk-ltext">Тарифы</span>
                <!-- /.menu-lk-ltext -->
            </a>
            <!-- /.menu-lk-link -->
            <!-- <a href="#" class="menu-lk-link">
                <img src="assets/img/menu/lk-about-8.svg" alt="image" class="menu-lk-icon">
                <span class="menu-lk-ltext">Баланс и история операций</span>
               
            </a> -->
            <!-- /.menu-lk-link -->
            <a href="#" class="menu-lk-link">
                <img src="assets/img/menu/lk-about-6.svg" alt="image" class="menu-lk-icon">
                <span class="menu-lk-ltext">Статистика</span>
                <!-- /.menu-lk-ltext --></a>
            <!-- /.menu-lk-link -->
            <a href="#" class="menu-lk-link">
                <img src="assets/img/menu/lk-about-3.svg" alt="image" class="menu-lk-icon">
                <span class="menu-lk-ltext">Мое резюме</span>
                <!-- /.menu-lk-ltext --></a>
            <!-- /.menu-lk-link -->
            <a href="#" class="menu-lk-link">
                <img src="assets/img/menu/lk-about-9.svg" alt="image" class="menu-lk-icon">
                <span class="menu-lk-ltext">Настройки профиля</span>
                <!-- /.menu-lk-ltext --></a>
            <!-- /.menu-lk-link -->
            <a href="#" class="menu-lk-link">
                <img src="assets/img/menu/lk-about-10.svg" alt="image" class="menu-lk-icon">
                <span class="menu-lk-ltext">Выйти</span>
                <!-- /.menu-lk-ltext --></a>
            <!-- /.menu-lk-link --></div>
        <!-- /.menu-lk-part -->
    </div>
    <div
            :class="['header-overlay', { 'header-overlay__active': isOpen }]"
            @click="closeModal('modalSeilorRegLogin')"
    ></div>
</template>

<script setup>
    import AfInput from "@/components/uikit/AfInput";
    import AfInputPassword from "@/components/uikit/AfInputPassword";
    import AfCheckbox from "@/components/uikit/AfCheckbox";
    import AfInputUpload from "@/components/uikit/AfInputUpload";
    import AfGroupBtn from "@/components/uikit/AfGroupBtn";
    import AfCloseModal from "@/components/uikit/AfCloseModal";
    import useVuelidate from "@vuelidate/core";
    import { required, email, minLength } from "@vuelidate/validators";
    import { useModalStore } from "~/store/modal";
    import watchScrollModal from "~/utils/watchScrollModal";

    const { closeModal } = useModalStore();
    const props = defineProps({
        isOpen: {
            type: Boolean,
        },
    });

    watch(() => props.isOpen, watchScrollModal)


</script>
