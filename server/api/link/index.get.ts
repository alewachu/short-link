import { ResponseData } from "~/types/commons";
import { db } from "../../connect";
import { MESSAGE_PAGE_NOT_FOUND, MESSAGE_SUCCESS } from "../../utils/consts";

export default defineEventHandler(async (event) => {
  const user = userCookie(event)
  let response: ResponseData
  if (user?.id) {
    const userId = user?.id
    const link = await db.link.findMany({
      select: {
        id: true,
        url: true,
        code: true,
        active: true,
        userId: true,
        createdAt: true
      },
      where: { userId },
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
