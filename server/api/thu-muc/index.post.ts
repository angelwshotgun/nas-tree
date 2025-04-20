export default defineEventHandler(async (event) => {
    const body = await readBody(event)
  
    const thumuc = await useDrizzle().insert(tables.thumuc).values({
      ...body,
      createdAt: new Date(),
    }).returning().get()
  
    return thumuc
  })
  