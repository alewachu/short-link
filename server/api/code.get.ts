import { db } from "../connect";

export default defineEventHandler(async (event) => {
  const { q } = getQuery(event)
  let isAvailableCode = false
  if (q && Boolean(q)) {
    const found = await db.link.findFirst({
      where: {
        code: {
          contains: q.toString().trim()
        }
      }
    })
    isAvailableCode = found?.id ? false : true
    setResponseStatus(event, 200);
  } else {
    throw createError({
      statusCode: 400,
      statusMessage: 'Code is required',
    })
  }
  return { isAvailableCode }
})