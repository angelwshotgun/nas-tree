import prisma from '~/lib/prisma';

export default eventHandler(async (event) => {
  if (event.method === 'GET') {
    return await prisma.tier.findMany({
      include: { tierList: true, items: true }
    });
  }

  if (event.method === 'POST') {
    const body = await readBody(event);
    return await prisma.tier.create({ data: body });
  }
});
