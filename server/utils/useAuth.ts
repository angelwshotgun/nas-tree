import { getServerSession } from '#auth'

export async function useAuth(event: any) {
  const session = await getServerSession(event)

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  // Attach session vào event.context nếu cần
  event.context.session = session

  return session
}
