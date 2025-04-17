import type { RestBase, RestData, RestDataList, RestPagedDataTable } from '../models/base-response.model';
import type { DanhMucModel, TreeDanhMucModel, ColumnsModel } from '../models/danh-muc.model';
import { BaseService } from './base.service';

class _DanhMucService extends BaseService {
  async getListDanhMuc() {
    const res = await $api<RestDataList<TreeDanhMucModel>>(
      `/api/table/category/tree`,
      {
        method: 'GET',
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }
    return [];
  }

  async getDanhMucDatatable(
    id?: number,
    start?: number,
    length?: number,
  ) {
    const res = await $api<RestPagedDataTable<DanhMucModel[]>>(
      `/api/table/${id}/records`,
      {
        method: 'POST',
        body: {
          start,
          length,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res;
    }
    return null;
  }

  async getDanhMucColumn(id?: number, oid?: number) {
    const res = await $api<RestData<ColumnsModel>>(
      `/api/table/${id}/record/${oid}`,
      {
        method: 'GET',
      },
    );
    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }
    return null;
  }

  async insertDanhMucColumn(data: ColumnsModel, id?: number) {
    const res = await $api<RestBase>(
      `/api/table/${id}/insert`,
      {
        method: 'POST',
        body: data,
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res;
    }
    return null;
  }

  async editDanhMucColumn(data: ColumnsModel, id?: number) {
    const res = await $api<RestBase>(
      `/api/table/${id}/update`,
      {
        method: 'PUT',
        body: data,
      },
    );
    if (res && res.status === EnumStatus.OK) {
      return res;
    }
    return null;
  }

  async deleteDanhMucColumn(data: ColumnsModel, id?: number) {
    const res = await $api<RestBase>(`/api/table/${id}/delete`, {
      method: 'DELETE',
      body: data,
    });
    if (res && res.status === EnumStatus.OK) {
      return res;
    }
    return null;
  }
}

const DanhMucService = new _DanhMucService();
export { DanhMucService };
