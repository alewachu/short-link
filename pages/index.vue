<template>
  <FormLink />
  <button @click="signOut()">Sign Out</button>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth', auth: { guestRedirectTo: '/login' } });
const { signOut } = useAuth();
</script>
