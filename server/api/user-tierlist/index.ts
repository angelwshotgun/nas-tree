import prisma from '~/lib/prisma';

export default eventHandler(async (event) => {
  if (event.method === 'GET') {
    return await prisma.tierList.findMany({
      include: { user: true, tiers: true, items: true }
    });
  }

  if (event.method === 'POST') {
    const body = await readBody(event);
    const { title, description, userId } = body;
    const defaultTier = [
      {
        name: 'S',
        color: '#ff7f7f',
        order: 0,
        value: 0,
        items: [],
      },
      {
        name: 'A',
        color: '#ffbf7f',
        order: 1,
        value: 1,
        items: [],
      },
      {
        name: 'B',
        color: '#ffdf7f',
        order: 2,
        items: [],
      },
      {
        name: 'C',
        color: '#ffff7f',
        order: 3,
        value: 3,
        items: [],
      },
      {
        name: 'D',
        color: '#bfff7f',
        order: 4,
        value: 4,
        items: [],
      },
      {
        name: 'F',
        color: '#7fff7f',
        order: 5,
        value: 5,
        items: [],
      }
    ]
    const tierList = await prisma.tierList.create({
      data: { title, description, userId }
    });
    
    const tiersWithListId = defaultTier.map(tier => ({
      ...tier,
      tierListId: tierList.id
    }));

    await prisma.tier.createMany({
      data: tiersWithListId,
      skipDuplicates: true,
    });
    
    return tierList;
  }});
