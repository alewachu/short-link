import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async (event) => {
  const shortId = getRouterParam(event, 'shortId');

  const prisma = new PrismaClient();
  const data = await prisma.link.findUnique({
    where: { shortUrl: shortId },
  });
  prisma.$disconnect();

  if (!data?.id) {
    throw createError({
      statusCode: 404,
      statusMessage: 'ID should be an integer',
    });
  }

  return { url: data.url };
});
