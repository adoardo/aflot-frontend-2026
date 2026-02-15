<template>
  <div
      class="menu-reg menu-none menu-reg-sailor cabinet"
      id="reg-sailor-lk"
      :class="['menu-reg menu-none', { 'menu-show': isOpen }]"
  >
    <div class="menu-lk-top">
      <div class="menu-lk-title">Личный кабинет</div>
      <div
          class="header-close menu-close-gray close-lk-sailor"
          @click="closeModal('authSeilor')"
      >
        <span class="header-close__icon"></span>
        <div class="header-close__text" id="close-reg-sailor">закрыть</div>
      </div>
    </div>

    <div class="menu-lk-content">
      <div class="ed-lk-fn-ln">
        {{ userInfo.info.last_name.substring(0, 1).toUpperCase() }} {{ userInfo.info.first_name.substring(0, 1).toUpperCase() }}
      </div>
      <div class="menu-lk-info">
        <div class="menu-lk-subtitle">{{ userInfo.info.email }}</div>
      </div>
    </div>

    <div class="menu-lk-part">
      <NuxtLink :to="item.link" class="menu-lk-link" v-for="item in MenuSeilorUser">
        <img :src="'/img/menu/' + item.icon" alt="image" class="menu-lk-icon" />
        <span class="menu-lk-ltext">{{ item.name }}</span>
      </NuxtLink>
      <a @click="closeModal('authSeilor');logoutMethod()" aria-current="page" href="#" class="router-link-active router-link-exact-active menu-lk-link">
        <img src="/img/menu/lk-about-10.svg"
             alt="image"
             class="menu-lk-icon">
        <span class="menu-lk-ltext">Выйти</span></a>
    </div>
  </div>
  <div
      :class="['header-overlay', { 'header-overlay__active': isOpen }]"
      @click="closeModal('authSeilor')"
  ></div>
</template>

<script setup>
import {useModalStore} from "~/store/modal";


import {MenuSeilorUser} from "~/consts/MenuSeilorUser";

const {closeModal, toggleModal} = useModalStore();
import {useUsersStore} from "~/store/useUserStore";

import watchScrollModal from "~/utils/watchScrollModal";

const userStore = useUsersStore();
const {userInfo} = storeToRefs(userStore)
watch(userInfo, () => {

});


const logoutMethod = async () => {
  userStore.logout();
  window.Telegram.WebApp.close();
  await navigateTo('/');
}

const props = defineProps({
  isOpen: {
    type: Boolean,
  },
});

watch(() => props.isOpen, watchScrollModal)
</script>

<style lang="scss" scoped>
.ed-lk-fn-ln {
  background: #3B45A9;
  border-radius: 50%;
  width: 76px;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 37px;
  letter-spacing: -2px;
  color: #fff;
}
</style>