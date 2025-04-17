// middleware/api-auth.global.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Chỉ áp dụng cho API routes
  if (!to.path.startsWith('/api/')) return

  // Bỏ qua các public routes
  const publicApiRoutes = ['/api/auth/login', '/api/public', '/api/auth/session']
  if (publicApiRoutes.some(route => to.path.startsWith(route))) return

  // Lấy trạng thái xác thực
  const { status, getSession } = useAuth()
  const session = await getSession()

  // Nếu người dùng chưa xác thực, chặn truy cập API
  if (status.value !== 'authenticated' || !session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Vui lòng đăng nhập để truy cập API này'
    })
  }

  // Nếu cần thiết, có thể kiểm tra thêm quyền của người dùng ở đây
  // Ví dụ: kiểm tra role, permissions, etc.
  
  // Middleware cho phép request tiếp tục nếu đã xác thực
})