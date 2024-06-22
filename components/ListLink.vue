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
          <button @click="$emit('change-active', link)">{{ link.active ? "Disabled" : "Enabled" }}</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Link } from '@prisma/client';

const { links } = defineProps<{ links: Link[] }>()
</script>