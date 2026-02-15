<script setup>
import { useModalStoreRefs, useModalStore } from "~/store/modal";
const { closeModal, openModal } = useModalStore();
import { useRoute } from "vue-router";
import ModalMenu from "../components/global/ModalMenu.vue";
import ModalLk from "../components/global/ModalLk.vue";
import ModalRegSeilor from "./components/global/ModalRegSeilor.vue";
import ModalRegCompany from "./components/global/ModalRegCompany.vue";
import MenuAccountCompany from "./components/global/MenuAccountCompany.vue";
import MenuAccountSeilor from "./components/global/MenuAccountSeilor.vue";
import ModalAddExistingShip from "./components/global/ModalAddExistingShip.vue";
import ModalAddNewShip from "./components/global/ModalAddNewShip.vue";
import ModalShipInfo from "./components/global/ModalShipInfo.vue";
import ModalShipInfoDefault from "./components/global/ModalShipInfoDefault.vue";
import ModalErrorReporting from "./components/global/ModalErrorReporting.vue";
import ModalResponse from "./components/global/ModalResponse.vue";
import ModalSeilorRegLogin from "./components/global/ModalSailorRegLogin.vue";
import ModalAuthVerify from "./components/global/ModalAuthVerify.vue";
import ModalCommon from "./components/global/ModalCommon.vue";
import ModalSocWhoIs from "./components/global/ModalSocWhoIs.vue";
import ModalAfNotifications from "./components/global/ModalAfNotifications.vue";
import ModalApproveEmail from "./components/global/ModalApproveEmail.vue";
import ModalApproveTg from "./components/global/ModalApproveTg.vue";
import ModalApproveVk from "./components/global/ModalApproveVk.vue";
import ModalChangePassword from "./components/global/ModalChangePassword.vue";
import ModalCompanyVacancy from "./components/global/ModalCompanyVacancy.vue";
import ModalBlackList from "./components/global/ModalBlackList.vue";
import ModalTarifMessage from "./components/global/ModalTarifMessage.vue";
import ModalConfirmPasswordChange from "./components/global/ModalConfirmPasswordChange.vue";
import ModalConfirmEmail from  "./components/global/ModalConfirmEmail.vue";
import ContactUs from  "./components/global/ContactUs.vue";
import ModalConfirmChangedPassword from "./components/global/ModalConfirmChangedPassword.vue";
import ModalCreateVacancy from "./components/global/ModalCreateVacancy.vue";
import ModalChangeInfo from "./components/global/ModalChangeInfo.vue";
import ModalApproveTGDisconnect from "./components/global/ModalApproveTGDisconnect.vue";
import ModalReconnect from "./components/global/ModalReconnect.vue";



const route = useRoute();
const { modals } = useModalStoreRefs();
const { removeAllModals } = useModalStore();

watch(route, () => {
  removeAllModals();
});

import { useUsersStore } from "~/store/useUserStore";
const userStore = useUsersStore();
const { isAuth, user } = storeToRefs(userStore)

if (userStore.user.info.role === 'Компания') {
  userStore.getCompanyData()
}
// if (isAuth.value) {
//   userStore.refreshToken(user.refresh_token)
// }

if(isAuth.value) {
  const token = user.value.access_token
  new WebSocketService(`wss://апи.афлот.рф/wss/${token}`)
}
import {useGlobalSettings} from "~/store/useGlobalSettings";
const globalSettings = useGlobalSettings();
globalSettings.getJobs();
globalSettings.getShipTypes();
globalSettings.getContractDuration();
globalSettings.getRegionsRussia();
globalSettings.getSailorTariffs();
globalSettings.getCompanyTariffs();


const config = useAppConfig()
config.ui.primary = 'blue'
config.ui.gray = 'cool'

const nuxtApp = useNuxtApp();

nuxtApp.hook("page:start", () => {
  openModal("loader")
  //modals.loader = true;
});
nuxtApp.hook("page:finish", () => {
  closeModal("loader")
  //modals.loader = false;
});
</script>
<template>
  <transition name="fade">
    <div v-if="modals.loader" class="af-loader fixed left-0 top-0 h-0.5 w-full z-50">
      <div class="loader"></div>
      <p>Загрузка...</p>
    </div>
  </transition>
  <transition name="fade">
    <div v-if="modals.mailerloader" class="af-loader fixed left-0 top-0 h-0.5 w-full z-50">
      <div class="loader"></div>
            <p class="mt-3 text-gray-800 font-semibold text-lg">
        Рассылка выполняется...
      </p>
      <p class="mt-2 text-center text-sm text-red-600 max-w-[80%] leading-snug">
        ⚠️ Не закрывайте страницу, не обновляйте окно и не выключайте интернет.
        Процесс рассылки может быть прерван.
      </p>
    </div>
</transition>

  <NuxtPage />


  <ModalMenu v-show="modals.menu" :is-open="modals.menu" />
  <ModalLk v-show="modals.lk" :is-open="modals.lk" />
  <ModalRegSeilor v-show="modals.seilor" :is-open="modals.seilor" />
  <ModalRegCompany v-show="modals.company" :is-open="modals.company" />
  <MenuAccountCompany v-show="modals.authCompany" :is-open="modals.authCompany" />
  <MenuAccountSeilor v-show="modals.authCompany" :is-open="modals.authSeilor" />
  <ModalAddExistingShip v-show="modals.existingship" :is-open="modals.existingship" />
  <ModalAddNewShip v-if="modals.newship" :is-open="modals.newship" />
  <ModalShipInfo v-show="modals.shipinfo" :is-open="modals.shipinfo" />
  <ModalShipInfoDefault v-show="modals.shipinfodefault" :is-open="modals.shipinfodefault" />
  <ModalErrorReporting v-show="modals.errorReporting" :is-open="modals.errorReporting" />
  <ModalResponse v-show="modals.modalResponse" :is-open="modals.modalResponse" />
  <ModalSeilorRegLogin v-show="modals.modalSeilorRegLogin" :is-open="modals.modalSeilorRegLogin" />
  <ModalAuthVerify v-show="modals.modalAuthVerify" :is-open="modals.modalAuthVerify" />
  <ModalCommon v-show="modals.commonmodal" :is-open="modals.commonmodal" :msg="modals.commonmodalmsg" />
  <ModalSocWhoIs v-show="modals.msocwhois" :is-open="modals.msocwhois" :msg="modals.commonmodalmsg" />
  <ModalAfNotifications v-show="modals.afnotifications" :is-open="modals.afnotifications" :msg="modals.afnotificationsmsg" />
  <ModalApproveEmail v-show="modals.approveemail" :is-open="modals.approveemail" />
  <ModalApproveTg v-show="modals.approvetg" :is-open="modals.approvetg" />
  <ModalApproveVk v-show="modals.approvevk" :is-open="modals.approvevk" />
  <ModalChangePassword v-show="modals.changepassword" :is-open="modals.changepassword" />
  <ModalCompanyVacancy v-show="modals.companyvac" :is-open="modals.companyvac" :sailor-id="modals.sailorOfferId"/>
  <ModalBlackList v-show="modals.blacklist" :is-open="modals.blacklist" :sailor-id="modals.sailorOfferId"/>
  <ModalTarifMessage v-show="modals.tarifmessage" :is-open="modals.tarifmessage" :msg="modals.tarifmessagetext"/>
  <ModalConfirmPasswordChange v-if="modals.confirmpassword" :is-open="modals.confirmpassword"/>
  <ModalConfirmEmail v-if="modals.confirmemail" :is-open="modals.confirmemail"/>
  <ContactUs v-if="modals.contactus" :is-open="modals.contactus"/>
  <ModalConfirmChangedPassword v-if="modals.confirmingpassword" :isOpen = "modals.confirmingpassword"/>
  <ModalCreateVacancy v-if="modals.vacancySuccess" :isOpen = "modals.vacancySuccess"/>
  <ModalChangeInfo v-if="modals.changeinfo" :isOpen = "modals.changeinfo"/>
  <ModalApproveTGDisconnect v-if="modals.approveTGDisconnect" :is-open="modals.approveTGDisconnect" />
  <ModalReconnect v-if="modals.telegramWarning" :isOpen="modals.telegramWarning" />
</template>

<style lang="scss" scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
  transform: translateX(0);
  // opacity: 0;
}

.modal-enter,
.modal-leave-to {
  transform: translateX(1000%);
  // opacity: 1;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
