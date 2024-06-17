import { ResponseData } from "~/types/commons";
import { availableCode } from "../utils/available-code";
import { MESSAGE_CODE_REQUIRED, MESSAGE_SUCCESS } from "../utils/consts";

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const code = query.q as string | undefined

  let isAvailableCode = false
  let data: ResponseData

  if (code && Boolean(code)) {
    isAvailableCode = await availableCode(code)
    setResponseStatus(event, 200, MESSAGE_SUCCESS);
    data = {
      success: true,
      message: MESSAGE_SUCCESS,
      data: {
        isAvailableCode
      }
    }
  } else {
    setResponseStatus(event, 400, MESSAGE_CODE_REQUIRED)
    data = {
      success: false,
      message: MESSAGE_CODE_REQUIRED,
      data: {
        isAvailableCode
      }
    }
  }

  return data
})