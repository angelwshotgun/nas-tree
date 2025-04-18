export default defineEventHandler(async () => {
  const thumucs = await useDrizzle().select().from(tables.thumuc).all();
  return thumucs;
});
