import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

  const body = await readBody(event);
  const { url } = body;
  const shortUrl = Math.random().toString(36).substring(2, 6);
  let data;
  try {
    data = await prisma.link.create({
      data: { url, shortUrl },
    });

    prisma.$disconnect();
    setResponseStatus(event, 200);
  } catch (error) {
    console.log(error);
    setResponseStatus(event, 500);
  }

  const a = new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, 3000);
  });

  await Promise.resolve(a);
  return data;
});
