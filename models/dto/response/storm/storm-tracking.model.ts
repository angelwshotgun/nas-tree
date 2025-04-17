class StormTrackingModel {
  id?: number;
  storm_id?: number;
  storm?: string;
  lon?: string;
  lat?: string;
  date_received?: Date;
  direction?: string;
  level?: number;
  forecast_effect_region?: string;
  damages?: string;
  geom?: string;
  intensity?: number;
  constructor(
    id?: number,
    storm_id?: number,
    storm?: string,
    lon?: string,
    lat?: string,
    date_received?: Date,
    direction?: string,
    level?: number,
    forecast_effect_region?: string,
    damages?: string,
    geom?: string,
    intensity?: number,
  ) {
    this.id = id;
    this.storm_id = storm_id;
    this.storm = storm;
    this.lon = lon;
    this.lat = lat;
    this.date_received = date_received;
    this.direction = direction;
    this.level = level;
    this.forecast_effect_region = forecast_effect_region;
    this.damages = damages;
    this.geom = geom;
    this.intensity = intensity;
  }
}

export { StormTrackingModel };
