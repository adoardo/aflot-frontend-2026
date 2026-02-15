<template>
  <div :class="['header-menu', { show: isOpen }]" id="menu">
    <div class="header-close" @click="closeModal('menu')">
      <span class="header-close__icon"></span>
      <div class="header-close__text">закрыть</div>
    </div>

    <div class="header-menu__info">
      <div class="header-menu__content">
        <div class="header-menu__first">
          <div class="header-menu__title">Другие страницы:</div>
          <ul class="header-menu__nav">
            <li v-for="(navItem, i) in menu" :key="'nav-item-link-' + i">
              <NuxtLink :to="navItem.link">{{ navItem.name }}</NuxtLink>
            </li>
          </ul>
        </div>
        <div class="header-menu__end">
          <ul class="header-menu__dopnav">
            <li v-for="item in MenuSea">
              <NuxtLink :to="item.link">{{ removeBrTags(item.name) }}</NuxtLink>
            </li>
          </ul>
      <button class="header-menu__button"  @click="openContactUs">
            Написать нам
            <span> → </span>
          </button>
        </div>
      </div>

      <div class="header-menu__dop">
        <div class="header-menu__copy">2024, «Афлот» - Все права защищены</div>
        <div class="header-menu__social">
          <div class="header-menu__doptext">Мы в соц. сетях:</div>
          <div class="header-menu__icons">
            <div><img src="assets/img/header/telegram.svg" alt="image" /></div>
            <a href="#"><img src="assets/img/header/vk.svg" alt="image" /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    :class="['header-overlay', { 'header-overlay__active': isOpen }]"
    @click="closeModal('menu')"
  ></div>
</template>

<script setup>
import { useModalStore } from "~/store/modal";
import { menu, MenuSea } from "~/consts/MenuConsts";
import watchScrollModal from "~/utils/watchScrollModal";
import api from "@/api/api";
const { closeModal,openModal } = useModalStore();

const props = defineProps({
  isOpen: {
    type: Boolean,
  },
});

watch(() => props.isOpen, watchScrollModal)

function removeBrTags(text) {
  return text.replace(/<br\s*\/?>/g, "");
}
function openContactUs() {
  closeModal('menu');
  openModal('contactus'); 
}
</script>
