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

  async Insert(form: FormData) {
    const res = await $api<BaiVietModel>(`/api/bai-viet`, {
      method: 'POST',
      body: form,
    });
    if (res) {
      return res;
    }
    return null;
  }

  async Update(form: FormData) {
    const res = await $api<BaiVietModel>(`/api/bai-viet/${form.get('id')}`, {
      method: 'PATCH',
      body: form,
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
