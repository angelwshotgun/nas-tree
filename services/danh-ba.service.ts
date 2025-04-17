import type {
  RestData,
  RestError,
  RestPagedDataTable,
} from '../models/base-response.model';
import type { DanhBaModel } from '../models/danh-ba.model';
import { BaseService } from './base.service';

class _DanhbaService extends BaseService {
  async getDanhBaDatatable(
    searchKey?: string,
    length?: number,
    start?: number,
    listDonViId?: Array<number>,
    districtCodes?: string,
    listProvinceCode?: Array<string>,
  ) {
    const res = await $api<RestPagedDataTable<DanhBaModel[]>>(
      `/api/danh-ba/datatable`,
      {
        method: 'POST',
        body: {
          draw: 1,
          length: length,
          start: start,
          search: {
            value: searchKey,
          },
          districtCodes: districtCodes,
          listDonViId: listDonViId,
          listProvinceCode: listProvinceCode,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res;
    }
    return null;
  }

  async getDanhBaID(id?: number) {
    const res = await $api<RestPagedDataTable<DanhBaModel[]>>(
      `/api/danh-ba/${id}`,
      {
        method: 'GET',
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res;
    }
    return null;
  }

  async Insert(entity: DanhBaModel) {
    const res = await $api<RestData<number> | RestError>(`/api/danh-ba`, {
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

  async Edit(entity: DanhBaModel) {
    const res = await $api<RestData<number> | RestError>(`/api/danh-ba`, {
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

  async Delete(entity: DanhBaModel) {
    const res = await $api<RestData<number>>(`/api/danh-ba`, {
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

const DanhbaService = new _DanhbaService();
export { DanhbaService };
