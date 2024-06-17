<template>
  <table>
    <thead>
      <tr>
        <th>
          N
        </th>
        <th>
          URL
        </th>
        <th>
          Code
        </th>
        <th>
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(link, index) in links" :key="index">
        <td>
          {{ index + 1 }}
        </td>
        <td>
          {{ link.url }}
        </td>
        <td>
          {{ link.code }}
        </td>
        <td>
          <button @click="onChangeActive(link)">{{ link.active ? "Disabled" : "Enabled" }}</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Link } from '@prisma/client';
const links = ref<Link[]>([])

const { getLinkByUser, changeActive } = useShort()

const findLink = async () => {
  const data = await getLinkByUser()
  links.value = data.value?.data
}

const onChangeActive = async (link: Link) => {
  await changeActive(link)
  findLink()
}

findLink()
</script>