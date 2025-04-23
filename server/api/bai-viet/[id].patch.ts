export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const body = await readBody(event);

  const baiviet = await useDrizzle()
    .update(tables.baiviet)
    .set({
      ...body,
      duong_dan: body.tieu_de
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
        .replace(/\s+/g, '-'),
      updatedAt: new Date(),
    })
    .where(eq(tables.baiviet.id, Number(id)))
    .returning()
    .get();

  return baiviet;
});
