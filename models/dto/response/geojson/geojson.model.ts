class GeoJsonModel {
  type?: string;
  features?: Array<FeatureModel>;
}

class FeatureModel {
  type?: string;
  geometry?: GeometryModel;
  properties?: object;
}

class GeometryModel {
  type?: string;
  coordinates?: Array<number>;
}

// class PropertiesModel {
//     ma_tram?: string;
//     ten_tram?: string;
//     vi_tri?: string;
//     luuvuc_song?: string;
// }

export { GeoJsonModel };
