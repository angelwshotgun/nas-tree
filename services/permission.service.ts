import type { RestData } from '../models/base-response.model';
import type { PermissionModel } from '../models/permission.model';
import { BaseService } from './base.service';

const basePermission = '/api/permission';
class _PermissionService extends BaseService {
  async getPermissionsList() {
    const res = await $api<RestData<PermissionModel[]>>(`${basePermission}/list`, {
      method: 'GET',
      headers: {
        Authorization: `${this.getAccessToken()}`,
      },
    });
    if (res && res.status == EnumStatus.OK) {
      return res.data;
    }
    return [];
  }

  async getPermissionsOfUser(userName: string) {
    const res = await $api<RestData<string[]>>(`/api/user/permissions?user_name=${userName}`, {
      method: 'GET',
      headers: {
        Authorization: `${this.getAccessToken()}`,
      },
    });
    if (res && res.status == EnumStatus.OK) {
      return res.data;
    }
    return [];
  }

  async updatePermssionOfUser(data: { user_name: string; permissions: string [] }) {
    const res = await $api<RestData<number>>(`/api/user/save-permissions`, {
      method: 'POST',
      headers: {
        Authorization: `${this.getAccessToken()}`,
      },
      body: JSON.stringify(data),
    });
    if (res && res.status == EnumStatus.OK) {
      return res;
    }
    return null;
  }
}

const PermissionService = new _PermissionService();
export { PermissionService };
