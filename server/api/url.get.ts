import { ResponseData } from "~/types/commons";
import { availableUrl } from "../utils/available-url";
import { MESSAGE_SUCCESS, MESSAGE_URL_REQUIRED } from "../utils/consts";

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const url = query.q as string | undefined

  let isAvailableUrl = false
  let response: ResponseData

  if (url && Boolean(url)) {
    isAvailableUrl = await availableUrl(url)
    setResponseStatus(event, 200, MESSAGE_SUCCESS);
    response = {
      success: true,
      message: MESSAGE_SUCCESS,
      data: {
        isAvailableUrl
      }
    }
  } else {
    setResponseStatus(event, 400, MESSAGE_URL_REQUIRED)
    response = {
      success: false,
      message: MESSAGE_URL_REQUIRED,
      data: {
        isAvailableUrl
      }
    }
  }
  return response
})