import { hash } from 'bcryptjs';

export default defineEventHandler(async (event) => {
  try {
    const db = useDrizzle();
    // Lấy dữ liệu từ body request
    const body = await readBody(event);
    const { email, password, name } = body;

    // Kiểm tra dữ liệu đầu vào
    if (!email || !password || !name) {
      throw createError({
        statusCode: 400,
        message:
          'Thiếu thông tin đăng ký. Vui lòng cung cấp email, mật khẩu và tên.',
      });
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw createError({
        statusCode: 400,
        message: 'Email không hợp lệ.',
      });
    }

    // Kiểm tra độ mạnh của mật khẩu
    if (password.length < 8) {
      throw createError({
        statusCode: 400,
        message: 'Mật khẩu phải có ít nhất 8 ký tự.',
      });
    }
    console.log('checking');
    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await db.query.users.findFirst({
      where: eq(tables.users.email, email),
    });
    console.log('existingUser', existingUser);

    if (existingUser) {
      throw createError({
        statusCode: 409,
        message:
          'Email đã được sử dụng. Vui lòng sử dụng email khác hoặc đăng nhập.',
      });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await hash(password, 10);
    console.log('hashedPassword:', hashedPassword);
    const [newUser] = await db
      .insert(tables.users)
      .values({
        name,
        email,
        password: hashedPassword,
        emailVerified: null,
        image: null,
      })
      .returning({
        id: tables.users.id,
        name: tables.users.name,
        email: tables.users.email,
      });
    console.log('newUser:', newUser);
    // Tạo bản ghi trong bảng accounts cho credentials provider
    // Điều này giúp tích hợp tốt hơn với hệ thống Auth.js
    await db.insert(tables.accounts).values({
      userId: newUser.id,
      type: 'credentials',
      provider: 'credentials',
      providerAccountId: email, // Sử dụng email làm providerAccountId cho credentials
      expires_at: null,
      token_type: null,
      scope: null,
      session_state: null,
    });

    // Trả về thông tin người dùng (không bao gồm mật khẩu)
    return {
      success: true,
      user: newUser,
    };
  } catch (error) {
    console.error('Register error:', error);

    // Xử lý lỗi từ database hoặc lỗi khác
    throw createError({
      statusCode: 500,
      message: 'Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại sau.',
    });
  }
});
