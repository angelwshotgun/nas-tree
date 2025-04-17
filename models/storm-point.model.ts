export interface StormPoint {
  id: number;
  storm_name_vn: string;
  storm_name_en: string;
  storm_type: number;
  lon: number;
  lat: number;
  v_max: number;
  p_min: number;
  source_type: number;
  storm_level: number;
  storm_status: number;
  storm_id_vn: number;
  fc_time_name: number;
  received_time: Date;
  date_received_str: string;
  time_received_str: string;
  area_wind_level_6: number;
  area_wind_level_10: number;
  area_wind_level_center: number;
  data_type: number;
  ref_id: number;
  storm_type_name: StormTypeName;
  storm_status_name: StormStatusName;
  storm_source_name: StormSourceName;
}

export interface StormSourceName {
  id: number;
  description?: string;
}

export interface StormStatusName {
  status_postfix?: string;
  id?: number;
  description?: string;
}

export interface StormTypeName {
  symbol_name?: string;
  id?: number;
  description?: string;
}
