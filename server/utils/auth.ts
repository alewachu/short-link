import { type EventHandlerRequest, type H3Event } from 'h3';

const userCookie = (event: H3Event<EventHandlerRequest>) => {
  let result = null
  const userCookie = getCookie(event, 'user')
  if (userCookie) {
    const user = JSON.parse(userCookie)
    if (user?.id) {
      result = user
    }
  }
  return result
}

export { userCookie };
