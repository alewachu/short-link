<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="url">Url</label>
      <input id="url" v-model="url" type="text" />

    </div>
    <div>
      <label for="code">Codigo</label>
      <input id="code" v-model="code" type="text" />
      <small v-if="!isAvailableCode && code">El codio ya se esta utilizando.</small>
      <button @click="generateCode">Generar codigo</button>
    </div>


    <button type="submit">Acortar</button>
  </form>
  <div v-if="isLoading">Cargando</div>
  <div v-if="link">{{ link }}</div>
</template>

<script setup lang="ts">
const { randomCode, checkCode } = useShort();

const url = ref('');
const code = ref('');
const isAvailableCode = ref()

const link = ref('');
const isLoading = ref(false);

watch(code, async (value) => {
  if (value && value.length > 3 && value.length < 12) {
    const data = await checkCode(value)
    isAvailableCode.value = data.value?.isAvailableCode
  }
})

const generateCode = () => {
  code.value = randomCode()
}

const handleSubmit = async (event: any) => {
  if (url.value && code.value) {
    event.preventDefault();
    isLoading.value = true;
    const data = await $fetch('/api/short-url', {
      method: 'POST',
      body: {
        url: url.value,
        code: code.value
      },
    });
    isLoading.value = false;
    link.value = `http://localhost:3000/${data?.code}`;
  }
};

</script>
