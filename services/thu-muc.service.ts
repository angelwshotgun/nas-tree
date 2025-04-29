import type { ThuMucModel } from '~/models/thu-muc.model';

class _ThuMucService {
  async GetThuMuc() {
    return (await $api<ThuMucModel[]>('/api/thu-muc', { method: 'GET' })) ?? [];
  }

  async GetThuMucPublic() {
    return (
      (await $api<ThuMucModel[]>('/api/public/thu-muc', { method: 'GET' })) ??
      []
    );
  }

  async GetThuMucByIdPublic(id: number) {
    return await $api<ThuMucModel>(`/api/public/thu-muc/${id}`, {
      method: 'GET',
    });
  }

  async Insert(entity: ThuMucModel) {
    const res = await $api<ThuMucModel>(`/api/thu-muc`, {
      method: 'POST',
      body: entity,
    });
    return res ?? null;
  }

  async Update(entity: ThuMucModel) {
    const res = await $api<ThuMucModel>(`/api/thu-muc/${entity.id}`, {
      method: 'PATCH',
      body: entity,
    });
    return res ?? null;
  }

  async Delete(entity: ThuMucModel) {
    const res = await $api<ThuMucModel>(`/api/thu-muc/${entity.id}`, {
      method: `DELETE`,
      body: entity,
    });
    return res ?? null;
  }
}

const ThuMucService = new _ThuMucService();
export { ThuMucService };
