import type { Link } from "@prisma/client";
import type { ResponseData } from "~/types/commons";

export default function () {

  const randomCode = () => {
    return Math.random().toString(36).substring(2, 12);
  }

  const checkCode = async (code: string) => {
    const { data } = await $fetch<ResponseData>(`/api/code?q=${code}`)
    return data
  }

  const createLink = async (body: Link) => {
    const { data } = await $fetch<ResponseData>('/api/short-url', {
      method: 'POST',
      body,
    });
    return data
  }


  const getLinkByUser = async () => {
    const { data } = await $fetch<ResponseData>(`/api/link`)
    return data
  }

  const changeActive = async (link: Link) => {
    const { data } = await $fetch<ResponseData>(`/api/link/${link.id}`, {
      method: 'PUT',
      body: {
        ...link,
        active: link.active ? 0 : 1
      }
    })
    return data
  }

  return { randomCode, checkCode, createLink, getLinkByUser, changeActive }
}