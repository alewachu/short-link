<template>
  <Navbar @logout="logout" />
  <div class="grid grid-rows-1 w-[90%] gap-4 mx-auto">
    <div class="flex justify-end">
      <button
        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button" @click="openModal = true">
        Add link
      </button>
    </div>
    <div class="flex justify-center">
      <ListLink @change-active="onChangeActive" :links="links" /> 
    </div>
  </div>
  <ClientOnly>
    <Modal v-model:open-modal="openModal">
      <FormLink @create-link="handleSubmit" @close-modal="openModal = false" :isLoading="isLoading" />
    </Modal>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { Link } from '@prisma/client';
const { githubLogout } = useGithub();
const { getLinkByUser, changeActive, createLink } = useShort()

const router = useRouter()
const links = ref<Link[]>([])
const isLoading = ref(false)
const link = ref("")
const openModal = ref(false)

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
