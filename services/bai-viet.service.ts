import type { BaiVietModel } from '~/models/bai-viet.model';
class _BaiVietService {
  async GetBaiViet(thumucId?: number) {
    const response = await $api<BaiVietModel[]>(
      `/api/bai-viet?thumucId=${thumucId}`,
      {
      method: 'GET',
      params: { thumucId },
    });
    if (response) {
      return response;
    }
    return [];
  }

  async GetBaiVietList(duong_dan?: string) {
    const response = await $api<BaiVietModel[]>(`/api/public/bai-viet/list/${duong_dan}`, {
      method: 'GET',
    });
    if (response) {
      return response;
    }
    return [];
  }

  async GetBaiVietByDuongDan(duong_dan?: string) {
    const response = await $api<BaiVietModel>(
      `/api/public/bai-viet/${duong_dan}`,
      {
      method: 'GET',
    });
    if (response) {
      return response;
    }
    return undefined;
  }

  async SearchBaiViet(keyword?: string, ngon_ngu?: string) {
    const response = await $api<BaiVietModel[]>(
      `/api/public/search`,
      {
      method: 'GET',
      params: { keyword, ngon_ngu },
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
