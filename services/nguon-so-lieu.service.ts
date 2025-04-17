import type {
  RestData,
} from '../models/base-response.model';
import type { NguonSoLieuModel } from '../models/dto/response/categories/category.model';
import { BaseService } from './base.service';

class _NguonSoLieuService extends BaseService {
  async listNguonSoLieu(
    { q = '',
      page = 1,
      pageSize = 15 },
  ) {
    const res = await $api<RestData<NguonSoLieuModel[]>>(
      `/api/dm-nguon-solieu`,
      {
        method: 'GET',
        params: {
          q: q,
          page: page,
          pageSize: pageSize,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }
    return [];
  }

  async listByNhomDuLieu(
    nhomDuLieu?: number,
    loaiTramId?: number,
    provinceCode?: string,
  ) {
    const res = await $api<RestData<NguonSoLieuModel[]>>(
      `/api/dm-nguon-solieu/list-by-nhom-dulieu`,
      {
        method: 'GET',
        params: {
          nhomDuLieuId: nhomDuLieu,
          maTinh: provinceCode,
          loaiTramId: loaiTramId,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      if (res.data?.length) {
        res.data.map((item) => {
          item.mo_ta = `${item.mo_ta} (${item?.so_luong ?? 0})`;
        });
      }
      return res.data;
    }
    return [];
  }
}

const NguonSoLieuService = new _NguonSoLieuService();
export { NguonSoLieuService };
