class HoThuyLoiPopupInfo {
  constructor() {
    this.id_ho = 0;
    this.ten_ho = '';
  }

  id_ho: number;
  ma_ho?: string;
  ten_ho: string;
  mucnuoc_dang_bt?: number;
  mucnuoc_tl?: number;
  qden?: number;
  qxa?: number;
  dungtich_toanbo?: number;
  thoigian_ghinhan_cuoi?: Date;
  thoigian_ghinhan_mucnuoc?: Date;
}

export { HoThuyLoiPopupInfo };
