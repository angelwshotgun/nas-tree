import type { CommuneModel, DistrictModel, ProvinceModel } from '../region/region.model';

interface HoThuyLoiModel {
  id: number;
  ma_ho: string;
  ten_ho: string;
  luu_vuc: string;
  lon: number;
  lat: number;
  dia_chi: string;
  province_code: string;
  district_code: string;
  commune_code: string;
  thucdo_mucnuoc: number;
  thucdo_dungtich: number;
  thucdo_luuluong_xa: number;
  thucdo_luuluong_den: number;
  thoigian_ghinhan_cuoi: Date;
  dungtich_toanbo: number;
  dungtich_huuich: number;
  dungtich_chet: number;
  dungtich_phonglu: number;
  mucnuoc_dang_bt: number;
  mucnuoc_dang_gc: number;
  mucnuoc_chet: number;
  xaday_soluong_cuaxa: number;
  xaday_luuluong_xa_lonnhat: number;
  xaday_caotrinh_nguongtran: number;
  xaday_hinhthuc_dongmo: number;
  xasau_soluong_cua: number;
  xasau_luuluong_xa_lonnhat: number;
  xasau_caotrinh_nguongtran: string;
  xasau_hinhthuc_dongmo: string;
  tt_dapdang_caotrinh_dinhdap: string;
  tt_dapdang_chieucao_lonnhat: string;
  thucdo_socua_xa: number;
  dientich_luuvuc: string;
  vuot_mucdang: boolean;
  dang_xa: boolean;
  province: ProvinceModel;
  district: DistrictModel;
  commune: CommuneModel;
  // listGiatriQuantracHoThuyloi: any;
  tabData: string;
}

export type { HoThuyLoiModel };
