export default function () {

  const randomCode = () => {
    return Math.random().toString(36).substring(2, 12);
  }

  const checkCode = async (code: string) => {
    const { data } = await useFetch(`/api/code?q=${code}`)
    return data
  }
  return { randomCode, checkCode }
}