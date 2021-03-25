import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - nuxtjs-oauth',
    title: 'nuxtjs-oauth',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],
  auth: {
    strategies: {
      monster: {
        scheme: 'refresh',
        token: {
          property: 'data.access_token',
          maxAge: 1800,
          type: 'Bearer',
        },
        refreshToken: {
          property: 'data.refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30,
        },
        user: {
          property: 'data',
          autoFetch: true,
        },
        endpoints: {
          login: {
            url: 'http://172.16.50.59:8888/api/auth/login',
            method: 'post',
          },
          refresh: {
            url: 'http://172.16.50.59:8888/api/auth/refresh',
            method: 'post',
          },
          user: {
            url: 'http://172.16.50.59:8888/api/v1/user/me',
            method: 'get',
          },
          logout: {
            url: 'http://172.16.50.59:8888/api/v1/auth/logout',
            method: 'post',
          },
        },
        autoLogout: true,
      },
    },
    plugins: ['@/plugins/axios/response-interceptor'],
  },
  router: {
    middleware: ['auth'],
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      breakpoint: {
        scrollBarWidth: 16,
        thresholds: {
          xs: 600,
          sm: 960,
          md: 1280,
          lg: 1920,
        },
      },
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
