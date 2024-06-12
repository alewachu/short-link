<template>
  <FormLink />
  <button @click="logout()">Sign Out</button>
</template>

<script setup lang="ts">
const router = useRouter()
const { githubLogout } = useGithub();
const user = ref()

const logout = async () => {
  await githubLogout()
  router.push('/login')
}

definePageMeta({
  middleware: ['auth'],
});
</script>
