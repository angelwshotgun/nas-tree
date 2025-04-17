class RainPopupInfo {
  constructor() {
    this.id_tram = 0;
    this.loai_tram = '';
    this.loaitram_id = 1;
    this.nguon_solieu = '';
    this.nguon_solieu_id = 0;
    this.ten_tram = '';
    this.tram_id;
    this.station_id;
    this.source_name;
    this.source;
  }

  id_tram: number;
  loai_tram: string;
  loaitram_id: number;
  luuvuc_song?: string;
  ma_tram?: string;
  nguon_solieu: string;
  nguon_solieu_id: number;
  ten_tram: string;
  vi_tri?: string;
  giatri_tong_24h?: number;
  giatri_tong_3d?: number;
  giatri_tong_7d?: number;
  tram_id?: number; // tram_id = id_tram = station_id
  station_id?: number;
  source_name?: string; // source_name = nguon_solieu = source
  source?: string;
}

export { RainPopupInfo };
