export default defineEventHandler(async (event) => {
    const { id } = getRouterParams(event)
    const { completed } = await readBody(event)
  
    const todo = await useDrizzle().update(tables.todos).set({
      completed
    }).where(eq(tables.todos.id, Number(id))).returning().get()
  
    return todo
  })
  