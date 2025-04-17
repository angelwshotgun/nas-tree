import type { RestData } from '../models/base-response.model';
import type { MapBBox } from '../models/dto/response/map-bbox.model';
import { EnumStatus } from '../utils/enums';
import { BaseService } from './base.service';

class _MapService extends BaseService {
  async getBBox(provinceCode?: string): Promise<MapBBox | undefined> {
    const res = await $api<RestData<MapBBox>>(
      `/api/map/` + provinceCode || '',
      {
        method: 'GET',
      },
    );

    if (res != null && res.status === EnumStatus.OK) {
      return res.data;
    }
    return undefined;
  }
}
const MapService = new _MapService();
export { MapService };
