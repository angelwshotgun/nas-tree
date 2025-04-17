import type { RestData, RestError, RestPagedDataTable } from '../models/base-response.model';
import type { LoaiTaiLieuModel, TaiLieuModel } from '../models/tai-lieu.model';
import { BaseService } from './base.service';

class _TaiLieuService extends BaseService {
  async listLoaiTaiLieu() {
    const res = await $api<RestPagedDataTable<LoaiTaiLieuModel[]>>(
      `/api/dm-phanloai-tailieu`,
      {
        method: 'GET',
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res;
    }
    return null;
  }

  async getDataTable(
    searchKey?: string,
    length?: number,
    start?: number,
    thuMucId?: number,
    listLoaiTaiLieuId?: Array<number>,
    from?: Date,
    to?: Date,
    listProvinceCode?: Array<string>,
  ) {
    const response = await $api<RestPagedDataTable<TaiLieuModel[]>>(
      '/api/vanban-tailieu/datatable', {
        method: 'POST',
        body: {
          length: length,
          start: start,
          search: {
            value: searchKey,
            regex: true,
          },
          thuMucId: thuMucId,
          listLoaiTaiLieuId: listLoaiTaiLieuId,
          from: from,
          to: to,
          listProvinceCode: listProvinceCode,
        },
      },
    );

    if (response && response.status === EnumStatus.OK) {
      return response;
    }

    return null;
  }

  async Insert(entity: TaiLieuModel) {
    const res = await $api<RestData<number> | RestError>(`/api/vanban-tailieu/thu-muc/them-moi`, {
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

  async Update(entity: TaiLieuModel) {
    const res = await $api<RestData<number> | RestError>(`/api/vanban-tailieu/thu-muc/cap-nhat`, {
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

  async Delete(entity: TaiLieuModel) {
    const res = await $api<RestData<number>>(`/api/vanban-tailieu`, {
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

  async DowloadFile(id: number, filename: string) {
    const response = await $api(`/api/vanban-tailieu/${id}/download`, {
      method: 'GET',
    });
    if (response) {
      const URL = window.URL || window.webkitURL;
      const downloadUrl = URL.createObjectURL(response as Blob);

      if (filename) {
        // use HTML5 a[download] attribute to specify filename
        const a = document.createElement('a');
        // safari doesn't support this yet
        if (typeof a.download === 'undefined') {
          window.open(downloadUrl);
        }
        else {
          a.href = downloadUrl;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
        }
      }
      else {
        window.open(downloadUrl);
      }

      setTimeout(function () {
        URL.revokeObjectURL(downloadUrl);
      }, 100); // cleanup
    }
  }
}

const TaiLieuService = new _TaiLieuService();
export { TaiLieuService };
