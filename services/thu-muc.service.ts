import type { RestData, RestError, RestPagedDataTable } from '../models/base-response.model';
import type { ThuMucModel, ThuMucTreeModel } from '../models/thu-muc/thu-muc.model';

import { BaseService } from './base.service';

class _ThuMucService extends BaseService {
  async getDataTreeFolder(provinceCode: string): Promise<ThuMucTreeModel[] | null> {
    const response = await $api<RestData<ThuMucTreeModel[]>>(
      '/api/thu-muc/tree', {
        method: 'GET',
        params: {
          provinceCode: provinceCode,
        },
      },
    );

    if (response && response.status === EnumStatus.OK) {
      return response.data;
    }

    return null;
  }

  async GetDatatable(
    searchKey?: string,
    length?: number,
    start?: number,
    parentId?: number,
    listProvinceCode?: string[],
  ) {
    const response = await $api<RestPagedDataTable<ThuMucModel[]>>(
      '/api/thu-muc/datatable', {
        method: 'POST',
        body: {
          length: length,
          start: start,
          search: {
            value: searchKey,
            regex: true,
          },
          parentId: parentId,
          listProvinceCode: listProvinceCode,
        },
      },
    );

    if (response && response.status === EnumStatus.OK) {
      return response;
    }

    return null;
  }

  async GetListThuMuc() {
    const response = await $api<RestPagedDataTable<ThuMucModel[]>>(
      '/api/thu-muc', {
        method: 'GET',
        params: {
          page: 1,
          pageSize: 1000,
        },
      },
    );

    if (response && response.status === EnumStatus.OK) {
      return response.data;
    }

    return [];
  }

  async GetThuMuc(id: number) {
    const res = await $api<RestData<ThuMucModel> | RestError>(`/api/thu-muc/get-by-key`, {
      method: 'GET',
      params: {
        id: id,
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

  async Insert(entity: ThuMucModel) {
    const res = await $api<RestData<number> | RestError>(`/api/thu-muc`, {
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

  async Update(entity: ThuMucModel) {
    const res = await $api<RestData<number> | RestError>(`/api/thu-muc`, {
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

  async Delete(entity: ThuMucModel) {
    const res = await $api<RestData<number>>(`/api/thu-muc`, {
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

const ThuMucService = new _ThuMucService();

export { ThuMucService };
