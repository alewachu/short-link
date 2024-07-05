import { userCookie } from "../utils/auth";

export default defineEventHandler((event) => {
  const path = getRequestURL(event).pathname
  const serverSideRoutes = path.startsWith('/api');
  const user = userCookie(event)
  const userId = user?.id
  if (serverSideRoutes && userId || !serverSideRoutes || path === '/api/github/callback') {
    return
  } else {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }
})