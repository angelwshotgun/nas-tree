export class TaiLieuModel {
  id?: number;
  mo_ta?: string;
  tenfile_luutru?: string;
  tenfile_goc?: string;
  ngay_phathanh?: Date;
  so_vanban?: string;
  donvi_phathanh?: string;
  ghi_chu?: string;
  loai_tailieu_id?: number;
  loaiTaiLieu?: Array<LoaiTaiLieuModel>;
  thumuc_id?: number;
  province_code?: string;
  constructor() {
    this.id = 0;
    this.mo_ta = undefined;
    this.tenfile_luutru = undefined;
    this.tenfile_goc = undefined;
    this.ngay_phathanh = undefined;
    this.so_vanban = undefined;
    this.donvi_phathanh = undefined;
    this.ghi_chu = undefined;
    this.loai_tailieu_id = undefined;
  }
}
export interface LoaiTaiLieuModel {
  nhom_tailieu_id: number;
  nhomTaiLieu: null;
  id: number;
  mo_ta: string;
  order_id: number;
}
