import type { BaiVietModel } from '~/models/bai-viet.model';
class _BaiVietService {
  async GetBaiViet() {
    const response = await $api<BaiVietModel[]>('/api/public/bai-viet', {
      method: 'GET',
    });
    if (response) {
      return response;
    }
    return [];
  }

  async Insert(entity: BaiVietModel) {
    const res = await $api<BaiVietModel>(`/api/bai-viet`, {
      method: 'POST',
      body: entity,
    });
    if (res) {
      return res;
    }
    return null;
  }

  async Update(entity: BaiVietModel) {
    const res = await $api<BaiVietModel>(`/api/bai-viet/${entity.id}`, {
      method: 'PATCH',
      body: entity,
    });
    if (res) {
      return res;
    }
    return null;
  }

  async Delete(entity: BaiVietModel) {
    const res = await $api<BaiVietModel>(`/api/bai-viet/${entity.id}`, {
      method: `DELETE`,
      body: entity,
    });
    if (res) {
      return res;
    }
    return null;
  }
}

const BaiVietService = new _BaiVietService();
export { BaiVietService };
