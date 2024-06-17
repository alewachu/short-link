import { userCookie } from "../utils/auth";

export default defineEventHandler((event) => {
  const serverSideRoutes = getRequestURL(event).pathname.startsWith('/api');
  const user = userCookie(event)
  const userId = user?.id

  if (serverSideRoutes && userId || !serverSideRoutes) {
    return
  } else {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }
})