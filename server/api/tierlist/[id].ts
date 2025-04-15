import prisma from '~/lib/prisma';

export default eventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) return { error: 'ID is required' };

  if (event.method === 'GET') {
    return await prisma.tierList.findUnique({ where: { id } });
  }

  if (event.method === 'PUT') {
    const body = await readBody(event);
    return await prisma.tierList.update({
      where: { id },
      data: body
    });
  }

  if (event.method === 'DELETE') {
    return await prisma.tierList.delete({ where: { id } });
  }
});
