import { db } from "../connect";

export default defineEventHandler(async (event) => {
  const { q } = getQuery(event)
  let isAvailableUrl = false
  if (q && Boolean(q)) {
    const found = await db.link.findFirst({
      where: {
        url: {
          equals: q.toString().trim()
        }
      }
    })
    isAvailableUrl = found?.id ? false : true
    setResponseStatus(event, 200);
  } else {
    throw createError({
      statusCode: 400,
      statusMessage: 'Url is required',
    })
  }
  return { isAvailableUrl }
})