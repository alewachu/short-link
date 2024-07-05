<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th class="px-6 py-4">
            N
          </th class="px-6 py-4">
          <th>
            URL
          </th class="px-6 py-4">
          <th class="px-6 py-4">
            Code
          </th>
          <th class="px-6 py-4">
            Visits
          </th>
          <th class="px-6 py-4">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          v-for="(link, index) in links" :key="index">
          <td class="px-6 py-4">
            {{ index + 1 }}
          </td>
          <td class="px-6 py-4">
            {{ link.url }}
          </td>
          <td class="px-6 py-4">
            {{ link.code }}
          </td>
          <td class="px-6 py-4">
            {{ link.visits }}
          </td>
          <td class="px-6 py-4">
            <button @click="() => $emit('change-active', link)">{{ link.active ? "Disabled" : "Enabled" }}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Link } from '@prisma/client';

const { links } = defineProps<{ links: Link[] }>()
</script>
