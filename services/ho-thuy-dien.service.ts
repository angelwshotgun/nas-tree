import type {
  RestData,
  RestPagedDataTable,
} from '../models/base-response.model';
import type { HoChuaChart } from '../models/ho-chua-chart.model';
import type {
  DMDungTichModel,
  HoThuyDienModel,
} from '../models/ho-thuydien.model';
import { BaseService } from './base.service';

class _HoThuyDienService extends BaseService {
  async getListByTime(
    id_ho: number,
    option: number,
    fromDate?: Date,
    toDate?: Date,
    provinceCodes?: string[],
  ) {
    const response = await $api<RestData<HoChuaChart[]>>(
      `/api/giatri-quantrac-ho-thuydien/list-by-time`,
      {
        method: 'POST',
        body: {
          id_ho: id_ho,
          option: option,
          from_date: fromDate,
          to_date: toDate,
          province_codes: provinceCodes,
        },
      },
    );

    if (response != null && response.status === EnumStatus.OK) {
      return response.data || [];
    }
    return [];
  }

  async getHoThuyDienId(id_ho?: number) {
    const response = await $api<RestData<HoChuaChart[] | HoThuyDienModel[]>>(
      `/api/ho-thuydien/${id_ho}`,
      {
        method: 'GET',
      },
    );

    if (response != null && response.status === EnumStatus.OK) {
      return response.data || [];
    }
    return [];
  }

  async getDanhMucDungTich() {
    const response = await $api<RestData<DMDungTichModel[]>>(
      `/api/dm-phanloai-ho-thuydien`,
      {
        method: 'GET',
      },
    );

    if (response != null && response.status === EnumStatus.OK) {
      return response.data || [];
    }
    return [];
  }

  async getHoThuyDienDatatable(
    searchKey?: string,
    length?: number,
    start?: number,
    listPhanLoaiId?: Array<number>,
    listProvinceCodes?: Array<string>,
  ) {
    const res = await $api<RestPagedDataTable<HoThuyDienModel[]>>(
      `/api/ho-thuydien/datatable`,
      {
        method: 'POST',
        body: {
          draw: 1,
          length: length,
          start: start,
          search: {
            value: searchKey,
          },
          listPhanLoaiId: listPhanLoaiId,
          listProvinceCodes: listProvinceCodes,
        },
      },
    );

    if (res != null && res.status === EnumStatus.OK) {
      return res;
    }
    return [];
  }

  async delete(entity: HoThuyDienModel) {
    const res = await $api<RestData<number>>(`/api/ho-thuydien`, {
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

  async update(entity: HoThuyDienModel) {
    const response = await $api<RestPagedDataTable<HoThuyDienModel[]>>(
      `/api/ho-thuydien`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entity),
      },
    );

    if (response) {
      return response;
    }

    return null;
  }

  async insert(entity: HoThuyDienModel) {
    const response = await $api<RestPagedDataTable<HoThuyDienModel[]>>(
      `/api/ho-thuydien`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entity),
      },
    );

    if (response) {
      return response;
    }

    return null;
  }
}

const HoThuyDienService = new _HoThuyDienService();
export { HoThuyDienService };
