export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const thumuc = await useDrizzle()
    .insert(tables.thumuc)
    .values({
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
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning()
    .get();

  return thumuc;
});
