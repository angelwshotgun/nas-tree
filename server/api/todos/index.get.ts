export default defineEventHandler(async () => {
  const todos = await useDrizzle().select().from(tables.todos).all();
  return todos;
});
