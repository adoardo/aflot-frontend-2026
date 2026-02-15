import { defineStore } from 'pinia';
import api from '@/api/api'

export const useGlobalStore = defineStore('global', {
  state: () => ({
     activeSection: 0,
  }),
  actions: {
    setActiveSection(section) {
      this.activeSection = section;
    },
  }

});

export const useGlobalStoreRefs = () => storeToRefs(useGlobalStore());
