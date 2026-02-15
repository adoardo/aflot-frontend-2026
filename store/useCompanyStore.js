import { defineStore } from 'pinia';
import api from '@/api/api'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    company: {}
  }),
  actions: {
    async getVacansies() {
      const response = await api.get('vacancies')
      console.log(response)
    }
  },


});

export const useCompanyStoreRefs = () => storeToRefs(useCompanyStore());
