export default defineEventHandler(async (event) => {
  const duongDanParam = getRouterParam(event, 'id');
  if (!duongDanParam) {
    throw new Error('Invalid or missing duong_dan parameter');
  }

  const result = await useDrizzle()
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
    .where(eq(tables.baiviet_ngonngu.duong_dan, duongDanParam))
    .all();

  // Nhóm dữ liệu theo bài viết
  const baivietsMap = new Map();

  for (const item of result) {
    if (!baivietsMap.has(item.id)) {
      const englishTitle =
        result.find(
          (r) => r.id === item.id && r.baiviet_ngonngu?.ngon_ngu === 'en'
        )?.baiviet_ngonngu?.tieu_de || '';
      baivietsMap.set(item.id, {
        id: item.id,
        thumucId: item.thumucId,
        anh: item.anh,
        vi_tri: item.vi_tri,
        tieu_de: englishTitle,
        baiviet_ngonngu: [],
      });
    }

    // Thêm thông tin baiviet_ngonngu nếu có
    if (item.baiviet_ngonngu?.id) {
      baivietsMap.get(item.id).baiviet_ngonngu.push(item.baiviet_ngonngu);
    }
  }

  // Chuyển đổi Map thành mảng
  const baiviets = Array.from(baivietsMap.values());

  return baiviets[0] || null;
});
