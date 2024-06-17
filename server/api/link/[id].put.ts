import { ResponseData } from "~/types/commons";
import { db } from "../../connect";
import { MESSAGE_SUCCESS } from "../../utils/consts";

export default defineEventHandler(async (event) => {
  const data = await readBody(event)
  const idLink = getRouterParam(event, 'id') as string
  const id = parseInt(idLink)
  const user = userCookie(event)
  let response: ResponseData
  const userId = user?.id
  if (userId === data.userId) {
    const link = await db.link.update({
      where: { id },
      data
    });
    setResponseStatus(event, 200, MESSAGE_SUCCESS);
    response = {
      success: true,
      message: MESSAGE_SUCCESS,
      data: link
    }
  } else {
    setResponseStatus(event, 401, MESSAGE_PAGE_NOT_FOUND)
    response = {
      success: false,
      message: MESSAGE_PAGE_NOT_FOUND,
    }
  }

  return response
});
