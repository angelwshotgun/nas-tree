import type { CommuneModel, DistrictModel, ProvinceModel } from '../region/region.model';

interface HoThuyDienModel {
  id: number;
  ma_ho: string;
  ten_ho: string;
  luu_vuc: string;
  lon: number;
  lat: number;
  province_code: string;
  district_code: string;
  commune_code: string;
  nguon_solieu_id: number;
  dia_chi: string;
  thoigian_ghinhan_cuoi: Date;
  mucnuoc_tl: number;
  mucnuoc_hl: number;
  mucnuoc_dbt: number;
  luuluong_denho: number;
  luuluong_xa_tong: number;
  luuluong_xa_chaymay: number;
  luuluong_xa_tran: number;
  so_cuaxa_day: number;
  so_cuaxa_mat: number;
  so_cuaxa_day_dangmo: number;
  so_cuaxa_mat_dangmo: number;
  mucnuoc_luyke: number;
  dungtich_ho: number;
  cong_suat: number;
  phanloai_id: number;
  // phanLoaiHoThuyDien: number;
  // nguonSoLieu: any;
  province: ProvinceModel;
  district: DistrictModel;
  commune: CommuneModel;
  // listGiatriQuantracHoThuyloi: any;
  tabData: string;
}

export type { HoThuyDienModel };
