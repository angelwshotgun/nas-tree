export default defineEventHandler(async (event) => {
  try {
    // Lấy dữ liệu từ cơ sở dữ liệu
    const result = await useDrizzle()
      .select({
        id: tables.thumuc.id,
        thu_tu: tables.thumuc.thu_tu,
        duong_dan: tables.thumuc.duong_dan,
        thumuc_ngonngu: {
          id: tables.thumuc_ngonngu.id,
          thumucId: tables.thumuc_ngonngu.thumucId,
          ten_thumuc: tables.thumuc_ngonngu.ten_thumuc,
          ngon_ngu: tables.thumuc_ngonngu.ngon_ngu,
          locale: tables.thumuc_ngonngu.locale,
          createdAt: tables.thumuc_ngonngu.createdAt,
          updatedAt: tables.thumuc_ngonngu.updatedAt,
        },
      })
      .from(tables.thumuc)
      .leftJoin(
        tables.thumuc_ngonngu,
        eq(tables.thumuc.id, tables.thumuc_ngonngu.thumucId)
      )
      .orderBy(tables.thumuc.thu_tu)
      .all();

    // Nhóm dữ liệu theo thư mục
    const thumucsMap = new Map();

    for (const item of result) {
      if (!thumucsMap.has(item.id)) {
        const englishName = result.find(r => r.id === item.id && r.thumuc_ngonngu?.ngon_ngu === 'en')?.thumuc_ngonngu?.ten_thumuc || '';
        thumucsMap.set(item.id, {
          id: item.id,
          thu_tu: item.thu_tu,
          duong_dan: item.duong_dan,
          ten_thumuc: englishName,
          thumuc_ngonngu: []
        });
      }

      // Thêm thông tin thumuc_ngonngu nếu có
      if (item.thumuc_ngonngu?.id) {
        thumucsMap.get(item.id).thumuc_ngonngu.push(item.thumuc_ngonngu);
      }
    }

    // Chuyển đổi Map thành mảng
    const thumucs = Array.from(thumucsMap.values());
    
    return {
      success: true,
      data: thumucs,
      message: ''
    };
  } catch (error) {
    let msg = 'Lỗi lấy danh sách thư mục';
    if (error instanceof Error) msg = error.message;
    return {
      success: false,
      data: null,
      message: msg
    };
  }
});