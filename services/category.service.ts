import type { RestData } from '../models/base-response.model';
import type {
  CategoryModel,
  LoaiThienTaiModel,
} from '../models/dto/response/categories/category.model';
import { EnumStatus } from '../utils/enums';
import { BaseService } from './base.service';

class _CategoryService extends BaseService {
  async listLoaiThienTai() {
    const res = await $api<RestData<LoaiThienTaiModel[]>>(
      `/api/dm-loai-thientai?pageSize=-1`,
      {
        method: 'GET',
      },
    );

    if (res != null && res.status === EnumStatus.OK) {
      return res.data;
    }
    return [];
  }

  async listDonVi() {
    const res = await $api<RestData<CategoryModel[]>>(`/api/dm-donvi`, {
      method: 'GET',
    });

    if (res != null && res.status === EnumStatus.OK) {
      return res.data;
    }
    return [];
  }
}
const CategoryService = new _CategoryService();
export { CategoryService };
