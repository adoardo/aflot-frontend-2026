// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@nuxt/ui",
        "@nuxtjs/date-fns"
    ],
    dateFns: {
        defaultLocale: 'ru'
    }
})
