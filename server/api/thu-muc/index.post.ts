export default defineEventHandler(async (event) => {
    const { ten_thumuc, thu_tu } = await readBody(event)
  
    const thumuc = await useDrizzle().insert(tables.thumuc).values({
      ten_thumuc,
      thu_tu,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning().get()
  
    return thumuc
  })
  