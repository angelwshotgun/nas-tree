import type {
  RestData,
  RestPagedDataTable,
} from '../models/base-response.model';
import type { StormModel } from '../models/dto/response/storm/storm.model';
import type { StormPoint } from '../models/storm-point.model';
import { BaseService } from './base.service';

class _StormService extends BaseService {
  async listBySource(): Promise<StormPoint[][]> {
    const res = await $api<RestData<StormPoint[][]>>(
      `/api/storm/list-by-source`,
      {
        method: 'GET',
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }
    return [];
  }

  async getStormDatatable(searchKey?: string, length?: number, start?: number) {
    const res = await $api<RestPagedDataTable<StormModel[]>>(
      `/api/storm/datatable`,
      {
        method: 'POST',
        body: {
          draw: 1,
          length: length,
          start: start,
          search: {
            value: searchKey,
          },
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res;
    }
    return null;
  }

  async getStormTrackingDatatable(
    searchKey?: number,
    length?: number,
    start?: number,
  ) {
    const res = await $api<RestPagedDataTable<StormModel[]>>(
      `/api/storm-tracking/datatable`,
      {
        method: 'POST',
        body: {
          draw: 1,
          length: length,
          start: start,
          stormId: searchKey,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res;
    }
    return null;
  }

  async getIDStorm(id?: number) {
    const res = await $api<RestData<StormModel>>(`/api/storm/${id}`, {
      method: 'GET',
    });

    if (res && res.status === EnumStatus.OK) {
      return res;
    }
    return null;
  }

  async delete(entity: StormModel) {
    const response = await $api<RestPagedDataTable<StormModel[]>>(
      `/api/storm`,
      {
        method: 'DELETE',
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

  async insert(entity: StormModel) {
    const response = await $api<RestPagedDataTable<StormModel[]>>(
      `/api/storm`,
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

  async update(entity: StormModel) {
    const response = await $api<RestPagedDataTable<StormModel[]>>(
      `/api/storm`,
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
}

const StormService = new _StormService();
export { StormService };
