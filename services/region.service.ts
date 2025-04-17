import type { RestData } from '../models/base-response.model';
import type {
  CommuneModel,
  DistrictModel,
  ProvinceModel,
} from '../models/dto/response/region/region.model';
import { BaseService } from './base.service';

class _RegionService extends BaseService {
  async getRegionById(area_id: string) {
    const res = await $api<
      RestData<ProvinceModel | DistrictModel | CommuneModel>
    >(`/api/region/${area_id}`, {
      method: 'GET',
    });
    if (res != null && res.status === EnumStatus.OK) {
      return res.data;
    }
    return {};
  }

  async getProvinceList() {
    const res = await $api<RestData<ProvinceModel[]>>(
      `/api/region/provinces`,
      {
        method: 'GET',
        params: {
          q: '',
        },
      },
    );
    if (res != null && res.status === EnumStatus.OK) {
      return res.data;
    }
    return [];
  }

  async getDistrictList(parentId?: string, lng?: number, lat?: number, radius?: number) {
    const res = await $api<RestData<DistrictModel[]>>(
      `/api/region/districts`,
      {
        method: 'GET',
        params: {
          parent_id: parentId,
          q: '',
          lon: lng,
          lat: lat,
          radius: radius,
        },
      },
    );
    if (res != null && res.status === EnumStatus.OK) {
      return res.data;
    }
    return [];
  }

  async getCommuneList(parent_id?: string) {
    const res = await $api<RestData<CommuneModel[]>>(
      `/api/region/communes`,
      {
        method: 'GET',
        params: {
          parent_id: parent_id,
          q: '',
        },
      },
    );
    if (res != null && res.status === EnumStatus.OK) {
      return res.data;
    }
    return [];
  }

  async getMultiCommuneList(parent_ids: Array<string>, lng?: number, lat?: number, radius?: number) {
    const formData = new FormData();
    if (lng) {
      formData.append('lon', lng.toString());
    }
    if (lat) {
      formData.append('lat', lat.toString());
    }
    if (radius) {
      formData.append('radius', radius.toString());
    }
    parent_ids.forEach((item) => {
      formData.append('parent_ids', item);
    });
    const res = await $api<RestData<CommuneModel[]>>(
      `/api/region/multi-communes`,
      {
        method: 'POST',
        body: formData,
      },
    );
    if (res != null && res.status === EnumStatus.OK) {
      return res.data;
    }
    return null;
  }
}
const RegionService = new _RegionService();
export { RegionService };
