import type {
  RestData,
  RestError,
} from '../models/base-response.model';
import type { CategoryModel } from '../models/dto/response/categories/category.model';
import { BaseService } from './base.service';

class _DonViService extends BaseService {
  async Insert(entity: CategoryModel) {
    const res = await $api<RestData<number> | RestError>(`/api/dm-donvi`, {
      method: 'POST',
      body: JSON.stringify(entity),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res && res.status == EnumStatus.OK) {
      return res as RestData<number>;
    }
    else if (res && res.status == EnumStatus.ERROR) {
      return res as RestError;
    }

    return null;
  }

  async Edit(entity: CategoryModel) {
    const res = await $api<RestData<number> | RestError>(`/api/dm-donvi`, {
      method: 'PUT',
      body: JSON.stringify(entity),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res && res.status == EnumStatus.OK) {
      return res as RestData<number>;
    }
    else if (res && res.status == EnumStatus.ERROR) {
      return res as RestError;
    }
    return null;
  }

  async Delete(entity: CategoryModel) {
    const res = await $api<RestData<number>>(`/api/dm-donvi`, {
      method: `DELETE`,
      body: JSON.stringify(entity),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res && res.status == EnumStatus.OK) {
      return res;
    }
    return null;
  }
}

const DonViService = new _DonViService();
export { DonViService };
