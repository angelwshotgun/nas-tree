import type {
  RestData,
  RestPagedDataTable,
} from '../models/base-response.model';
import type { CategoryModel } from '../models/dto/response/categories/category.model';
import type {
  GiaTriQuanTracTram,
  TramQuantrac,
} from '../models/dto/response/pctt/quan-trac-tram';
import type { QuanTracMuaModel } from '../models/quan-trac/quan-trac-mua.model';
import { BaseService } from './base.service';

class _QuanTracService extends BaseService {
  // async listLoaiQuanTrac() {
  //   const res = await $api<RestPagedDataTable<CategoryModel[]>>(
  //     `/api/dm-loai-quantrac/datatable`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Authorization: `${this.getAccessToken()}`,
  //       },
  //       body: {
  //         draw: 1,
  //         filter: 0,
  //         columns: [],
  //         order: [],
  //         start: 0,
  //         length: 100,
  //       },
  //     }
  //   );

  //   if (res && res.status === EnumStatus.OK) {
  //     return res.data;
  //   }
  //   return [];
  // }

  async listQuanTracMua(
    tram_id?: number,
    keyword?: string,
    obs?: number,
    loaitram_id?: number,
    nguon_solieu_ids?: number[],
    from_total?: number,
    to_total?: number,
    from_obs?: number,
    to_obs?: number,
    from_date?: Date,
    to_date?: Date,
    province_codes?: string[],
    district_codes?: string[],
    order_north_to_south?: string,
    order_total?: string,
  ) {
    const res = await $api<RestPagedDataTable<QuanTracMuaModel[]>>(
      `/api/giatri-quantrac-tram/tram-mua`,
      {
        method: 'POST',
        body: {
          tram_id: tram_id,
          keyword: keyword,
          obs: obs,
          loaitram_id: loaitram_id,
          nguon_solieu_ids: nguon_solieu_ids,
          from_total: from_total,
          to_total: to_total,
          from_obs: from_obs,
          to_obs: to_obs,
          from_date: from_date,
          to_date: to_date,
          province_codes: province_codes,
          district_codes: district_codes,
          order_north_to_south: order_north_to_south,
          order_total: order_total,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }
    return [];
  }

  async getBaseCodeImageChart(tram_id: number) {
    const response = await $api<RestData<string>>(
      `/api/giatri-quantrac-tram/chart`,
      {
        method: 'POST',
        body: {
          tram_id: tram_id,
          from_date: '2024-07-17T05:55:11',
          to_date: '2024-07-26T05:55:11',
        },
      },
    );

    if (response != null && response.status === EnumStatus.OK) {
      return response.data;
    }
    return '';
  }

  async getListByTime(
    tram_id: number,
    option?: number,
    fromDate?: Date | null,
    toDate?: Date | null,
    loaitram_id?: number,
  ) {
    const response = await $api<RestData<GiaTriQuanTracTram[]>>(
      `/api/giatri-quantrac-tram/list-by-time`,
      {
        method: 'POST',
        body: {
          tram_id: tram_id,
          option: option,
          from_date: fromDate,
          to_date: toDate,
          loaitram_id: loaitram_id,
        },
      },
    );

    if (response != null && response.status === EnumStatus.OK) {
      return response.data || [];
    }
    return [];
  }

  // datatable trạm quan trắc dùng trong cms
  async listTramQuanTracDataTable(data: any) {
    const response = await $api<RestPagedDataTable<TramQuantrac[]>>(
      `/api/tram-quantrac/datatable`,
      {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json',
        }),
        body: JSON.stringify(data),
      },
    );
    if (response && response.status === EnumStatus.OK) {
      return response;
    }
    return [];
  }

  // lấy ra danh sách danh mục loại trạm quan trắc
  async listLoaiQuanTrac(
    q: string = '',
    page: number = 1,
    pageSize: number = 15,
  ) {
    const res = await $api<RestData<CategoryModel[]>>(`/api/dm-loai-quantrac`, {
      method: 'GET',
      params: {
        q: q,
        page: page,
        pageSize: pageSize,
      },
    });

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }
    return [];
  }

  // chỉnh sửa, cập nhật trạm quan chắc
  async upDateAsyncTramQuanTrac(data: TramQuantrac) {
    return await $api<RestData<TramQuantrac>>(`/api/tram-quantrac`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'content-type': 'application/json',
      }),
      method: 'PUT',
    })
      .then((xhr) => {
        return xhr.status;
      })
      .catch((e) => {
        throw e;
      });
  }
}

const QuanTracService = new _QuanTracService();
export { QuanTracService };
