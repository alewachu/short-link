<template>
  <div>Loading...</div>
</template>

<script setup async lang="ts">
import { type Data } from '~/types/commons';

const route = useRoute();
const url = `/api/${route.params.shortId}`;
const { data } = await useFetch<Data>(url);

if (data.value?.url) {
  await navigateTo(data.value.url, {
    external: true,
  });
} else {
  throw createError({
    statusCode: 404,
    message: 'not found',
    fatal: true,
  });
}
</script>
