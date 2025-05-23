export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'id');
  if (!slug) {
    throw new Error('Missing slug parameter');
  }

  const db = useDrizzle();

  // Bước 1: Truy vấn thư mục theo slug
  const thumuc = await db
    .select({
      id: tables.thumuc.id,
      duong_dan: tables.thumuc.duong_dan,
    })
    .from(tables.thumuc)
    .where(eq(tables.thumuc.duong_dan, slug))
    .get();

  if (!thumuc) {
    throw createError({ statusCode: 404, message: 'Thư mục không tồn tại' });
  }

  // Bước 2: Truy vấn bài viết theo thumucId
  const result = await db
    .select({
      id: tables.baiviet.id,
      thumucId: tables.baiviet.thumucId,
      anh: tables.baiviet.anh,
      vi_tri: tables.baiviet.vi_tri,
      baiviet_ngonngu: {
        id: tables.baiviet_ngonngu.id,
        baivietId: tables.baiviet_ngonngu.baivietId,
        tieu_de: tables.baiviet_ngonngu.tieu_de,
        mo_ta: tables.baiviet_ngonngu.mo_ta,
        duong_dan: tables.baiviet_ngonngu.duong_dan,
        noi_dung: tables.baiviet_ngonngu.noi_dung,
        ngon_ngu: tables.baiviet_ngonngu.ngon_ngu,
        locale: tables.baiviet_ngonngu.locale,
        createdAt: tables.baiviet_ngonngu.createdAt,
        updatedAt: tables.baiviet_ngonngu.updatedAt,
      },
    })
    .from(tables.baiviet)
    .leftJoin(
      tables.baiviet_ngonngu,
      eq(tables.baiviet.id, tables.baiviet_ngonngu.baivietId)
    )
    .where(eq(tables.baiviet.thumucId, thumuc.id))
    .all();

  // Gom bài viết
  const baivietsMap = new Map();

  for (const item of result) {
    if (!baivietsMap.has(item.id)) {
      const englishTitle = result.find(r => r.id === item.id && r.baiviet_ngonngu?.ngon_ngu === 'en')?.baiviet_ngonngu?.tieu_de || '';
      baivietsMap.set(item.id, {
        id: item.id,
        thumucId: item.thumucId,
        anh: item.anh,
        vi_tri: item.vi_tri,
        tieu_de: englishTitle,
        baiviet_ngonngu: []
      });
    }

    if (item.baiviet_ngonngu?.id) {
      baivietsMap.get(item.id).baiviet_ngonngu.push(item.baiviet_ngonngu);
    }
  }

  return Array.from(baivietsMap.values());
});
