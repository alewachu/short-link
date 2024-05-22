<template>
  <FormLink />
  <button @click="logout()">Sign Out</button>
</template>

<script setup lang="ts">
const router = useRouter()
const { githubLogout } = useGithub();

const logout = async () => {
  await githubLogout()
  router.push('/login')
}

definePageMeta({
  middleware: ['auth'],
});
</script>
