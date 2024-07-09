<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-6">
      <label for="url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Url</label>
      <input id="url" v-model="url" required
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text" />
    </div>
    <div class="mb-6">
      <label for="code"
        :class="`block mb-2 text-sm font-medium ${!isAvailableCode && code ? 'text-red-700 dark:text-red-500' : 'text-gray-900 dark:text-white'}`">Code</label>
      <div class="relative">
        <input type="text" id="code" v-model="code"
          :class="`block w-full p-4 text-sm border ${!isAvailableCode && code ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500' : 'text-gray-900 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}`"
          placeholder="myCodeHere" required />
        <button @click="generateCode" type="button"
          class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Generate
          random code</button>
      </div>
      <p v-if="!isAvailableCode && code" class="mt-2 text-sm text-red-600 dark:text-red-500"><span
          class="font-medium">The code is already being used.</span></p>

      <!-- <small v-if="!isAvailableCode && code">The code is already being used.</small> -->
    </div>

    <div class="flex items-center">
      <button
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        :disabled="isLoading" type="submit">
        Shorten
      </button>
      <button @click="closeModal()" type="button"
        class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
    </div>
  </form>
</template>

<script setup lang="ts">
const { useDebouncedRef } = useDebounce()
const { randomCode, checkCode } = useShort();

const url = ref('');
const code = useDebouncedRef('', 500);
const isAvailableCode = ref()

watch(code, async (value) => {
  if (value && value.length > 2 && value.length < 64) {
    const data = await checkCode(value)
    isAvailableCode.value = data.isAvailableCode
  }
})

const generateCode = () => {
  code.value = randomCode()
}

const handleSubmit = async (event: Event) => {
  if (url.value && code.value) {
    event.preventDefault();
    $emit('create-link', { url: url.value, code: code.value })
  }
};

const closeModal = () => {
  $emit('close-modal')
}

const { isLoading } = defineProps<{ isLoading: boolean }>()
const $emit = defineEmits(['create-link', 'close-modal'])
</script>
