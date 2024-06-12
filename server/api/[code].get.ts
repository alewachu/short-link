import { db } from "../connect";

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code');

  const data = await db.link.findUnique({
    where: { code },
  });

  if (data?.id) {
    await db.link.update({
      where: { id: data.id },
      data: {
        visits: data.visits + 1
      }
    })
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: 'ID should be an integer',
    });
  }

  return { url: data.url };
});
