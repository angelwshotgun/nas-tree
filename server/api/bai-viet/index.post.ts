export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const baiviet = await useDrizzle().insert(tables.baiviet).values({
    ...body,
    id: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning().get()

  return baiviet
})
