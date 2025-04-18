export default defineEventHandler(async (event) => {
    const body = await readBody(event)
  
    const baiviet = await useDrizzle().insert(tables.baiviet).values({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning().get()
  
    return baiviet
  })
  