<template>
    <div
            class="menu-reg menu-none menu-reg-sailor cabinet"
            id="auth-verify"
            :class="{ 'menu-show': isOpen }"
    >
        <AfCloseModal modalName="modalAuthVerify"/>
        <div class="menu-reg-title">Регистрация прошла успешно!</div>

        <span class="ed-auth-verify-msg">
                    На указанный email для завершения регистрации выслано письмо. Вы можете подтвердить почту в настройках профиля.
                </span>
    </div>
    <div
            :class="['header-overlay', { 'header-overlay__active': isOpen }]"
            @click="closeModal('modalAuthVerify');closeModal('lk');"
    ></div>

</template>

<script setup>
    import api from '@/api/api'

    import AfInput from "@/components/uikit/AfInput";
    import AfInputPassword from "@/components/uikit/AfInputPassword";
    import AfCheckbox from "@/components/uikit/AfCheckbox";
    import AfGroupBtn from "@/components/uikit/AfGroupBtn";
    import AfCloseModal from "@/components/uikit/AfCloseModal";
    import AfDropDox from "@/components/uikit/AfDropDox";
    import useVuelidate from "@vuelidate/core";
    import {required, email, minLength} from "@vuelidate/validators";
    import {useModalStore} from "~/store/modal";
    import {useUsersStore} from "~/store/useUserStore";
    import {ref} from "vue";

    import {useGlobalSettings} from "~/store/useGlobalSettings";

    import watchScrollModal from "~/utils/watchScrollModal";

    const {getJobs} = useGlobalSettings();
    const {getShipTypes} = useGlobalSettings();

    const {signIn} = useUsersStore();
    const {closeModal} = useModalStore();

    const props = defineProps({
        isOpen: {
            type: Boolean,
        },
    });

    watch(() => props.isOpen, watchScrollModal)

</script>

<style lang="scss" scoped></style>
