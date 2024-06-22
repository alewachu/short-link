<template>
  <FormLink @create-link="handleSubmit" :isLoading="isLoading" />
  <ListLink @change-active="onChangeActive" :links="links" />
  <button @click="logout()">Sign Out</button>
</template>

<script setup lang="ts">
import type { Link } from '@prisma/client';

const { githubLogout } = useGithub();
const { getLinkByUser, changeActive, createLink } = useShort()

const router = useRouter()
const links = ref<Link[]>([])
const isLoading = ref(false)
const link = ref("")

const onChangeActive = async (link: Link) => {
  await changeActive(link)
  findLink()
}

const findLink = async () => {
  const data = await getLinkByUser()
  links.value = data.value?.data
}

const handleSubmit = async (dataLink: Link) => {
  isLoading.value = true;
  const data = await createLink(dataLink)
  findLink()
  isLoading.value = false;
  link.value = data.value?.data?.urlFull
}


const logout = async () => {
  await githubLogout()
  router.push('/login')
}

findLink()

definePageMeta({
  middleware: ['auth'],
});
</script>
