import { ResponseData } from "~/types/commons";
import { db } from "../connect";
import { MESSAGE_PAGE_NOT_FOUND, MESSAGE_SUCCESS } from "../utils/consts";

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code');

  const link = await db.link.findUnique({
    where: { code },
  });

  let data: ResponseData
  if (link?.id) {
    await db.link.update({
      where: { id: link.id },
      data: {
        visits: link.visits + 1
      }
    })
    setResponseStatus(event, 200, MESSAGE_SUCCESS);
    data = {
      success: false,
      message: MESSAGE_SUCCESS,
      data: {
        url: link.url
      }
    }
  } else {
    setResponseStatus(event, 404, MESSAGE_PAGE_NOT_FOUND)
    data = {
      success: false,
      message: MESSAGE_PAGE_NOT_FOUND,
    }
  }

  return data
});
