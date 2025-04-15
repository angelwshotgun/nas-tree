import prisma from '~/lib/prisma';

export default eventHandler(async (event) => {
  if (event.method === 'GET') {
    return await prisma.user.findMany({
      include: { UserTierList: true }
    });
  }

  if (event.method === 'POST') {
    const body = await readBody(event);
    return await prisma.user.create({ data: body });
  }
});
