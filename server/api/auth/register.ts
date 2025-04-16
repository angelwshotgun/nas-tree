import { hash } from 'bcryptjs';

export default defineEventHandler(async (event) => {
  try {
    const { email, name, password } = await readBody(event);

    // Kiểm tra nếu user đã tồn tại
  const existingUser = await useDrizzle().select().from(tables.users).where(eq(tables.users.email, email)).get();
    if (existingUser) {
      throw new Error('Email đã được đăng ký');
    }

    // Mã hóa mật khẩu
    const hashedPassword = await hash(password, 10);

    // Tạo user mới cùng tài khoản credentials
    const user = await useDrizzle().insert(tables.users).values({
      id: crypto.randomUUID(), // Generate a unique ID for the user
      email,
      name,
      password: hashedPassword,
    }).returning().get();

    // Tạo tài khoản credentials liên kết với user
    await useDrizzle().insert(tables.accounts).values({
      id: crypto.randomUUID(), // Generate a unique ID for the account
      userId: user.id, // Assuming `user.id` is returned after insertion
      type: 'credentials',
      provider: 'credentials',
      providerAccountId: email,
    });

    return { message: 'Đăng ký thành công', user };
  } catch (error) {
    return { error: (error instanceof Error) ? error.message : 'An unknown error occurred' };
  }
});