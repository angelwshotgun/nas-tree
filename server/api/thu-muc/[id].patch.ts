export default defineEventHandler(async (event) => {
  try {
    const { id } = getRouterParams(event);
    const body = await readBody(event);
    const db = useDrizzle();

    if (!body.thu_tu || !Array.isArray(body.thumuc_ngonngu) || body.thumuc_ngonngu.length === 0) {
      throw createError({ statusCode: 400, statusMessage: 'Dữ liệu gửi lên không hợp lệ' });
    }

    const thumucNgonNguArr: Array<{ ten_thumuc: string; ngon_ngu: string; locale: string }> = body.thumuc_ngonngu;
    const ten_thumuc_vn = thumucNgonNguArr.find((x) => x.ngon_ngu === 'en')?.ten_thumuc || thumucNgonNguArr[0].ten_thumuc;

    const duong_dan = ten_thumuc_vn
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

    // 1. Update thư mục chính
    const thumuc = await db
      .update(tables.thumuc)
      .set({
        thu_tu: body.thu_tu,
        duong_dan,
        updatedAt: new Date(),
      })
      .where(eq(tables.thumuc.id, Number(id)))
      .returning()
      .get();

    // 2. Update danh sách thông tin ngôn ngữ
    const now = new Date();
    await db
      .delete(tables.thumuc_ngonngu)
      .where(eq(tables.thumuc_ngonngu.thumucId, Number(id)));

    const thumucNgonNguList = thumucNgonNguArr.map((item) => ({
      thumucId: Number(id),
      ten_thumuc: item.ten_thumuc,
      ngon_ngu: item.ngon_ngu,
      locale: item.locale,
      createdAt: now,
      updatedAt: now,
    }));
    await db.insert(tables.thumuc_ngonngu).values(thumucNgonNguList);

    // 3. Trả lại thông tin đã lưu
    const result = await db
      .select()
      .from(tables.thumuc)
      .where(eq(tables.thumuc.id, Number(id)))
      .leftJoin(
        tables.thumuc_ngonngu,
        eq(tables.thumuc.id, tables.thumuc_ngonngu.thumucId)
      )
      .all();

    return {
      success: true,
      data: result,
      message: 'Cập nhật thư mục thành công'
    };
  } catch (error) {
    let msg = 'Lỗi cập nhật thư mục';
    if (error instanceof Error) msg = error.message;
    return {
      success: false,
      data: null,
      message: msg
    };
  }
});