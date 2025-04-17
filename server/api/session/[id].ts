export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id"); // Lấy ID từ URL
  if (!userId) {
    throw createError({ statusCode: 400, message: "Missing user ID" });
  }

  const user = await useDrizzle()
    .select({
      name: tables.users.name,
      image: tables.users.image,
    })
    .from(tables.users)
    .where(eq(tables.users.id, userId))
    .get();
    
  if (!user) {
    throw createError({ statusCode: 404, message: "User not found" });
  }

  return {
    name: user.name,
    avatar: user.image,
  };
});
