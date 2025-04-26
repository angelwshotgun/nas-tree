export default defineEventHandler(async (event) => {
  const duongDanParam = getRouterParam(event, 'id');
  if (!duongDanParam) {
    throw new Error('Invalid or missing duong_dan parameter');
  }

  const query = useDrizzle()
    .select({
      id: tables.baiviet.id,
      tieu_de: tables.baiviet.tieu_de,
      mo_ta: tables.baiviet.mo_ta,
      duong_dan: tables.baiviet.duong_dan,
      noi_dung: tables.baiviet.noi_dung,
      thumucId: tables.baiviet.thumucId,
      thumuc: tables.thumuc,
      anh: tables.baiviet.anh,
      createdAt: tables.baiviet.createdAt,
      updatedAt: tables.baiviet.updatedAt,
      vi_tri: tables.baiviet.vi_tri,
    })
    .from(tables.baiviet)
    .leftJoin(tables.thumuc, eq(tables.baiviet.thumucId, tables.thumuc.id))
    .where(eq(tables.baiviet.duong_dan, duongDanParam));

  const baiviet = await query.get();
  return baiviet;
});
