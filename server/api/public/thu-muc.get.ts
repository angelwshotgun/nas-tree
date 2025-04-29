export default defineEventHandler(async (event) => {
  
  const thumucs = await useDrizzle()
    .select()
    .from(tables.thumuc)
    .orderBy(tables.thumuc.thu_tu) // Sắp xếp theo cột thu_tu
    .all();
  return thumucs;
});
