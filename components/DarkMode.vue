<template>
  <button id="theme-toggle" type="button"
    class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
    <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
    </svg>
    <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        fill-rule="evenodd" clip-rule="evenodd"></path>
    </svg>
  </button>
</template>


<script setup>
const themeToggleDarkIcon = ref()
const themeToggleLightIcon = ref()
const themeToggleBtn = ref()

const setLocalStorageTheme = (value) => {
  window.localStorage.setItem('color-theme', value);
}

const getLocalStorageTheme = () => {
  return window.localStorage.getItem('color-theme');
}

const setDarkTheme = () => {
  document.documentElement.classList.add('dark');
}

const setLight = () => {
  document.documentElement.classList.remove('dark');

}

const toggleTheme = () => {
  themeToggleDarkIcon.value.classList.toggle('hidden');
  themeToggleLightIcon.value.classList.toggle('hidden');

  const localStorageTheme = getLocalStorageTheme()
  if (localStorageTheme) {
    if (localStorageTheme === 'light') {
      setDarkTheme()
      setLocalStorageTheme('dark');
    } else {
      setLight();
      setLocalStorageTheme('light');
    }
  } else {
    if (document.documentElement.classList.contains('dark')) {
      setLight();
      setLocalStorageTheme('light');
    } else {
      setDarkTheme()
      setLocalStorageTheme('dark');
    }
  }
}

const loadTheme = () => {
  const localStorageTheme = getLocalStorageTheme()
  const mediaConfig = window.matchMedia('(prefers-color-scheme: dark)')
  if (localStorageTheme === 'dark' || (!('color-theme' in window.localStorage) && mediaConfig.matches)) {
    themeToggleLightIcon.value.classList.remove('hidden');
    setDarkTheme()
  } else {
    themeToggleDarkIcon.value.classList.remove('hidden');
    setLight();
  }
}

const init = () => {
  themeToggleDarkIcon.value = document.getElementById('theme-toggle-dark-icon');
  themeToggleLightIcon.value = document.getElementById('theme-toggle-light-icon');
  themeToggleBtn.value = document.getElementById('theme-toggle');
  themeToggleBtn.value.addEventListener('click', toggleTheme);
  loadTheme()
}

onMounted(() => {
  init()
})

</script>