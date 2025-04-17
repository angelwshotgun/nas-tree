class SuKienThienTaiModel {
  id?: number;
  khuvuc_anhhuong?: string;
  thoigian_capnhat?: Date;
  lon?: number;
  lat?: number;
  loai_thientai_id?: number;
  lien_ket?: string;
  ten_tiengviet?: string;
  ten_tienganh?: string;
  cap_do?: number;
  capdo_thientai?: string;
  huong_dichuyen?: string;
  mo_ta?: string;
  da_ketthuc?: boolean;
  district_code?: string;
  // search_content?:
  bao_vn_id?: number;
  bao_qt_id?: number;
  thoigian_batdau?: Date;
  province_codes?: string[];
  da_pheduyet?: string;
  nguon_solieu?: string;
  loaiThienTai?: LoaiThienTai;
  listVanBan?: ListVanBan[];
  thoigian_ketthuc?: Date;
  listKhuVuc?: listKhuVuc[];
}

export interface listKhuVuc {
  id?: number;
  province_code?: string;
  district_code?: string;
  commune_code?: string;
  sukien_thientai_id?: string;
}

export interface ListVanBan {
  id: number;
  mo_ta: string;
  tenfile_luutru: string;
  tenfile_goc: string;
  ngay_phathanh: Date;
  so_vanban: string;
  donvi_phathanh: string;
  ghi_chu: string;
  loai_tailieu_id: number;
  loaiTaiLieu: null;
}
export interface LoaiThienTai {
  mo_ta: string;
  icon: string;
  id: number;
  order_id: number;
}

export { SuKienThienTaiModel };
