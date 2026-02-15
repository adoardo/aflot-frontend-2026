// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    server: {
        port: 3000, // or your desired port
        host: '0.0.0.0' // makes it accessible from outside the host machine
    },

  devtools: { enabled: true },

  //ssr: true, // Включите, если ваш проект требует SSR
  //target: 'server', // Убедитесь, что серверный рендеринг включен

  css: [
    '~/assets/css/font-awesome.min.css',
    '~/assets/css/fullpage.min.css',
    '~/assets/css/style_demo.css',
    '~/assets/css/ed_style.css',
  ],

  modules: [//'@nuxtjs/auth-next',
  '@nuxt/image', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@fullpage/nuxt-fullpage', 'nuxt-swiper', '@nuxt/ui'],

  auth: {
    // Options
  },

  plugins: [
    { src: "~/plugins/jquery", mode: "client" },
    { src: '~/plugins/vue-toast.js', mode: 'client' },
  ],

  buildModules: [
    "@nuxtjs/svg-sprite",
  ],

  axios: {
    baseURL: process.env.BASE_URL,
    headers: {
      common: {
        // 'Authorization': `Bearer your_access_token` 
        Accept: 'application/json',
        retry: { retries: 3 },
      }
    }
  },

  router: {
   //middleware: ['auth']
    routes: [
      {
        name: 'navy',
        path: '/navy',
        component: 'pages/navy/index.vue'
      },
      {
        name: 'navy-id',
        path: '/navy/:id',
        component: 'pages/navy/_id.vue'
      }
    ]
  },

  // app: {
  //   pageTransition: { name: 'page', mode: 'out-in' }
  // },
  app: {
    head: {
      script: [
        {
          src: 'https://telegram.org/js/telegram-web-app.js',
        },

        // {
        //   src: 'https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js',
        // },
        // {
        //   src: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
        //   type: 'module',
        //   body: true
        // },
        // {
        //   src: '~/assets/js/mobile-menu.js'
        // },
        // {
        //   src: '~/assets/js/main.js'
        // },
        // {
        //   src: 'https://unpkg.com/vue-fullpage.js/dist/vue-fullpage.es.js',
        //   type: 'module',
        //   body: true
        // },
      ],
    }
  },

  render: { csp: false },

  runtimeConfig: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
  },

  compatibilityDate: '2024-11-03',
})