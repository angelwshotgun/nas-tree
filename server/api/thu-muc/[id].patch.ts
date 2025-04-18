export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const body = await readBody(event);

  const thumuc = await useDrizzle()
    .update(tables.thumuc)
    .set({
      ...body,
      updatedAt: new Date(),
    })
    .where(eq(tables.thumuc.id, Number(id)))
    .returning()
    .get();

  return thumuc;
});
