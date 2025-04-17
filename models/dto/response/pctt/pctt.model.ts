class PCCTModel {
  id?: number;
  ten_tram?: string;
  ma_tram?: string;
  vi_tri?: string;
  luuvuc_song?: string;
  option?: number;
  ten_lop?: string;
  tram_id?: number;
  id_tram?: number;
  nguon_solieu?: string;
  loaitram_id?: number;
  constructor(
    id?: number,
    ten_tram?: string,
    ma_tram?: string,
    vi_tri?: string,
    luuvuc_song?: string,
    option?: number,
    ten_lop?: string,
    tram_id?: number,
    id_tram?: number,
    nguon_solieu?: string,
    loaitram_id?: number,
  ) {
    this.id = id;
    this.ten_tram = ten_tram;
    this.ma_tram = ma_tram;
    this.vi_tri = vi_tri;
    this.luuvuc_song = luuvuc_song;
    this.option = option;
    this.ten_lop = ten_lop;
    this.tram_id = tram_id;
    this.id_tram = id_tram;
    this.nguon_solieu = nguon_solieu;
    this.loaitram_id = loaitram_id;
  }
}
export { PCCTModel };
