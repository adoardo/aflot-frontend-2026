import { defineStore } from 'pinia';
import api from '@/api/api'
import { useUsersStore } from "~/store/useUserStore"

export const useGuestsStore = defineStore('guests', {
  state: () => {
    return {
      guests: []
    };
  },
  actions: {
    async getNotifications() {
      const userStore = useUsersStore()
      const { user } = storeToRefs(userStore)
console.log('USER INFO:', user.value.info.id)
      const response = await api.get(`/notifications/${user.value.info.id}`)
      console.log('Guests: ', response.data);
      if(response.data.data) {
        this.guests = response.data.data.guests
      }
    },
  }
});

export const useGuestsStoreRefs = () => storeToRefs(useGuestsStore());