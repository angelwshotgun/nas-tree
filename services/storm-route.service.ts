import type {
  RestData,
  RestPagedDataTable,
} from '../models/base-response.model';
import type { StormRouteModel } from '../models/dto/response/storm/storm-router.model';
import { BaseService } from './base.service';

class _StormRouteService extends BaseService {
  async getStormDatatable(
    searchKey?: string,
    length?: number,
    start?: number,
  ) {
    const res = await $api<RestPagedDataTable<StormRouteModel[]>>(
      `/api/storm-route/datatable`,
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

  async getIDStorm(id?: number) {
    const res = await $api<RestData<StormRouteModel>>(
      `/api/storm-route/${id}`,
      {
        method: 'GET',
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res;
    }
    return null;
  }

  async delete(entity: StormRouteModel) {
    const response = await $api<RestPagedDataTable<StormRouteModel[]>>(
      `/api/storm-route`,
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

  async insert(entity: StormRouteModel) {
    const response = await $api<RestPagedDataTable<StormRouteModel[]>>(
      `/api/storm-route`,
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

  async update(entity: StormRouteModel) {
    const response = await $api<RestPagedDataTable<StormRouteModel[]>>(
      `/api/storm-route`,
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

const StormRouteService = new _StormRouteService();
export { StormRouteService };
