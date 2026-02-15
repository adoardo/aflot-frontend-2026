<template>
  <div
      class="menu-reg menu-none menu-reg-sailor cabinet"
      id="reg-about-lk"
      :class="['menu-reg menu-none', { 'menu-show': isOpen }]"
  >
    <div class="menu-lk-top">
      <div class="menu-lk-title">Личный кабинет</div>
      <div class="header-close menu-close-gray close-lk-about"  @click="closeModal('authCompany')">
        <span class="header-close__icon"></span>
        <div
            class="header-close__text"
            id="close-reg-sailor"
           
        >
          закрыть
        </div>
      </div>
    </div>

    <div class="menu-lk-content">
      <div class="company-menu-avatar">
        <img v-if="userData.photo_path" :src="userData.photo_path" alt="image" class="menu-lk-img" />
        <div v-else class="bordered bordered-ct-logo">
          <img class="avatar-company" id="imgInpPreview" src="assets/img/header/logo-white.png" alt="avatar"/>
          <span id="photo_path_change_inp">{{ userData.first_name }}<br>{{
              userData.last_name
            }}</span>
          <text>&#9875;</text>
        </div>
      </div>

      <div class="menu-lk-info">
        <div class="menu-lk-subtitle">{{ userData.company_name }}</div>

        <div class="menu-lk-cont">
          <div class="menu-lk-item">
            <div class="menu-lk-gray">Создать:</div>

            <div class="menu-lk-blue">Вакансий: {{ userData.available_vacancies }}</div>

            <!-- <a href="/tarif" class="menu-lk-red">Пополнить</a> -->
          </div>

          <div class="menu-lk-item">
            <div class="menu-lk-gray">Отправить:</div>

            <div class="menu-lk-blue">Предложений: {{ userData.available_offers }}</div>

            <!-- <a href="/tarif" class="menu-lk-red">Пополнить</a> -->
          </div>
        </div>
      </div>
    </div>

    <div class="menu-lk-part">
      <NuxtLink
          v-for="(item, i) in MenuCompany"
          :key="'item-link-' + i"
          :to="item.link"
          class="menu-lk-link"
          :class="{ submenu: item.type === 'submenu' }"
      >
        <img :src="'/img/menu/' + item.icon" alt="image" class="menu-lk-icon"  />
        <span class="menu-lk-ltext">{{ item.name }}</span>
      </NuxtLink>
      <a @click="closeModal('authCompany');logoutMethod()" aria-current="page" href="#" class="router-link-active router-link-exact-active menu-lk-link">
        <img src="/img/menu/lk-about-10.svg"
             alt="image"
             class="menu-lk-icon">
        <span class="menu-lk-ltext">Выйти</span></a>
    </div>
  </div>
  <div
      :class="['header-overlay', { 'header-overlay__active': isOpen }]"
      @click="closeModal('authCompany')"
  ></div>
</template>

<script setup>
import { useModalStore } from "~/store/modal";
import { useUsersStoreRefs } from "~/store/useUserStore";
import { MenuCompany } from "~/consts/MenuConsts";
import watchScrollModal from "~/utils/watchScrollModal";

const { user } = useUsersStoreRefs();
const { toggleModal, closeModal } = useModalStore();
import { useUsersStore } from "~/store/useUserStore";
import api from "~/api/api.js";

const userStore = useUsersStore();
const { userInfo, userData } = storeToRefs(userStore)
watch(userInfo, () => {

});


const logoutMethod = async () => {
  userStore.logout();
  window.Telegram.WebApp.close();
}

const props = defineProps({
  isOpen: {
    type: Boolean,
  },
});

watch(() => props.isOpen, watchScrollModal)

</script>

<style lang="scss" scoped>
  .bordered-ct-logo {
    border: solid 1px #d5d7ef;
    border-radius: 50%;
    background: #3b45a9;
    width: 80px;
    height: 80px;
    overflow: hidden;
    position: relative;
  }
  .bordered.bordered-ct-logo img {
    position: absolute;
    top: 8px;
    display: flex;
    width: 52%;
    left: calc(50% - 20px);
    height: auto;
    opacity: 0.8;
  }
  .bordered.bordered-ct-logo span {
    text-transform: uppercase;
    display: flex;
    color: #fff;
    text-align: center;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 12px;
    border-radius: 50%;
    overflow: hidden;
  }
  .bordered.bordered-ct-logo text {
    position: absolute;
    bottom: 0px;
    left: calc(50% - 14px);
    font-size: 20px;
    filter: grayscale(1) brightness(2);
    opacity: 0.4;
  }
</style>