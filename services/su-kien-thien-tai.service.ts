import type { SuKienThienTaiModel } from '../models/dto/response/su-kien-thien-tai/su-kien-thien-tai.model';
import type {
  RestData,
  RestPagedDataTable,
} from '../models/base-response.model';
import type { LoaiThienTaiModel } from '../models/dto/response/su-kien-thien-tai/loai-thien-tai.model';
import type { SuKienThienTaiDatatableParams } from '../models/sukien-thientai-datatable-params.model';
import { BaseService } from './base.service';

class _SuKienThienTaiService extends BaseService {
  async getSuCoThienTaiDatatable(params: SuKienThienTaiDatatableParams) {
    const {
      searchKey,
      year,
      length,
      start,
      loaiThienTaiIds,
      districtCodes,
      provinceCodes,
      from,
      to,
    } = params;

    const res = await $api<RestPagedDataTable<SuKienThienTaiModel[]>>(
      `/api/sukien-thientai/datatable`,
      {
        method: 'POST',
        body: {
          draw: 1,
          length: length,
          start: start,
          search: {
            value: searchKey,
          },
          nam: year,
          districtCodes: districtCodes,
          provinceCodes: provinceCodes,
          loaiThienTaiIds: loaiThienTaiIds,
          from: from,
          to: to,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res;
    }
    return null;
  }

  async getIDSuCoThienTai(id?: number) {
    const res = await $api<RestData<LoaiThienTaiModel>>(
      `/api/dm-loai-thientai/${id}`,
      {
        method: 'GET',
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res;
    }
    return null;
  }

  async getSuKienThienTaiID(id?: number) {
    const res = await $api<RestPagedDataTable<SuKienThienTaiModel[]>>(
      `/api/sukien-thientai/${id}`,
      {
        method: 'GET',
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res;
    }
    return null;
  }

  async delete(entity: SuKienThienTaiModel) {
    const response = await $api<RestPagedDataTable<SuKienThienTaiModel[]>>(
      `/api/sukien-thientai`,
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

  async insert(entity: SuKienThienTaiModel) {
    const response = await $api<RestPagedDataTable<SuKienThienTaiModel[]>>(
      `/api/sukien-thientai`,
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

  async update(entity: SuKienThienTaiModel) {
    const response = await $api<RestPagedDataTable<SuKienThienTaiModel[]>>(
      `/api/sukien-thientai`,
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

  async downloadDocuments(entity: SuKienThienTaiModel, filename: string) {
    const response = await $api(`/api/sukien-thientai/${entity.id}/van-ban/download`, {
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

const SuKienThienTaiService = new _SuKienThienTaiService();
export { SuKienThienTaiService };
