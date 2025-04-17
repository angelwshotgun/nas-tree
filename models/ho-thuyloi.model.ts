class HoThuyLoiModel {
  id?: number;
  ma_ho?: string;
  ten_ho?: string;
  luu_vuc?: string;
  lon?: number;
  lat?: number;
  dia_chi?: string;
  province_code?: string;
  district_code?: string;
  commune_code?: string;
  thucdo_mucnuoc?: number;
  thucdo_dungtich?: number;
  thucdo_luuluong_xa?: number;
  thucdo_luuluong_den?: number;
  thoigian_ghinhan_cuoi?: Date;
  dungtich_toanbo?: number;
  dungtich_huuich?: number;
  dungtich_chet?: number;
  dungtich_phonglu?: number;
  mucnuoc_dang_bt?: number;
  mucnuoc_dang_gc?: number;
  mucnuoc_chet?: number;
  xaday_soluong_cuaxa?: number;
  xaday_luuluong_xa_lonnhat?: string;
  xaday_caotrinh_nguongtran?: string;
  xaday_hinhthuc_dongmo?: string;
  xasau_soluong_cua?: number;
  xasau_luuluong_xa_lonnhat?: number;
  xasau_caotrinh_nguongtran?: string;
  xasau_hinhthuc_dongmo?: string;
  tt_dapdang_caotrinh_dinhdap?: string;
  tt_dapdang_chieucao_lonnhat?: string;
  thucdo_socua_xa?: number;
  dientich_luuvuc?: string;
  donvi_quanly?: string;
  vuot_mucdang?: boolean;
  dang_xa?: boolean;
  province?: Province;
  district?: District;
  commune?: Commune;
  listGiatriQuantracHoThuyloi?: ListGiatriQuantracHoThuyloi[];
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

export interface ListGiatriQuantracHoThuyloi {
  id: number;
  ho_id: number;
  ho_thuyloi: string;
  thoigian_ghinhan: Date;
  thoigian_capnhat: Date;
  muc_nuoc: number;
  dung_tich: number;
  luuluong_xa: number;
  luuluong_den: number;
  so_cuaxa: number;
}

export { HoThuyLoiModel };
