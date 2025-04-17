class CategoryModel {
  id: number;
  mo_ta?: string;
  order_id?: number;
  constructor(id?: number, mo_ta?: string, order_id?: number) {
    this.id = id;
    this.mo_ta = mo_ta;
    this.order_id = order_id ?? 0;
  }
}

class LoaiThienTaiModel extends CategoryModel {
  icon?: string;
}

class NguonSoLieuModel extends CategoryModel {
  so_luong?: number;
}

export { CategoryModel, LoaiThienTaiModel, NguonSoLieuModel };
