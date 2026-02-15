<template>
    <div
            class="menu-reg menu-none menu-reg-sailor cabinet"
            id="reg-about"
            :class="{ 'menu-show': isOpen }"
    >
        <AfCloseModal modalName="company" />
        <div class="menu-reg-title">Регистрация компании</div>
        <div class="reg-about-top">
            <a href="#" class="reg-about-link">
                <AfInputUpload v-model="formData.companyAvatar" />
            </a>
            <div class="reg-about-inputs">
                <div class="reg-about-intop">
                    <AfInput
                            place="Название компании"
                            label="Название компании"
                            id="company_input"
                            v-model="formData.company_name"
                    />
                    <AfInput
                            place="ИНН компании"
                            label="ИНН компании"
                            id="inn_input"
                            v-model="formData.company_inn"
                    />
                    <AfInput
                            place="Адрес компании"
                            label="Россия, Владивосток"
                            id="address_input"
                            v-model="formData.company_address"
                    />
                </div>
            </div>
        </div>
        <div class="reg-about-subtitle">Контактная информация:</div>
        <div class="resume-grid cabinet">
            <AfInput
                    place="Почта"
                    label="Email"
                    type="email"
                    id="email_input"
                    v-model="formData.companyEmail"
                    :showCheckbox="true"
                    v-model:checkboxValue="formData.companyEmailAgree"
            />
            <AfInput
                    place="Телефон"
                    label="Номер телефона"
                    type="tel"
                    id="phone_input"
                    v-model="formData.companyPhone"
                    :showCheckbox="true"
                    v-model:checkboxValue="formData.companyPhoneAgree"
            />
            <AfInput
                    place="Ник в telegram"
                    label="Ник в telegram"
                    type="email"
                    id="telegram_input"
                    v-model="formData.companyTelegram"
                    :showCheckbox="true"
                    v-model:checkboxValue="formData.companyTelegramAgree"
            />
            <AfInput
                    place="Иванов"
                    label="Фамилия"
                    id="family_input"
                    v-model="formData.companyFamily"
            />
            <AfInput place="Иван" label="Имя" id="name_input" v-model="formData.company_name" />
            <AfInput
                    place="Иванович"
                    label="Отчество"
                    id="lastname_input"
                    v-model="formData.last_name"
            />
        </div>

        <div class="reg-sailor-inputs">
            <AfInputPassword v-model="formData.companyPassword" title="Укажите пароль" />
            <AfInputPassword
                    v-model="formData.confirm_password"
                    title="Подтвердите пароль"
            />
        </div>

        <div class="reg-sailor-end">
            <div class="resume-contact__second">
                <AfCheckbox v-model="formData.agreement" />
            </div>
            <AfGroupBtn @register="handleRegistration()" />
        </div>
    </div>
    <div
            :class="['header-overlay', { 'header-overlay__active': isOpen }]"
            @click="closeModal('company')"
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
//
    const formData = ref({
        email: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: "",
        patronymic: "",
        phone_number: "",
        company_name: "",
        company_inn: 0,
        company_address: "",
        telegram: "",
        notification_settings: {
            send_email: false,
            send_sms: false,
            send_telegram: false,
            mailing_notification: false,
        },
    });

    const isSameAsPassword = (value) => {
        return value === formData.value.password;
    };

    const rules = {
        email: { required, email },
        password: { required, minLength: minLength(1) },
        confirm_password: {
            required,
            sameAsPassword: {
                $validator: isSameAsPassword,
                $message: "Пароли должны совпадать",
            },
        },
        phone_number: { required },
        first_name: { required },
        last_name: { required },
        patronymic: { required },
        country: { required },
        region: { required },
        city: { required },
        telegram: { required },
    };

    const v$ = useVuelidate(rules, formData);

    watch(() => props.isOpen, watchScrollModal)

    const handleRegistration = () => {
        v$.value.$touch();
        if (!v$.value.$error) {
            signIn(dataToSubmit, "company");
            closeModal("seilor");
        } else {
            console.log("Validation errors:", v$.value.$errors);
        }
    };


</script>
