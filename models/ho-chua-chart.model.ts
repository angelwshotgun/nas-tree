import type { District, HoThuyDienModel } from './ho-thuydien.model';

class HoChuaChart {
  district?: District;
  ho_id?: number;
  ten_ho?: string;
  lon?: number;
  lat?: number;
  thucdo_mucnuoc?: number;
  thucdo_dungtich?: number;
  thucdo_cuaxa?: number;
  thucdo_ll_xa?: number;
  thucdo_ll_den?: number;
  thietke_mucnuoc_dang_bt?: number;
  thietke_mucnuoc_dang_gc?: number;
  thietke_mucnuoc_quytrinh?: number;
  thietke_wtb?: number;
  thietke_hmax?: number;
  thietke_flv?: number;
  thoigian_ghinhan?: Date;
  thoigian_capnhat?: Date;
  ho_thuydien?: HoThuyDienModel;
  luuluong_denho?: number;
  muc_nuoc?: number;
  dung_tich?: number;
  luuluong_xa?: number;
  luuluong_den?: number;
  so_cuaxa?: number;
  dungtich_toanbo?: number;
  thucdo_luuluong_xa?: number;
  thucdo_luuluong_den?: number;
  dungtich_huuich?: number;
  dungtich_chet?: number;
  dungtich_phonglu?: number;
  thietke_mucnuoc_chet?: number;
  constructor(
    district?: District,
    ho_id?: number,
    ten_ho?: string,
    lon?: number,
    lat?: number,
    thucdo_mucnuoc?: number,
    thucdo_dungtich?: number,
    thucdo_cuaxa?: number,
    thucdo_ll_xa?: number,
    thucdo_ll_den?: number,
    thietke_mucnuoc_dang_bt?: number,
    thietke_mucnuoc_quytrinh?: number,
    thietke_wtb?: number,
    thietke_hmax?: number,
    thietke_flv?: number,
    thoigian_ghinhan?: Date,
    thoigian_capnhat?: Date,
    ho_thuydien?: HoThuyDienModel,
    luuluong_denho?: number,
    muc_nuoc?: number,
    dung_tich?: number,
    luuluong_xa?: number,
    luuluong_den?: number,
    so_cuaxa?: number,
    dungtich_toanbo?: number,
    thucdo_luuluong_xa?: number,
    thucdo_luuluong_den?: number,
    dungtich_huuich?: number,
    dungtich_chet?: number,
    dungtich_phonglu?: number,

    thietke_mucnuoc_chet?: number,
  ) {
    this.district = district;
    this.ho_id = ho_id;
    this.ten_ho = ten_ho;
    this.lon = lon;
    this.lat = lat;
    this.thucdo_mucnuoc = thucdo_mucnuoc;
    this.thucdo_dungtich = thucdo_dungtich;
    this.thucdo_cuaxa = thucdo_cuaxa;
    this.thucdo_ll_xa = thucdo_ll_xa;
    this.thucdo_ll_den = thucdo_ll_den;
    this.thietke_mucnuoc_dang_bt = thietke_mucnuoc_dang_bt;
    this.thietke_mucnuoc_quytrinh = thietke_mucnuoc_quytrinh;
    this.thietke_wtb = thietke_wtb;
    this.thietke_hmax = thietke_hmax;
    this.thietke_flv = thietke_flv;
    this.thoigian_ghinhan = thoigian_ghinhan;
    this.thoigian_capnhat = thoigian_capnhat;
    this.ho_thuydien = ho_thuydien;
    this.luuluong_denho = luuluong_denho;
    this.muc_nuoc = muc_nuoc;
    this.dung_tich = dung_tich;
    this.luuluong_xa = luuluong_xa;
    this.luuluong_den = luuluong_den;
    this.so_cuaxa = so_cuaxa;
    this.dungtich_toanbo = dungtich_toanbo;
    this.thucdo_luuluong_xa = thucdo_luuluong_xa;
    this.thucdo_luuluong_den = thucdo_luuluong_den;
    this.dungtich_huuich = dungtich_huuich;
    this.dungtich_chet = dungtich_chet;
    this.dungtich_phonglu = dungtich_phonglu;

    this.thietke_mucnuoc_chet = thietke_mucnuoc_chet;
  }
}
export { HoChuaChart };
