export default defineEventHandler(async (event) => {
  const { thumucId } = getQuery(event);

  const query = useDrizzle()
    .select({
      id: tables.baiviet.id,
      tieu_de: tables.baiviet.tieu_de,
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

  if (thumucId) {
    query.where(eq(tables.baiviet.thumucId, Number(thumucId)));
  }

  const baiviets = await query.all();
  return baiviets;
});
