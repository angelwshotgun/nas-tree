import type { CommuneModel, DistrictModel } from '../dto/response/region/region.model';

export class QuanTracMuaModel {
  luuvuc?: string;
  lon?: number;
  lat?: number;
  tensong?: string;
  ten_tram?: string;
  ma_tram?: string;
  source_name?: string;
  source_name_map?: string;
  total_obs?: number;
  total?: number;
  color_cell?: string;
  tinh?: string;
  phuongxa?: CommuneModel;
  quanhuyen?: DistrictModel;
  daterain?: Date;
  r1?: number;
  r7?: number;
  r13?: number;
  r19?: number;
  h0?: number;
  h1?: number;
  h2?: number;
  h3?: number;
  h4?: number;
  h5?: number;
  h6?: number;
  h7?: number;
  h8?: number;
  h9?: number;
  h10?: number;
  h11?: number;
  h12?: number;
  h13?: number;
  h14?: number;
  h15?: number;
  h16?: number;
  h17?: number;
  h18?: number;
  h19?: number;
  h20?: number;
  h21?: number;
  h22?: number;
  h23?: number;
  data_date_str?: string[];
  data_date?: DataDate[];
  constructor(
    luuvuc: string,
    lon: number,
    lat: number,
    tensong: string,
    ten_tram: string,
    ma_tram: string,
    source_name: string,
    source_name_map: string,
    total_obs: number,
    total: number,
    color_cell: string,
    tinh: string,
    phuongxa: CommuneModel,
    quanhuyen: DistrictModel,
    daterain: Date,
    r1: number,
    r7: number,
    r13: number,
    r19: number,
    h0: number,
    h1: number,
    h2: number,
    h3: number,
    h4: number,
    h5: number,
    h6: number,
    h7: number,
    h8: number,
    h9: number,
    h10: number,
    h11: number,
    h12: number,
    h13: number,
    h14: number,
    h15: number,
    h16: number,
    h17: number,
    h18: number,
    h19: number,
    h20: number,
    h21: number,
    h22: number,
    h23: number,
    data_date_str?: string[],
    data_date?: DataDate[],
  ) {
    this.luuvuc = luuvuc;
    this.lon = lon;
    this.lat = lat;
    this.tensong = tensong;
    this.ten_tram = ten_tram;
    this.ma_tram = ma_tram;
    this.source_name = source_name;
    this.source_name_map = source_name_map;
    this.total_obs = total_obs;
    this.total = total;
    this.color_cell = color_cell;
    this.tinh = tinh;
    this.phuongxa = phuongxa;
    this.quanhuyen = quanhuyen;
    this.daterain = daterain;
    this.r1 = r1;
    this.r7 = r7;
    this.r13 = r13;
    this.r19 = r19;
    this.h0 = h0;
    this.h1 = h1;
    this.h2 = h2;
    this.h3 = h3;
    this.h4 = h4;
    this.h5 = h5;
    this.h6 = h6;
    this.h7 = h7;
    this.h8 = h8;
    this.h9 = h9;
    this.h10 = h10;
    this.h11 = h11;
    this.h12 = h12;
    this.h13 = h13;
    this.h14 = h14;
    this.h15 = h15;
    this.h16 = h16;
    this.h17 = h17;
    this.h18 = h18;
    this.h19 = h19;
    this.h20 = h20;
    this.h21 = h21;
    this.h22 = h22;
    this.h23 = h23;
    this.data_date_str = data_date_str;
    this.data_date = data_date;
  }
}
export interface DataDate {
  date_rain?: Date;
  giatri_quantrac?: number;
}
