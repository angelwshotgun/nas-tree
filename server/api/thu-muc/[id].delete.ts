export default defineEventHandler(async (event) => {
  try {
    const { id } = getRouterParams(event);
    const deletedThuMuc = await useDrizzle().delete(tables.thumuc).where(and(
      eq(tables.thumuc.id, Number(id))
    )).returning().get();

    if (!deletedThuMuc) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Không tìm thấy thư mục để xóa'
      });
    }
    return {
      success: true,
      data: deletedThuMuc,
      message: 'Xóa thư mục thành công'
    };
  } catch (error) {
    let msg = 'Lỗi xóa thư mục';
    if (error instanceof Error) msg = error.message;
    return {
      success: false,
      data: null,
      message: msg
    };
  }
});
