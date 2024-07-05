// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },

  imports: {
    dirs: ['types/*.ts'],
  },

  runtimeConfig: {
    domain: process.env.NUXT_DOMAIN,
    github: {
      clientId: process.env.NUXT_GITHUB_CLIENT_ID,
      clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET,
    },
    public: {
      github: {
        clientId: process.env.NUXT_GITHUB_CLIENT_ID,
      },
    },
  },

  modules: ["@nuxtjs/tailwindcss"]
});