export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const body = await readBody(event);

  const thumuc = await useDrizzle()
    .update(tables.thumuc)
    .set({
      ...body,
      duong_dan: body.ten_thumuc
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
    .where(eq(tables.thumuc.id, Number(id)))
    .returning()
    .get();

  return thumuc;
});
