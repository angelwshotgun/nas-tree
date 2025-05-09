export default defineEventHandler(async (event) => {
  const { duong_dan } = getQuery(event);

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
    .leftJoin(tables.thumuc, eq(tables.baiviet.thumucId, tables.thumuc.id));

  if (typeof duong_dan === 'string') {
    query.where(eq(tables.thumuc.duong_dan, duong_dan));
  }

  const baiviets = await query.all();
  return baiviets;
});
