export default defineEventHandler(async (event) => {
  const id = event.context.params?.id || (await readBody(event)).id;
  const body = await readBody(event);
  const db = useDrizzle();

  if (!id || !body.thumucId || !Array.isArray(body.baiviet_ngonngu) || body.baiviet_ngonngu.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request body' });
  }

  const tieu_de_vn = body.baiviet_ngonngu.find((x: { ngon_ngu: string }) => x.ngon_ngu === 'en')?.tieu_de || body.baiviet_ngonngu[0].tieu_de;

  const duong_dan = tieu_de_vn
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[áàảãạâấầẩẫậăắằẳẵặ]/g, 'a')
    .replace(/[éèẻẽẹêếềểễệ]/g, 'e')
    .replace(/[íìỉĩị]/g, 'i')
    .replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, 'o')
    .replace(/[úùủũụưứừửữự]/g, 'u')
    .replace(/[ýỳỷỹỵ]/g, 'y')
    .replace(/\s+/g, '-');

  // 1. Update bài viết chính
  await db.update(tables.baiviet)
    .set({
      thumucId: body.thumucId,
      anh: body.anh,
      vi_tri: body.vi_tri,
      updatedAt: new Date(),
    })
    .where(eq(tables.baiviet.id, id));

  // 2. Xóa các bản ghi ngôn ngữ cũ
  await db.delete(tables.baiviet_ngonngu)
    .where(eq(tables.baiviet_ngonngu.baivietId, id));

  // 3. Insert lại danh sách thông tin ngôn ngữ mới
  const now = new Date();
  const baivietNgonNguList = body.baiviet_ngonngu.map((item: { tieu_de: string; mo_ta: string; noi_dung: string; ngon_ngu: string; locale: string }) => ({
    baivietId: id,
    tieu_de: item.tieu_de,
    mo_ta: item.mo_ta,
    duong_dan: duong_dan,
    noi_dung: item.noi_dung,
    ngon_ngu: item.ngon_ngu,
    locale: item.locale,
    createdAt: now,
    updatedAt: now,
  }));

  await db.insert(tables.baiviet_ngonngu).values(baivietNgonNguList);

  // 4. Trả lại thông tin đã lưu
  const result = await db
    .select()
    .from(tables.baiviet)
    .where(eq(tables.baiviet.id, id))
    .leftJoin(
      tables.baiviet_ngonngu,
      eq(tables.baiviet.id, tables.baiviet_ngonngu.baivietId)
    )
    .all();

  return result;
});