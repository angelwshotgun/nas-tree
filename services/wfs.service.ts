import { BaseService } from './base.service';

class _WFSService extends BaseService {
  // async GetGeoJsonTramQuanTrac(loaiTramId?: number, nguonSoLieuId?: number, provinceCode?: string, districtCode?: string) {
  //     const res = await $fetch<GeoJsonModel>(`/api/wfs/tram-quantrac`, {
  //         method: 'GET',
  //         headers: {
  //             Authorization: this.getAccessToken(),
  //         },
  //         params: {
  //             loaiTramId: loaiTramId,
  //             nguonSoLieuId: nguonSoLieuId,
  //             provinceCode: provinceCode,
  //             districtCode: districtCode,
  //         }
  //     });

  //     if (res != null) {
  //         return { type: "geojson", data: res }
  //     }
  //     return {};
  // }

  // async GetGeoJsonHoThuyDien(provinceCode?: string, districtCode?: string) {
  //     const res = await $api<GeoJsonModel>(`/api/wfs/tram-quantrac`, {
  //         method: 'GET',
  //         headers: {
  //             Authorization: this.getAccessToken(),
  //         },
  //         params: {
  //             provinceCode: provinceCode,
  //             districtCode: districtCode,
  //         }
  //     });

  //     if (res != null) {
  //         return { type: "geojson", data: res }
  //     }
  //     return {};
  // }

  // async GetGeoJsonHoThuyLoi(provinceCode?: string, districtCode?: string) {
  //     const res = await $api<GeoJsonModel>(`/api/wfs/ho-thuyloi`, {
  //         method: 'GET',
  //         headers: {
  //             Authorization: this.getAccessToken(),
  //         },
  //         params: {
  //             provinceCode: provinceCode,
  //             districtCode: districtCode,
  //         }
  //     });

  //     if (res != null) {
  //         return { type: "geojson", data: res }
  //     }
  //     return {};
  // }

  async GetGeoJson(url?: string) {
    const res = await $api<GeoJSON.GeoJSON>(`${url}`, {
      method: 'GET',
    });

    return res;
  }
}
const WFSService = new _WFSService();
export { WFSService };
