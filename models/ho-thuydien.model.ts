class HoThuyDienModel {
  id?: number;
  ma_ho?: string;
  ten_ho?: string;
  luu_vuc?: string;
  lon?: number;
  lat?: number;
  province_code?: string;
  district_code?: string;
  commune_code?: string;
  nguon_solieu_id?: number;
  phanloai_id?: number;
  dia_chi?: string;
  thoigian_ghinhan_cuoi?: Date;
  mucnuoc_tl?: number;
  mucnuoc_hl?: number;
  mucnuoc_dbt?: number;
  luuluong_denho?: number;
  luuluong_xa_tong?: number;
  luuluong_xa_chaymay?: number;
  luuluong_xa_tran?: number;
  so_cuaxa_day?: number;
  so_cuaxa_mat?: number;
  so_cuaxa_day_dangmo?: number;
  so_cuaxa_mat_dangmo?: number;
  mucnuoc_luyke?: number;
  dungtich_ho?: number;
  cong_suat?: number;
  dang_xa?: boolean;
  vuot_mucdang?: boolean;
  nguonSoLieu?: NguonSoLieu;
  phanLoaiHo?: DMDungTichModel;
  province?: Province;
  district?: District;
  commune?: Commune;
  mucnuoc_chet?: number;
  listGiatriQuantracHoThuydien?: ListGiatriQuantracHoThuydien[];
}

export interface Commune {
  area_id: string;
  name_vn: string;
  parent_id: string;
  province_code: string;
  district: District;
  search_content: string[];
  geo_json: string;
}

export interface District {
  area_id: string;
  name_vn: string;
  parent_id: string;
  visible: boolean;
  province: Province;
  geo_json: string;
}

export interface Province {
  area_id: string;
  name_vn: string;
  visible: boolean;
}

export interface ListGiatriQuantracHoThuydien {
  id: number;
  ho_id: number;
  ho_thuydien: string;
  thoigian_ghinhan: Date;
  thoigian_capnhat: Date;
  mucnuoc_tl: number;
  mucnuoc_hl: number;
  mucnuoc_dbt: number;
  luuluong_denho: number;
  luuluong_xa_tong: number;
  luuluong_xa_chaymay: number;
  luuluong_xa_tran: number;
  so_cuaxa_day_dangmo: number;
  so_cuaxa_mat_dangmo: number;
  mucnuoc_luyke: number;
}

export interface NguonSoLieu {
  id: number;
  mo_ta: string;
  order_id: number;
}

export { HoThuyDienModel };

export interface DMDungTichModel {
  id: number;
  mo_ta: string;
  order_id: number;
}
