// middleware/auth.js
import { useUsersStore, useUsersStoreRefs } from "~/store/useUserStore";

export default function ({ store, redirect }) {
  if (process.client) {
    console.log('i am middleware')
    const { refreshToken } = useUsersStore();
    const { user } = useUsersStoreRefs();
    const token = localStorage.getItem('global/user'); 
    if (token) {
      try {
        console.log('Refresh token:', token);
        refreshToken(user.value.access_token);
      } catch (error) {
        console.error('Failed to refresh token:', error);
        redirect('/login');
      }
    }
  }
}
