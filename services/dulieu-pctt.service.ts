import type { RestData } from '../models/base-response.model';
import type { Layer, TreeModel } from '../models/dto/response/tree/tree.model';
import { BaseService } from './base.service';

class _DuLieuPCTTService extends BaseService {
  async listDuLieuPCTT(nhomId?: number) {
    const res = await $api<RestData<TreeModel[]>>(
      `/api/dulieu-pctt`,
      {
        method: 'GET',
        params: {
          nhomId: nhomId,
        },
      },
    );

    if (res != null && res.status === EnumStatus.OK) {
      return res.data;
    }
    return [];
  }

  async listDefaultLayers() {
    const res = await $api<RestData<Layer[]>>(
      `/api/dulieu-pctt/mac-dinh`,
      {
        method: 'GET',
        params: {},
      },
    );

    if (res != null && res.status === EnumStatus.OK) {
      return res.data;
    }
    return [];
  }
}

const DuLieuPCTTService = new _DuLieuPCTTService();

export { DuLieuPCTTService };
