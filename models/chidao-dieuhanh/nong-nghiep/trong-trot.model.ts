interface TrongTrotDienTichModel {
  loaiCayTrong: Array<LoaiCayTrongModel>;
  hanhChinh: Array<TrongTrotDienTichHanhChinhModel>;
}

interface LoaiCayTrongModel {
  mo_ta: string;
  gia_tri: number;
}

interface TrongTrotDienTichHanhChinhModel {
  ten_hanhchinh: string;
  solieu_chitiet: string;
  solieu_chitiet_array: Array<TrongTrotDienTichSoLieuChiTietModel>;
}

interface TrongTrotDienTichSoLieuChiTietModel {
  mo_ta: string;
  gia_tri: number;
}

export type { TrongTrotDienTichModel, TrongTrotDienTichHanhChinhModel, TrongTrotDienTichSoLieuChiTietModel };
