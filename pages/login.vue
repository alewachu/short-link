<template>
  <div>
    <div>
      <button @click="signIn(`github`)">JS Sign In Github</button>
    </div>
    <div v-if="status === 'loading' || status === 'authenticated'">Loading...</div>
    <div v-if="status === 'error'">Error</div>
  </div>
</template>

<script setup lang="ts">
const { signIn, signOut, session, status, cookies, getProviders } = useAuth();
const router = useRouter();
if (status.value === 'authenticated') {
  router.push('/');
}
</script>
