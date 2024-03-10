// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'node:path';

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@hebilicious/authjs-nuxt'],
  alias: {
    cookie: resolve(__dirname, 'node_modules/cookie'),
  },
  // Optional default config
  //  authJs: {
  //    verifyClientOnEveryRequest: true,
  //    guestRedirectTo: "/", // where to redirect if the user is not authenticated
  //    authenticatedRedirectTo: "/", // where to redirect if the user is authenticated
  //    baseUrl: "" // should be something like https://www.my-app.com
  //  },
  runtimeConfig: {
    authJs: {
      secret: process.env.NUXT_NEXTAUTH_SECRET, // You can generate one with `openssl rand -base64 32`
    },
    github: {
      clientId: process.env.NUXT_GITHUB_CLIENT_ID,
      clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET,
    },
    public: {
      authJs: {
        baseUrl: process.env.NUXT_NEXTAUTH_URL, // The URL of your deployed app (used for origin Check in production)
        verifyClientOnEveryRequest: true, // whether to hit the /auth/session endpoint on every client request
      },
    },
  },
});
