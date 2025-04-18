export default defineEventHandler(async (event) => {
    const { id } = getRouterParams(event)
  
    const deletedThuMuc = await useDrizzle().delete(tables.thumuc).where(and(
      eq(tables.thumuc.id, Number(id))
    )).returning().get()
  
    if (!deletedThuMuc) {
      throw createError({
        statusCode: 404,
        message: 'Todo not found'
      })
    }
    return deletedThuMuc
  })
  