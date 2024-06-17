<template>
  <div>Loading...</div>
</template>

<script setup async lang="ts">
import type { ResponseData } from '~/types/commons';
const route = useRoute();
const url = `/api/${route.params.shortId}`;

const { data, error } = await useFetch<ResponseData>(url);
if (data.value?.data) {
  await navigateTo(data.value.data.url, {
    external: true,
  });
} else {
  if (error.value?.statusCode === 404) {
    clearError({ redirect: '/404' })
  } else {
    clearError({ redirect: '/500' })
  }
}
</script>
