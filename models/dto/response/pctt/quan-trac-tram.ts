import type { CategoryModel } from '../categories/category.model';

export interface TramQuantrac {
  id: number;
  ma_tram: string;
  ten_tram: string;
  loaitram_id: number;
  nguon_solieu_id: number;
  thuoc_tinh?: string;
  thuoc_song?: string;
  province_codes: string[];
  lon?: number;
  lat?: number;
  giatri_baodong_cap1?: string;
  giatri_baodong_cap2?: string;
  giatri_baodong_cap3: string;
  giatri_ghinhan_cuoi: string;
  thoigian_ghinhan_cuoi: string;
  cap_baodong_hientai: string;
  giatri_dinh_lichsu: string;
  nam_dinh_lichsu: string;
  giatri_tong_24h: string;
  giatri_tong_3d: string;
  giatri_tong_7d: string;
  can_theodoi?: boolean;
  district_code: string;
  thuoc_huyen: string;
  luuvuc_song: string;
  vi_tri: string;
  listGiatriQuantracTram: GiaTriQuanTracTram[];
  loaiQuanTrac: CategoryModel;
  nguonSoLieu: CategoryModel;
}

export interface GiaTriQuanTracTram {
  id?: number;
  tram_id?: number;
  tram_quantrac?: string;
  giatri_quantrac?: number;
  thoigian_ghinhan?: Date;
  thoigian_capnhat?: Date;
  obs?: number;
  gio_ghinhan?: number;
  giatri_tanggiam?: number;
  xuhuong?: number;
  huong_gio?: number;
  tocdo_gio?: number;
  cap_gio?: string;
}
