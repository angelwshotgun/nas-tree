class ProvinceModel {
  area_id?: string;
  name_vn?: string;
  visible?: boolean;
  search_content?: string;

  constructor(area_id?: string, name_vn?: string, visible?: boolean, search_content?: string) {
    this.area_id = area_id;
    this.name_vn = name_vn;
    this.visible = visible;
    this.search_content = search_content;
  }
}
class DistrictModel {
  area_id?: string;
  name_vn?: string;
  parent_id?: string;
  visible?: boolean;
  province?: string;
  geo_json?: string;
  constructor(
    area_id?: string,
    name_vn?: string,
    parent_id?: string,
    visible?: boolean,
    province?: string,
    geo_json?: string,
  ) {
    this.area_id = area_id;
    this.name_vn = name_vn;
    this.parent_id = parent_id;
    this.visible = visible;
    this.province = province;
    this.geo_json = geo_json;
  }
}

class CommuneModel {
  area_id?: string;
  name_vn?: string;
  parent_id?: string;
  proid_2004?: string;
  district?: string;
  search_content?: string;
  geo_json?: string;
  constructor(
    area_id?: string,
    name_vn?: string,
    parent_id?: string,
    proid_2004?: string,
    district?: string,
    search_content?: string,
    geo_json?: string,
  ) {
    this.area_id = area_id;
    this.name_vn = name_vn;
    this.parent_id = parent_id;
    this.proid_2004 = proid_2004;
    this.district = district;
    this.search_content = search_content;
    this.geo_json = geo_json;
  }
}

export { ProvinceModel, DistrictModel, CommuneModel };
