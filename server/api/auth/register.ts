import prisma from '~/lib/prisma';
import { hash } from 'bcrypt';

export default defineEventHandler(async (event) => {
  try {
    const { email, name, password } = await readBody(event);

    // Kiểm tra nếu user đã tồn tại
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Email đã được đăng ký');
    }

    // Mã hóa mật khẩu
    const hashedPassword = await hash(password, 10);

    // Tạo user mới cùng tài khoản credentials
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        accounts: {
          create: {
            type: 'credentials', // Thêm type thay vì providerType
            provider: 'credentials', // Đổi providerId thành provider
            providerAccountId: email,
          },
        },
      },
    });

    return { message: 'Đăng ký thành công', user };
  } catch (error) {
    return { error: error.message };
  }
});
