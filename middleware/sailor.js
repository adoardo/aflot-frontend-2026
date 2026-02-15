// middleware/sailer.js
import { useUsersStore, useUsersStoreRefs } from "~/store/useUserStore";

export default defineNuxtRouteMiddleware(
    async (to, from) =>  {
        if (process.client) {
            //const { refreshToken } = useUsersStore();
            const { user, isAuth } = useUsersStoreRefs();
            const token = localStorage.getItem('global/user'); 
            if (token && user.value.access_token) {
                //await refreshToken(user.value.access_token);

                if (user?.value.info.role !== "Моряк" || !isAuth.value) {
                    return navigateTo('/')
                }
            } else {
                return navigateTo('/')
            }
        }
    }
)
