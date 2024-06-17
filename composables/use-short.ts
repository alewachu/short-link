import type { CreateLink, ResponseData } from "~/types/commons";

export default function () {

  const randomCode = () => {
    return Math.random().toString(36).substring(2, 12);
  }

  const checkCode = async (code: string) => {
    const { data } = await useFetch<ResponseData>(`/api/code?q=${code}`)
    return data
  }

  const createLink = async (body: CreateLink) => {
    const { data } = await useFetch<ResponseData>('/api/short-url', {
      method: 'POST',
      body,
    });
    return data
  }

  return { randomCode, checkCode, createLink }
}