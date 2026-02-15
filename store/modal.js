import { defineStore, storeToRefs } from 'pinia';

export const useModalStore = defineStore('global/modal', {
  state: () => ({
    modals: {
      lk: false,
      menu: false,
      company: false,
      seilor: false,
      authCompany: false,
      authSeilor: false,
      existingship: false,
      newship: false,
      shipinfo: false,
      errorReporting: false,
      modalResponse: false,
      approveemail: false,
      approvetg: false,
      approvevk: false,
      changepassword: false,
      modalSeilorRegLogin: false,
      modalAuthVerify: false,
      commonmodal: false,
      commonmodalmsg: '',
      contactus:false,
      confirmpassword: false,
      msocwhois: false,
      shipinfodefault: false,
      afnotifications: false,
      confirmemail:false,
      confirmingpassword:false,
      vacancySuccess:false,
      afnotificationsmsg: {
        title: '',
        desc: ''
      },
      companyvac: false,
      sailorOfferId: '',
      sailorOfferCompanyId: '',
      blacklist: false,
      loader: true,
      mailerloader: false,
      tarifmessage: false,
      tarifmessagetext: "",
      changeinfo: false,
      approveTGDisconnect:false,
      telegramWarning:false,
      changeinfoProps: {
        changeType: "changeTG"
      }
    },
  }),

  actions: {
    toggleModal(modalName) {
      if (this.modals.hasOwnProperty(modalName)) {
        this.modals[modalName] = !this.modals[modalName];
      }
    },

    closeModal(modalName) {
      if (this.modals.hasOwnProperty(modalName)) {
        this.modals[modalName] = false;
      }
    },

    openModal(modalName) {
      if (this.modals.hasOwnProperty(modalName)) {
        this.modals[modalName] = true;
      }
    },

    openOfferModal(modalName, sailorId) {
      if (this.modals.hasOwnProperty(modalName)) {
        this.modals[modalName] = true;
      }
      this.modals.sailorOfferId = sailorId;
    },

    openTarifModal(modalName, msg) {
      if (this.modals.hasOwnProperty(modalName)) {
        this.modals[modalName] = true;
      }
      this.modals.tarifmessagetext = msg;
    },

    openBLModal(modalName, sailorId) {
      if (this.modals.hasOwnProperty(modalName)) {
        this.modals[modalName] = true;
      }
      this.modals.sailorOfferId = sailorId;
    },

    openModalCommon(msg) {
      if (msg) {
        this.modals.commonmodalmsg = msg.replace(/^200:|^401:/, "");
        this.modals.commonmodal = true;
      }
    },

    openModalAfNotifications(title, desc) {
      this.modals.afnotificationsmsg = {
        title,
        desc,
      };
      this.modals.afnotifications = true;
    },

    removeAllModals() {
      Object.keys(this.modals).forEach((key) => {
        this.modals[key] = false;
      });
    },

    // ⭐ ADD NEW METHOD FOR CHANGEINFO
    openChangeInfoModal(changeType) {
      this.modals.changeinfoProps = { changeType };
      this.modals.changeinfo = true;
    }
  },

  getters: {
    getCurrentSailorId: (state) => state.modals.sailorOfferId,
  },
});

export const useModalStoreRefs = () => storeToRefs(useModalStore());
