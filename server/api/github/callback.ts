import { db } from "~/server/connect";
import { User } from "~/types/commons";
const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const { code } = getQuery(event);
  if (!code) {
    return sendRedirect(event, '/');
  }
  const response: any = await $fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    body: {
      client_id: runtimeConfig.github.clientId,
      client_secret: runtimeConfig.github.clientSecret,
      code,
    },
  });
  if (response.error) {
    return sendRedirect(event, '/');
  }
  setCookie(event, 'gh_token', response.access_token, { path: '/' });

  const userGH = await $fetch<User>('https://api.github.com/user', {
    baseURL: 'https://api.github.com',
    headers: {
      Authorization: `token ${response.access_token}`,
    }
  })

  const now = new Date()

  const user = await db.user.upsert({
    where: {
      ghId: userGH.id,
    },
    update: {
      lastLogin: now
    },
    create: {
      ghLogin: userGH.login,
      ghId: userGH.id,
      ghName: userGH.name,
      lastLogin: now
    },
  })
  setCookie(event, 'user', JSON.stringify({ id: user.id, name: user.ghName }), { path: '/' });

  return sendRedirect(event, '/');
});
