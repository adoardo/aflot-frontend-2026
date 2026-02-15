import {defineStore} from 'pinia';
import api from '@/api/api'
import { useGuestsStore } from "~/store/useGuestsStore";

export const useUsersStore = defineStore('global/user', {
    state: () => ({
        user: {
            info: {
                first_name: '',
                last_name: '',
                email: '',
                is_verified : false
            }
        },
        userProfileId: '',
        authErrorMsg: false,
        authenticated: false,
        loading: false,
        token: false,
        userdata: {},
        encemail: false,
        decemail: false,
        socialsAuth: {
            telegram_id: '',
            vk_id: '',
            is_vk: false,
            is_tg: false,
        },
        authRole: 'user'
    }),
    actions: {
        async setAuthRole(role) {
          if (role == 'seilor') {
            this.authRole = 'user'
          } else {
            this.authRole = 'company'
          }
        },
        async getCompanyData() {
            try {
                await api.get("/company/profile").then((data) => {
                    this.userdata = data.data;
                });
            } catch (e) {

            }
        },
        async  clearAuthError() {
            this.authErrorMsg = null;
          },
        async signIn(user, type) {

            const result = {
                user: false,
                state: true
            }

            try {
                const {data} = await api.post('/register/' + this.authRole, user);
                this.userdata = data;
                this.authErrorMsg = false;

                this.login(user, this.authRole);

                return data;
            } catch (error) {
                if (error.response) {
                    this.authErrorMsg = error.response.data.detail
                }

                console.log(error);
                return error
            }
        },
        async logoutAndAutoLogin(newEmail, password) {
           try {
               // 1. LOGOUT CURRENT USER
               this.logout();
       
               // 2. AUTO LOGIN WITH NEW EMAIL + OLD PASSWORD
               const form = new URLSearchParams();
               form.append("username", newEmail);
               form.append("password", password);
       
               const { data } = await api.post('/token', form, {
                   headers: { "Content-Type": "application/x-www-form-urlencoded" }
               });
       
               // 3. SAVE NEW USER
               this.setUser(data);
       
               // 4. SAVE ENCODED EMAIL
               this.encemail = btoa(data.info.email);
               this.decemail = atob(this.encemail);
       
               // 5. REDIRECT
               window.location.href = "/";
       
           } catch (e) {
               console.error("Auto login failed:", e);
               window.location.reload();
           }
       },
        async setUser(data) {
            this.user = data;
            this.authenticated = true;

            this.userProfileId = '';

            try {
                const {data} = await api.get('/user_profile_id?id='+this.user.info.id)
                console.log('user profile id: ', data);

                this.userProfileId = data
            } catch (error) {
                console.log(error);
            }

        },
        async login(user) {
            try {
                await api.post('/token', user, {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then((data) => {
                    this.authErrorMsg = false;
                    console.log('login data', data.data)
                    this.setUser(data.data)
                    const token = data.data.access_token
                    if(WebSocketService.instance) {
                        WebSocketService.instance.refreshConnection(`wss://апи.афлот.рф/wss/${token}`)
                    } else {
                        new WebSocketService(`wss://апи.афлот.рф/wss/${token}`)
                    }

                    const guests = useGuestsStore();
                    guests.getNotifications();

                    this.encemail = btoa(data.data.info.email)
                    this.decemail = atob(this.encemail)
                    return true;
                })

            } catch (error) {
                if (error.response && error.response.data) {
                    let ev = error.response.data.detail;
                    ev = ev.replace("200:", "");
                    ev = ev.replace("401:", "");
                    this.authErrorMsg = ev;
                }
                console.log(error);
                return error
            }
        },  
        async logout() {
            this.user = {
                info: {
                    first_name: '',
                    last_name: '',
                    email: ''
                }
            };
            this.authenticated = false;
            this.userdata = {};
            this.token = false;
            window.location.href = '/';
        },
        async refreshToken(token) {
            //console.log('store', token.user)
            try {
                const {data} = await api.post('/refresh_token', token)
                this.user = data
                if(WebSocketService.instance) {
                    WebSocketService.instance.refreshConnection(`wss://апи.афлот.рф/wss/${data.access_token}`)
                } else {
                    new WebSocketService(`wss://апи.афлот.рф/wss/${data.access_token}`)
                }
            } catch (error) {
                this.logout()
                console.log(error);
            }
        },
        async resetSocialsAuth() {
            this.socialsAuth = {
                telegram_id: '',
                vk_id: '',
                is_vk: false,
                is_tg: false,
            }
        },
        async setFormVK(id) {
            this.socialsAuth.is_vk = true;
            this.socialsAuth.vk_id = id;
        },
        async setFormTG(id) {
            this.socialsAuth.is_tg = true;
            this.socialsAuth.telegram_id = id;
        },
        async setCEmail(hash) {
            this.CEmail = hash
        },
        async isSoc() {
            if (this.socialsAuth.is_tg || this.socialsAuth.is_vk) {
                return true;
            } else {
                return false;
            }
        },
        async getSocData() {
            return this.socialsAuth;
        },
        // async isVk() {
        //   return this.socialsAuth.is_vk
        // },
        // async isTg() {
        //   return this.socialsAuth.is_tg
        // }
    },
    persist: {
        storage: persistedState.localStorage,
    },
    getters: {
        authError: (state) => state.authErrorMsg,
        userAuth: (state) => state.user,
        userInfo: (state) => state.user,
        userData: (state) => state.userdata,
        isAuth: (state) => state.authenticated,
        isVk: (state) => {
            return state.socialsAuth.is_vk
        },
        isTg: (state) => {
            return state.socialsAuth.is_tg
        },
    }


});

export const useUsersStoreRefs = () => storeToRefs(useUsersStore());
