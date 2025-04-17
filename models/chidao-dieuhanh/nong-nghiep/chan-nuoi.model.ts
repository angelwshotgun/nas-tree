interface ChanNuoiSoLuongModel {
  loaiVatNuoi: Array<loaiVatNuoi>;
  hanhChinh: Array<ChanNuoiHanhChinh>;
}

interface loaiVatNuoi {
  mo_ta: string;
  gia_tri: number;
}

interface ChanNuoiHanhChinh {
  ten_hanhchinh: string;
  solieu_chitiet: string;
  solieu_chitiet_array: Array<ChanNuoiSoLieuChiTiet>;
}

interface ChanNuoiSoLieuChiTiet {
  mo_ta: string;
  gia_tri: number;
}

export type { ChanNuoiSoLuongModel, ChanNuoiHanhChinh, ChanNuoiSoLieuChiTiet };
