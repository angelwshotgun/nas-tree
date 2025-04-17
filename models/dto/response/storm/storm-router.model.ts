class StormRouteModel {
  id?: number;
  storm_name_vn?: string;
  storm_name_en?: string;
  storm_type?: number;
  lon?: string;
  lat?: string;
  v_max?: number;
  p_min?: number;
  source_type?: number;
  storm_level?: number;
  received_time?: Date;
  storm_status?: number;
  area_wind_level_6?: number;
  area_wind_level_10?: number;
  area_wind_level_center?: number;
  storm_id_vn?: number;
  data_type?: number;
  storm_id_en?: number;
  track_id?: number;
  obs?: number;
  fc_time_name?: number;
  fc_time_id?: number;
  ref_id?: string;
  constructor(
    id?: number,
    storm_name_vn?: string,
    storm_name_en?: string,
    storm_type?: number,
    lon?: string,
    lat?: string,
    v_max?: number,
    p_min?: number,
    source_type?: number,
    storm_level?: number,
    received_time?: Date,
    storm_status?: number,
    area_wind_level_6?: number,
    area_wind_level_10?: number,
    area_wind_level_center?: number,
    storm_id_vn?: number,
    data_type?: number,
    storm_id_en?: number,
    track_id?: number,
    obs?: number,
    fc_time_name?: number,
    fc_time_id?: number,
    ref_id?: string,
  ) {
    this.id = id;
    this.storm_name_vn = storm_name_vn;
    this.storm_name_en = storm_name_en;
    this.storm_type = storm_type;
    this.lon = lon;
    this.lat = lat;

    this.v_max = v_max;
    this.p_min = p_min;
    this.source_type = source_type;
    this.storm_level = storm_level;
    this.received_time = received_time;
    this.storm_status = storm_status;
    this.area_wind_level_6 = area_wind_level_6;
    this.area_wind_level_10 = area_wind_level_10;
    this.area_wind_level_center = area_wind_level_center;
    this.storm_id_vn = storm_id_vn;
    this.data_type = data_type;
    this.storm_id_en = storm_id_en;
    this.track_id = track_id;
    this.obs = obs;
    this.fc_time_name = fc_time_name;
    this.fc_time_id = fc_time_id;
    this.ref_id = ref_id;
  }
}

export { StormRouteModel };
