<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="url">Url</label>
      <input id="url" v-model="url" type="text" />
    </div>
    <div>
      <label for="code">Code</label>
      <input id="code" v-model="code" type="text" />
      <small v-if="!isAvailableCode && code">The code is already being used.</small>
      <button @click="generateCode">Generate code</button>
    </div>
    <button :disabled="isLoading" type="submit">Shorten</button>
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
    isAvailableCode.value = data.value?.data?.isAvailableCode
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

const { isLoading } = defineProps<{ isLoading: boolean }>()
const $emit = defineEmits(['create-link'])
</script>
