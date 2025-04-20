import type { ThuMucModel } from '~/models/thu-muc.model';
class _ThuMucService {
  async GetThuMuc() {
    const response = await $api<ThuMucModel[]>('/api/thu-muc', {
      method: 'GET',
    });
    if (response) {
      return response;
    }
    return [];
  }
  
  async GetThuMucPublic() {
    const response = await $api<ThuMucModel[]>('/api/public/thu-muc', {
      method: 'GET',
    });
    if (response) {
      return response;
    }
    return [];
  }

  async Insert(entity: ThuMucModel) {
    const res = await $api<ThuMucModel>(`/api/thu-muc`, {
      method: 'POST',
      body: entity,
    });
    if (res) {
      return res;
    }
    return null;
  }

  async Update(entity: ThuMucModel) {
    const res = await $api<ThuMucModel>(`/api/thu-muc/${entity.id}`, {
      method: 'PATCH',
      body: entity,
    });
    if (res) {
      return res;
    }
    return null;
  }

  async Delete(entity: ThuMucModel) {
    const res = await $api<ThuMucModel>(`/api/thu-muc/${entity.id}`, {
      method: `DELETE`,
      body: entity,
    });
    if (res) {
      return res;
    }
    return null;
  }
}

const ThuMucService = new _ThuMucService();
export { ThuMucService };
