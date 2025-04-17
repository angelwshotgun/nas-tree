import type { CategoryModel } from '../categories/category.model';
import type {
  ProvinceModel,
  DistrictModel,
  CommuneModel,
} from '../region/region.model';

class TramQuanTracModel {
  id?: number;
  ma_tram?: string;
  ten_tram?: Date;
  loaitram_id?: number;
  nguon_solieu_id?: number;
  thuoc_tinh?: string;
  thuoc_song?: string;
  province_codes?: string[];
  lon?: number;
  lat?: number;
  giatri_baodong_cap1?: number;
  giatri_baodong_cap2?: number;
  giatri_baodong_cap3?: number;
  giatri_baodong_capcuoi?: number;
  thoigian_ghinhan_cuoi?: Date;
  cap_baodong_hientai?: number;
  cap_do?: number;
  giatri_dinh_lichsu?: number;
  nam_dinh_lichsu?: number;
  giatri_tong_24h?: number;
  giatri_tong_3d?: number;
  giatri_tong_7d?: number;
  can_theodoi?: boolean;
  district_code?: string;
  thuoc_huyen?: string;
  luuvuc_song?: string;
  vi_tri?: string;
  nguonSoLieu?: NguonSoLieu;
  loaiQuanTrac?: LoaiQuanTrac;
  province?: ProvinceModel;
  district?: DistrictModel;
  listGiatriQuantracTram?: listGiatriQuantracTram[];
}

export interface listGiatriQuantracTram {
  id: number;
  tram_id: number;
  tram_quantrac: string;
  giatri_quantrac: number;
  thoigian_ghinhan: Date;
  thoigian_capnhat: Date;
  obs: number;
  gio_ghinhan: number;
  giatri_tanggiam: number;
  xuhuong: number;
  huong_gio: number;
  tocdo_gio: number;
  cap_gio: string;
}
export interface LoaiQuanTrac {
  id: number;
  moTa: string;
  orderId: number;
}

export interface NguonSoLieu {
  id: number;
  mo_ta: string;
  order_id: number;
}

export { TramQuanTracModel };
