import { db } from "../connect";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const userCookie = getCookie(event, 'user') as string
  const user = JSON.parse(userCookie)

  const { url, code } = body;
  console.log(url, user, code)
  let data;
  try {
    data = await db.link.create({
      data: { url, userId: user.id, code },
    });
    setResponseStatus(event, 200);
  } catch (error) {
    console.log(error)
    setResponseStatus(event, 500);
  }
  return data;
});
