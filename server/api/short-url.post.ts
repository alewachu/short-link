import { ResponseData } from "~/types/commons";
import { db } from "../connect";
import { userCookie } from "../utils/auth";
import { availableCode } from "../utils/available-code";
import { MESSAGE_CODE_NOT_AVAILABLE, MESSAGE_CREATED, MESSAGE_MISSING_DATA } from "../utils/consts";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const runtimeConfig = useRuntimeConfig();

  const user = userCookie(event)
  const userId = user?.id

  const { url, code } = body
  const isAvailableCode = await availableCode(code)
  let response: ResponseData
  if (isAvailableCode) {
    if (url && userId) {
      const link = await db.link.create({
        data: { url, userId, code },
      })
      setResponseStatus(event, 200)
      response = {
        success: true,
        message: MESSAGE_CREATED,
        data: { ...link, urlFull: `${runtimeConfig.domain}/${link.code}` }
      }
    } else {
      setResponseStatus(event, 400, MESSAGE_MISSING_DATA)
      response = {
        success: false,
        message: MESSAGE_MISSING_DATA
      }
    }
  } else {
    setResponseStatus(event, 400, MESSAGE_CODE_NOT_AVAILABLE)
    response = {
      success: false,
      message: MESSAGE_CODE_NOT_AVAILABLE
    }
  }
  return response
});
