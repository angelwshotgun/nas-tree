import type { StormTrackingModel } from './storm-tracking.model';

class StormModel {
  id?: number;
  storm_name?: string;
  international_name?: string;
  current_lon?: string;
  current_lat?: string;
  level?: number;
  direction?: string;
  effect_region?: string;
  date_start?: Date;
  date_end?: Date;
  damages?: string;
  death_person?: number;
  damages_cost?: string;
  intensity?: number;
  storm_id_vn?: number;
  listStormTracking?: StormTrackingModel;
  constructor(
    id?: number,
    storm_name?: string,
    international_name?: string,
    current_lon?: string,
    current_lat?: string,
    level?: number,
    direction?: string,
    effect_region?: string,
    date_start?: Date,
    date_end?: Date,
    damages?: string,
    death_person?: number,
    damages_cost?: string,
    intensity?: number,
    storm_id_vn?: number,
    listStormTracking?: StormTrackingModel,
  ) {
    this.id = id;
    this.storm_name = storm_name;
    this.international_name = international_name;
    this.current_lon = current_lon;
    this.current_lat = current_lat;
    this.level = level;
    this.direction = direction;
    this.effect_region = effect_region;
    this.date_start = date_start;
    this.date_end = date_end;
    this.damages = damages;
    this.death_person = death_person;
    this.damages_cost = damages_cost;
    this.intensity = intensity;
    this.storm_id_vn = storm_id_vn;
    this.listStormTracking = listStormTracking;
  }
}

export { StormModel };
