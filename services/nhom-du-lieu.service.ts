import type {
  RestData,
} from '../models/base-response.model';
import type { NhomDuLieuModel } from '../models/dto/response/nhom-du-lieu/nhom-du-lieu.model';
import { EnumStatus } from '../utils/enums';
import { BaseService } from './base.service';

class _NhomDuLieuService extends BaseService {
  async listNhomDuLieu(parentId: number) {
    const res = await $api<RestData<NhomDuLieuModel[]>>(
      `/api/dm-nhom-dulieu/list`,
      {
        method: 'GET',
        params: {
          parentId: parentId,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }
    return [];
  }
}

const NhomDuLieuService = new _NhomDuLieuService();
export { NhomDuLieuService };
