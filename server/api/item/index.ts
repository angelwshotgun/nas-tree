import prisma from '~/lib/prisma';

export default eventHandler(async (event) => {
  if (event.method === 'GET') {
    return await prisma.item.findMany({
      include: { tier: true, tierList: true }
    });
  }

  if (event.method === 'POST') {
    const body = await readBody(event);
    return await prisma.item.create({ data: body });
  }
});
