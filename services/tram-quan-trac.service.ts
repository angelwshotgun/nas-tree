import type {
  RestData,
  RestPagedDataTable,
} from '../models/base-response.model';
import type { TramQuanTracModel } from '../models/dto/response/tram-quan-trac/tram-quan-trac.model';
import type { CategoryModel } from '../models/dto/response/categories/category.model';
import { BaseService } from './base.service';

class _TramQuanTracService extends BaseService {
  async getQuanTracDatatable(
    searchKey?: string,
    length?: number,
    start?: number,
    listNguonSoLieu?: CategoryModel,
    listLoaiQuanTrac?: CategoryModel,
    listProvinceCode?: Array<string>,
  ) {
    const res = await $api<RestPagedDataTable<TramQuanTracModel[]>>(
      `/api/tram-quantrac/datatable`,
      {
        method: 'POST',
        body: {
          draw: 1,
          length: length,
          start: start,
          search: {
            value: searchKey,
          },
          listNguonSoLieu: listNguonSoLieu,
          listLoaiQuanTrac: listLoaiQuanTrac,
          listProvinceCode: listProvinceCode,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res;
    }
    return null;
  }

  async update(entity: TramQuanTracModel) {
    const response = await $api<RestPagedDataTable<TramQuanTracModel[]>>(
      `/api/tram-quantrac`,
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

  async getIDStorm(id?: number) {
    const res = await $api<RestData<TramQuanTracModel>>(
      `/api/storm/${id}`,
      {
        method: 'GET',
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res;
    }
    return null;
  }

  async getDMLoaiQuanTrac() {
    const res = await $api<RestData<CategoryModel>>(
      `/api/dm-loai-quantrac`,
      {
        method: 'GET',
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res;
    }
    return null;
  }

  async getDMNguonSoLieu() {
    const res = await $api<RestData<CategoryModel>>(
      `/api/dm-nguon-solieu`,
      {
        method: 'GET',
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res;
    }
    return null;
  }
}

const TramQuanTracService = new _TramQuanTracService();
export { TramQuanTracService };
