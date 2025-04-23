export default defineEventHandler(async (event) => {
  const idParam = getRouterParam(event, 'id');
  const id = idParam ? parseInt(idParam, 10) : undefined;
  if (!id) {
    throw new Error('Invalid or missing ID parameter');
  }
  const thumuc = await useDrizzle()
    .select()
    .from(tables.thumuc)
    .where(eq(tables.thumuc.id, id))
    .get();
  return thumuc;
});
