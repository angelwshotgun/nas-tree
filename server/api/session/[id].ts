import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id"); // Lấy ID từ URL
  if (!userId) {
    throw createError({ statusCode: 400, message: "Missing user ID" });
  }

  // Tìm user trong database
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, image: true, role: true },
  });

  if (!user) {
    throw createError({ statusCode: 404, message: "User not found" });
  }

  return {
    name: user.name,
    avatar: user.image,
    role: user.role || "user",
  };
});
