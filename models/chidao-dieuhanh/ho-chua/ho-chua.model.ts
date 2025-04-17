interface HoChuaModel {
  total: number;
  thongKeHanhChinh: Array<HoChuaChiTietModel>;
  thongKeDungTich: Array<HoChuaChiTietModel>;
  thongKeHanhChinhDungTich: Array<HoChuaHanhChinHSoLieuModel>;
}

interface HoChuaChiTietModel {
  description: string;
  total: number;
}

interface HoChuaHanhChinHSoLieuModel {
  solieu_array: Array<HoChuaHanhChinHSoLieuChiTietModel>;
  solieu_chitiet: string;
  ten_hanhchinh: number;
}

interface HoChuaHanhChinHSoLieuChiTietModel {
  dungtich: string;
  gia_tri: number;
}

export type { HoChuaModel, HoChuaChiTietModel, HoChuaHanhChinHSoLieuModel, HoChuaHanhChinHSoLieuChiTietModel };
