import { db, Prisma } from "../connect"

export const availableUrl = async (url: string, userId?: number) => {
  let where: Prisma.LinkWhereInput = {
    url: {
      equals: url.toString().trim()
    }
  }
  if (userId) {
    where.userId = userId
  }
  const found = await db.link.findFirst({
    where
  })
  return found?.id ? false : true
}