import type {
  RestBase,
  RestData,
  RestError,
  RestPagedDataTable,
} from '../models/base-response.model';
import type { LinkModel } from '../models/link.model';
import { BaseService } from './base.service';

class _LinkService extends BaseService {
  async getDataTable(
    searchKey?: string,
    length?: number,
    start?: number,
    provinceCode?: string,
  ) {
    const response = await $api<RestPagedDataTable<LinkModel[]>>(
      '/api/link/datatable',
      {
        method: 'POST',
        body: {
          length: length,
          start: start,
          search: {
            value: searchKey,
            regex: true,
          },
          provinceCode: provinceCode,
        },
      },
    );

    if (response && response.status === EnumStatus.OK) {
      return response;
    }

    return null;
  }

  async GetListLink(provinceCode: string) {
    const response = await $api<RestData<LinkModel[]>>('/api/link/list', {
      method: 'GET',
      params: {
        provinceCode: provinceCode,
      },
    });

    if (response && response.status === EnumStatus.OK) {
      return response.data;
    }

    return [];
  }

  async Insert(entity: LinkModel, province_code: string) {
    const res = await $api<RestData<number> | RestError>(`/api/link`, {
      method: 'POST',
      body: JSON.stringify({ ...entity, province_code }),
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

  async Update(entity: LinkModel) {
    const res = await $api<RestData<number> | RestError>(`/api/link`, {
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

  async Delete(entity: LinkModel) {
    const res = await $api<RestData<number>>(`/api/link`, {
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

const LinkService = new _LinkService();
export { LinkService };
