<template>
  <header class="header">
    <div class="container">
      <div class="header-block">
        <AfLogo type="blue"/>

        <div class="header-content">
          <AfSearch ref="searchRef" type = "blue"/>
          <div class="header-content-right">
            <div class="relative" @click.stop>
              <button
                v-if="isAuth"
                @click.stop="toggleDropdown"
                style="padding: 0;"
                class="relative header-notif"
              >
                <img src="assets/img/header/red-notif.svg" alt="image" />
                <span
                  v-if="guests.guests.length > 0"
                  class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {{ guests.guests.length }}
                </span>
              </button>

              <Notification
                :data="guests.guests"
                style="max-height: 200px; overflow: scroll;"
                v-if="isDropdownOpen"
                ref="dropdown"
                class="absolute right-0 mt-2 w-64 bg-white shadow-lg p-3"
                @close="isDropdownOpen = false"
              />
            </div>
          </div>

          <a v-show="!isAuth" class="header-lk" @click="toggleModal('lk'); userStore.resetSocialsAuth()">
            <i class="fa fa-user-o header-lk__icon"></i>
            <div class="header-lk__text">личный кабинет</div>
          </a>

          <a v-show="isAuth && userInfo.info.role == 'Моряк'" class="header-lk" @click="toggleModal('authSeilor')">
            <i class="fa fa-user-o header-lk__icon"></i>
            <div class="ed-user-role-head">
              <div class="eurh-fio">{{ userInfo.info.last_name }} {{ userInfo.info.first_name }}</div>
              <div class="header-lk__text">{{ userInfo.info.role }}</div>
            </div>
          </a>
          <a v-show="isAuth && userInfo.info.role == 'Компания'" class="header-lk" @click="toggleModal('authCompany')">
            <i class="fa fa-user-o header-lk__icon"></i>
            <div class="ed-user-role-head">
              <div class="eurh-fio">{{ userInfo.info.last_name }} {{ userInfo.info.first_name }}</div>
              <div class="header-lk__text">{{ userInfo.info.role }}</div>
            </div>
          </a>

          <div id="mobile" class="mobile mobile-color" @click="toggleModal('menu')">
            <span class="mobile-line"> </span>

            <div class="mobile-text">меню</div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import AfLogo from "@/components/uikit/AfLogo";
import AfSearch from "@/components/AfSearch";
import {useModalStore} from "~/store/modal";
import {useUsersStore} from "~/store/useUserStore";

import {useGuestsStore} from "~/store/useGuestsStore";
const searchRef = ref(null);
//import Swal from 'sweetalert2'
import api from '@/api/api'

const isVisible = ref(true);
const guests = useGuestsStore()
import Notification from "~/components/list/helpers/Notification.vue";
import {onMounted, onUnmounted, ref} from "vue";

const isDropdownOpen = ref(false)
const dropdown = ref(null)

const toggleDropdown = () => {
    if (searchRef.value && typeof searchRef.value.close === "function") {
    searchRef.value.close();
  }

  isDropdownOpen.value = !isDropdownOpen.value;
}

const {toggleModal} = useModalStore();

const userStore = useUsersStore();
const {userInfo, isAuth} = storeToRefs(userStore)

onMounted(() => {
  guests.getNotifications();
  if (WebSocketService.instance) {
    WebSocketService.instance.addListener('message', (event) => {
      const data = JSON.parse(event)
      guests.getNotifications();

      console.log(data)
      //Swal.fire({
      //  text: `${data.notification.message.name} посетил вас`,
      //  toast: true,
      //  position: "top-end",
      //  showConfirmButton: false,
      //  timer: 5000,
      //  timerProgressBar: true,
      //  didOpen: (toast) => {
      //    toast.style.display = 'flex'
      //    toast.style.alignItems = 'center'
      //    toast.style.height = "25px"
      //    toast.style.padding = "1px"
      //    toast.style.justifyContent = 'center'
      //    toast.style.backgroundColor = '#bebebe'
      //    toast.style.width = 'max-content'
      //  }
      //});
    })
  }
});

onUnmounted(() => {
  if (WebSocketService.instance) {
    WebSocketService.instance.removeListener('message')
  }
})

</script>

<style lang="scss" scoped>
.header-lk__text {
  color: #3b45a9;
}

.header-lk__icon {
  color: #9c291b;
}

.notif-close {
  cursor: pointer;
  transition: 0.2s;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notif-close:hover {
  background: #f2f2ff;
}
.header-notif{
 filter: brightness(100%);
 span{
  color:white;
  filter: brightness(100%);
 }
}
.color_header_closer{
  position: absolute;
  right: -10px;
  top: -10px;

}
</style>
