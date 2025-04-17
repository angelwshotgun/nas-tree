export interface VanBanSuKienThienTaiModel {
  sukien_thientai_id: number;
  suKienThienTai: null;
  vanban_tailieu_id: number;
  vanBan: VanBan;
}

export interface VanBan {
  id: number;
  mo_ta: string;
  tenfile_luutru: string;
  tenfile_goc: string;
  ngay_phathanh: Date;
  so_vanban: string;
  donvi_phathanh: string;
  ghi_chu: string;
  loai_tailieu_id: number;
  loaiTaiLieu: LoaiTaiLieu;
}

export interface LoaiTaiLieu {
  nhom_tailieu_id: number;
  nhomTaiLieu: null;
  id: number;
  mo_ta: string;
  order_id: number;
}
