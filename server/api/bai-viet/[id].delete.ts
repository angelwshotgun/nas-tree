export default defineEventHandler(async (event) => {
    const { id } = getRouterParams(event)
  
    const deletedBaiViet = await useDrizzle().delete(tables.baiviet).where(and(
      eq(tables.baiviet.id, Number(id))
    )).returning().get()
  
    if (!deletedBaiViet) {
      throw createError({
        statusCode: 404,
        message: 'Todo not found'
      })
    }
    return deletedBaiViet
  })
  