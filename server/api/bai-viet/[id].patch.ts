export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const body = await readBody(event);

  const baiviet = await useDrizzle()
    .update(tables.baiviet)
    .set({
      ...body,
      updatedAt: new Date(),
    })
    .where(eq(tables.baiviet.id, Number(id)))
    .returning()
    .get();

  return baiviet;
});
