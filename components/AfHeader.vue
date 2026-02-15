<template>
  <header class="header header-index" :class="{ 'fp-viewing-2': activeSection === 2 }" @click="hideFilters">
    <div class="container">
      <div class="header-block">
        <AfLogo/>

        <div class="header-content">
          <AfSearch ref="searchRef" />
          <div class="header-content-right">
            <div class="relative" @click.stop>
              <button
                v-if="isAuth"
                @click="toggleDropdown"
                style="padding: 0;"
                class="relative header-notif"
              >
                <img src="assets/img/header/red-notif.svg" alt="image">
                <span
                  v-if="guests.guests.length > 0"
                  class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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
            <a v-show="isAuth && userInfo.info.role == 'Компания'" class="header-lk"
               @click="toggleModal('authCompany')">
              <i class="fa fa-user-o header-lk__icon"></i>
              <div class="ed-user-role-head">
                <div class="eurh-fio">{{ userInfo.info.last_name }} {{ userInfo.info.first_name }}</div>
                <div class="header-lk__text">{{ userInfo.info.role }}</div>
              </div>
            </a>

            <div id="mobile" class="mobile" @click="toggleModal('menu')">
              <span class="mobile-line"> </span>
              <div class="mobile-text">меню</div>
            </div>
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
import {ref} from "vue"
import {storeToRefs} from 'pinia';
import {useGuestsStore} from "~/store/useGuestsStore"
const searchRef = ref(null);
//import Swal from 'sweetalert2';
import Notification from "~/components/list/helpers/Notification.vue";
import {onMounted, onUnmounted, nextTick} from "vue";

const guests = useGuestsStore();

const isDropdownOpen = ref(false)
const dropdown = ref(null)

const toggleDropdown = () => {
    if (searchRef.value && typeof searchRef.value.close === "function") {
    searchRef.value.close();
  }

  isDropdownOpen.value = !isDropdownOpen.value;
};

const {toggleModal} = useModalStore();

const userStore = useUsersStore();
const {userInfo, isAuth, userProfileId} = storeToRefs(userStore)

onMounted(() => {
  if (isAuth.value) {
    guests.getNotifications();
  }
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
.ed-user-role-head {
  color: #fff;

  .header-lk__text {
    font-size: 12px;
    opacity: .5;
    padding-left: 16px;
    position: relative;

    &:before {
      position: absolute;
      left: 2px;
      top: 6px;
      background: #3dff3d;
      border-radius: 50%;
      width: 8px;
      height: 8px;
      display: flex;
      content: "";
    }
  }

}

.header-search__text {
  width: 100px;
  display: flex;
  gap: 5px;
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

.notif_close{
  cursor: pointer;
  transition: 0.2s;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -10px;
  right: -15px;
}

@media screen and (max-width: 1300px) {
  .header-content {
    width: 70vw;
  }
}
.header-content-right {
  display: flex;
  grid-gap: 54px;
  justify-content: space-between;
}
.menu-close-gray {
    flex-direction: row-reverse;
    grid-gap: 11px;
    position: absolute;
    top: 0px;
    right: 0px;
}
</style>