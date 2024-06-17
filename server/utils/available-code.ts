import { db } from "../connect"

export const availableCode = async (code: string) => {
  const found = await db.link.findFirst({
    where: {
      code: {
        startsWith: code.toString().trim(),
        endsWith: code.toString().trim()
      }
    }
  })
  return found?.id ? false : true
}