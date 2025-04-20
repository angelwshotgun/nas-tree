export default defineEventHandler(async () => {
  const baiviets = await useDrizzle().select().from(tables.baiviet).all();
  return baiviets;
});
