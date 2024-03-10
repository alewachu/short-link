<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="url" type="text" placeholder="URL" />
    <button type="submit">Acortar</button>
    <div v-if="isLoading">Cargando</div>
    <div v-if="link">{{ link }}</div>
  </form>
</template>

<script setup lang="ts">
const url = ref('');
const link = ref('');

const isLoading = ref(false);
const handleSubmit = async (event: any) => {
  event.preventDefault();
  isLoading.value = true;
  const data = await $fetch('/api/short-url', {
    method: 'POST',
    body: {
      url: url.value,
    },
  });
  isLoading.value = false;
  link.value = `http://localhost:3000/${data.shortUrl}`;
};
</script>
