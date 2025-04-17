import type {
  RestPagedDataTable,
} from '../models/base-response.model';
import type { StormTrackingModel } from '../models/dto/response/storm/storm-tracking.model';
import { BaseService } from './base.service';

class _StormTrackingService extends BaseService {
  async getStormTrackingDatatable(
    searchKey?: number,
    length?: number,
    start?: number,
  ) {
    const res = await $api<RestPagedDataTable<StormTrackingModel[]>>(
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

  async delete(entity: StormTrackingModel) {
    const response = await $api<RestPagedDataTable<StormTrackingModel[]>>(
      `/api/storm-tracking`,
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

  async insert(entity: StormTrackingModel) {
    const response = await $api<RestPagedDataTable<StormTrackingModel[]>>(
      `/api/storm-tracking`,
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

  async update(entity: StormTrackingModel) {
    const response = await $api<RestPagedDataTable<StormTrackingModel[]>>(
      `/api/storm-tracking`,
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

const StormTrackingService = new _StormTrackingService();
export { StormTrackingService };
