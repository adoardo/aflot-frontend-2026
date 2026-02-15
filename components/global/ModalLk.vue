<template>
  <div id="menu-reg" :class="['menu-reg menu-none', { 'menu-show': isOpen }]">
    <div class="header-close menu-close-gray menu-close-reg" @click="toggleModalLk">
      <span class="header-close__icon"></span>
      <div class="header-close__text" @click="closeModal('lk')">закрыть</div>
    </div>
    <div class="menu-reg-title">Вход или Регистрация</div>
    <form class="menu-reg-form" @submit.prevent="onSubmit">
      <AfInput
        label="Номер телефона или адрес электронной почты, или ИНН"
        id="login_input"
        v-model="formData.username"
        class="menu-reg-label"
        classInput="menu-reg-input"
      />
      <AfInputPassword
        class="menu-reg-label"
        v-model="formData.password"
        title="Пароль"
      />
    <a  @click = "openModalForPswrd" class="menu-reg-link">Забыли пароль?</a>
      <button type="submit" class="menu-reg-button" @click="onSubmit">
        Войти <span>→</span>
      </button>
    </form>
    <div class="reg-buttons">
      <button class="reg-button">
        <img src="assets/img/menu/vk.svg" alt="image" class="reg-button-img" />
        <span class="reg-button-text">Войти под аккаунтом Вконтакте</span>
      </button>
      <div id="vkAuthButton"></div>
      <div v-if="false" id="VkIdSdkOneTap">
        <a href="https://oauth.vk.com/authorize?client_id=52316632&scope=friends,offline&redirect_uri=https://xn--e1aybc.xn--80awjqh.xn--p1ai&display=page&v=5.199&response_type=token">
          <button class="button is-primary">Авторизоваться</button>
        </a>
      </div>
        <ClientOnly>
          <TelegramLogin v-if="isOpen"/>
        </ClientOnly>

      <button class="reg-button" id="tgRegButton">
        <img src="assets/img/menu/telegram.svg" alt="image" class="reg-button-img" />
        <span class="reg-button-text">Войти под аккаунтом Telegram</span>
      </button>

    </div>

    <div class="reg-text-gray">или</div>

    <div class="reg-end">
      <button class="reg-end-button reg-end-red" @click="toggleModalLk('company')">
        Регистрация КОМПАНИЯ <span>→</span>
      </button>

      <button class="reg-end-button reg-end-blue" @click="toggleModalLk('seilor')">
        Регистрация МОРЯК <span>→</span>
      </button>
    </div>
  </div>
  <div
    :class="['header-overlay', { 'header-overlay__active': isOpen }]"
    @click="closeModal('lk')"
  ></div>
</template>

<script setup>
import { useModalStoreRefs, useModalStore } from "~/store/modal";
const { modals } = useModalStoreRefs();
import { useUsersStore } from "~/store/useUserStore";
import { ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import AfInput from "../uikit/AfInput.vue";
import AfInputPassword from "../uikit/AfInputPassword.vue";

import TelegramLogin from '../TelegramLogin.vue'

import * as VKID from '@vkid/sdk';

import axios from 'axios'

import api from '@/api/api'

import watchScrollModal from "~/utils/watchScrollModal";

const { closeModal, toggleModal, openModalCommon, openModal } = useModalStore();
const userStore = useUsersStore();
const {userInfo, isTg} = storeToRefs(userStore)
const props = defineProps({
  isOpen: {
    type: Boolean,
  },
  users: []
});

const formData = ref({
  username: "",
  password: "",
});

const rules = {
  username: { required },
  password: { required, minLength: minLength(8) },
};

const v$ = useVuelidate(rules, formData);

watch(() => props.isOpen, watchScrollModal)

async function toggleModalLk(modalName) {
  closeModal("lk");
  toggleModal(modalName);
}

const handleVKError = async (error) => {
  console.log('va error:', error);
}
const openModalForPswrd = () => {
  closeModal("lk");
  openModal("changepassword");
}
onMounted(() => {
  VKID.Config.init({
    app: 52316632, // Идентификатор приложения.
    //redirectUrl: 'https://xn--e1aybc.xn--80awjqh.xn--p1ai', // TEST Адрес для перехода после авторизации.
    redirectUrl: 'https://xn--b1add.xn--80awjqh.xn--p1ai', // DEV Адрес для перехода после авторизации.
    //redirectUrl: 'https://xn--2-ctbfe.xn--80awjqh.xn--p1ai', // DEV2 Адрес для перехода после авторизации.
    state: 'dj29fnsadjsd82', // Произвольная строка состояния приложения.
    codeVerifier: 'FGH767Gd65', // Верификатор в виде случайной строки. Обеспечивает защиту передаваемых данных.
    scope: 'email phone', // Список прав доступа, которые нужны приложению.
    mode: VKID.ConfigAuthMode.Redirect // По умолчанию авторизация открывается в новой вкладке.
  });
  // Создание экземпляра кнопки.
  const oneTap = new VKID.OneTap();

// Получение контейнера из разметки.
  const container = document.getElementById('vkAuthButton');

// Проверка наличия кнопки в разметке.
  if (container) {
    // Отрисовка кнопки в контейнере с именем приложения APP_NAME, светлой темой и на русском языке.
    oneTap.render({ container: container, scheme: VKID.Scheme.LIGHT, lang: VKID.Languages.RUS })
            .on(VKID.WidgetEvents.ERROR, handleVKError); // handleError — какой-либо обработчик ошибки.
  }

  let params = [];
  let res = [];
  let s = window.location.href.split('?')
  if (s.length > 1 && s[1] !== '') {
    params = s[1];
    params = params.split('&');
    params.forEach( el => {
      let val = el.split('=')
      if (val.length < 2) res[val[0]] = ''
      else res[val[0]] = val[1]
    })
  }

  if (res['code'] && res['device_id']) {
    let token = '';
    let userData = {};
    VKID.Auth.exchangeCode(res['code'], res['device_id']).then(function(res) {
      token = res.access_token;
      console.log('vk user sdk token:', res.access_token);
      VKID.Auth.userInfo(token).then(function(res) {

        userData = res;
        let id = res.user.user_id;
        userStore.setFormVK(id);


        api.get("/vkuser?vk_id="+id).then((data) => {
          console.log('vk login', data);
          if (data.data.data == 0) {
            toggleModal('msocwhois')
          } else {
            let dataToSubmit = {
              username: id,
              password: 'TsQ7@66a_'+id
            }
            userStore.login(dataToSubmit, "user");

            if (userStore.authError !== false) {
              openModalCommon(userStore.authError);
            } else {
              setTimeout(() => {
                if (userStore.user.info.role === 'Компания') {
                  userStore.getCompanyData()
                }
              }, 1500)

              closeModal("lk");
              //openModal("loader");
              //window.location.href = '/';
            }
          }
        });
      });
    });

  }


});

const sanitizePhoneNumber = (value) => {
  if (!value) return "";
  return String(value).replace(/\D/g, "");
};

const onSubmit = async () => {
  v$.value.$touch();

  if (!v$.value.$error) {
    if (/^\+?\d[\d\s\-\(\)]*$/.test(formData.value.username) && !formData.value.username.includes('@')) {
      formData.value.username = sanitizePhoneNumber(formData.value.username);
    }

    try {
      // Wait for login to complete
      await userStore.login(formData.value);
      
      // After login attempt, check if there was an error
      if (userStore.authError) {
        // If there's an error, show the error modal
        openModalCommon(userStore.authError);
      } else {
        // If login is successful, process further (e.g., role check)
        if (userStore.user.info.role === 'Компания') {
          await userStore.getCompanyData();
        }
        
        closeModal("lk");
        //openModal("loader");
        //window.location.href = '/';
      }
    } catch (error) {
      console.error("Login error:", error);
      // Optionally, show a generic error message if an error occurs
      openModalCommon('An unexpected error occurred during login.');
    }
  } else {
    console.log("Validation errors:", v$.value.$errors);
  }
};



</script>

<style lang="scss" scoped>
  .reg-buttons {
    position: relative;
  }
  #vkAuthButton {
    width: 100%;
    position: absolute;
    top: 0px;
    z-index: 1;
    opacity: 0;
  }
</style>
