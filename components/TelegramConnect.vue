<template>
  <div class="tg-login-button-group">
    <div ref="telegram" id="tgRegButtonReal2"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useModalStore } from "@/store/modal";
import { useUsersStore } from "@/store/useUserStore";
import api from '@/api/api'

const { closeModal,openModal, toggleModal, openModalCommon } = useModalStore();
const userStore = useUsersStore();

const props = defineProps({
  mode: {
    type: String,
    required: true,
    validator(value: string) {
      return ['callback', 'redirect'].includes(value);
    },
    default: "callback"
  },
  telegramLogin: {
    type: String,
    required: true,
    validator(value: string) {
      return value.endsWith('bot') || value.endsWith('Bot');
    },
    default: "aflot_new_bot"
  },
  redirectUrl: {
    type: String,
    default: '',
  },
  requestAccess: {
    type: String,
    default: 'read',
    validator(value: string) {
      return ['read', 'write'].includes(value);
    },
  },
  size: {
    type: String,
    default: 'large',
    validator(value: string) {
      return ['small', 'medium', 'large'].includes(value);
    },
  },
  userpic: {
    type: String,
    default: 'true',
  },
  radius: {
    type: String,
  },
});

const emit = defineEmits(['callback']);

const onTelegramAuth =  async (user) => {

  try {
   const res1 = await api.post('/connect_telegram', {
     tg_id: String(user.id),
     email:JSON.parse(localStorage.getItem("global/user") || '{}')?.decemail,
   });

    console.log('Connect TG response:', res1.data);

     const res2 = await api.post('/telegram_message', {
      email:JSON.parse(localStorage.getItem("global/user") || '{}')?.decemail,
      type:"tg_connection"
    });

    console.log('user-----', user);
    emit('callback', user);
    userStore.setFormTG(user.id);
    window.location.reload()
  } catch (error) {
    openModal("telegramWarning")
    console.error('Telegram connecting failed:', error);
  }
};

const telegram = ref();

onMounted(() => {
  // create script with given params
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://telegram.org/js/telegram-widget.js?3';
  script.setAttribute('data-size', props.size);
  script.setAttribute('data-userpic', props.userpic);
  script.setAttribute('data-telegram-login', props.telegramLogin);
  script.setAttribute('data-request-access', props.requestAccess);
  if (props.radius) {
    script.setAttribute('data-radius', props.radius);
  }

  if (props.mode === 'callback') {
    window.onTelegramAuth = onTelegramAuth;
    script.setAttribute('data-onauth', 'window.onTelegramAuth(user)');
  } else {
    script.setAttribute('data-auth-url', props.redirectUrl);
  }

  telegram.value.appendChild(script);
});

const tgRegButtonRealclick = () => {
  $('#tgRegButtonReal2').click();
};
</script>

<style lang="scss" scoped>
.tg-login-button-group {
    position: absolute;
    width: 80%;
    bottom: 0px;
    left: 0px;
    z-index: 1;
    opacity: 1;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 80px;
    opacity: 0;
    border:10px solid red
}
</style>
