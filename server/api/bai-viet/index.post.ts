export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const baiviet = await useDrizzle()
    .insert(tables.baiviet)
    .values({
      ...body,
      id: null,
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
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning()
    .get();

  return baiviet;
});
