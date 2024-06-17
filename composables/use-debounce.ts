import { customRef, ref } from 'vue'

export default function () {
  const debounce = (fn: Function, delay: number, immediate: boolean) => {
    let timeout: NodeJS.Timeout
    return (...args: any) => {
      if (immediate && !timeout) fn(...args)
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        fn(...args)
      }, delay)
    }
  }
  const useDebouncedRef = (initialValue: string, delay: number = 0, immediate: boolean = false) => {
    const state = ref(initialValue)
    const debouncedRef = customRef((track, trigger) => ({
      get() {
        track()
        return state.value
      },
      set: debounce(
        (value: string) => {
          state.value = value
          trigger()
        },
        delay,
        immediate
      ),
    }))
    return debouncedRef
  }

  return { useDebouncedRef }
}
