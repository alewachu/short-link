<template>
  <button @click="githubLogin()">Login with GitHub</button>
  <div v-if="statusUser === 'LOADING'">Cargando...</div>
</template>

<script setup lang="ts">
const { githubLogin, statusUser } = useGithub();
</script>
