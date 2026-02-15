<template>
  <div class="mor-notif" :class="{ 'menu-show': isOpen }" id="aflot-new-notification-modal">
    <div class="mor-notif__block">
      <img src="assets/img/mor/icon-3.png" alt="icon" class="mor-notif__img">
      <div class="mor-notif__info">
        <div class="mor-notif__text">{{msg.title}}</div>
        <div class="mor-notif__title">{{msg.desc}}</div>
      </div>
    </div>
  </div>
</template>
<script setup>

import watchScrollModal from "~/utils/watchScrollModal";


const props = defineProps({
  isOpen: {
    type: Boolean,
  },
  msg: {
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    }
  }
});

watch(() => props.isOpen, watchScrollModal)

</script>

<style lang="scss" scoped>
#aflot-new-notification-modal {
  transition: .5s;
  opacity: 0;
}
  #aflot-new-notification-modal.menu-show {
    display: block;
    opacity: 1;
  }
</style>