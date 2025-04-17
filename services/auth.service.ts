import type { RestBase, RestData } from '../models/base-response.model';
import type { UserAuthModel } from '../models/dto/response/auth/user-auth.model';
import type {
  UserAuthChangePasswordDTO,
  UserAuthDTO,
} from '../models/dto/request/auth/user-auth.model';
import { BaseService } from './base.service';

class _AuthService extends BaseService {
  async getUserAuth() {
    const res = await $api<RestData<UserAuthModel>>(`/api/auth/user`, {
      method: 'GET',
    });
    if (res != null && res.status === EnumStatus.OK) {
      return res.data;
    }
    return {};
  }

  async updateUserAuth(userDto: UserAuthDTO) {
    const res = await $api<RestData<UserAuthModel>>(`/api/auth/user`, {
      method: 'POST',
      body: userDto,
    });
    if (res != null && res.status === EnumStatus.OK) {
      return res.data;
    }
    return {};
  }

  async changePasswordUserAuth(userDto: UserAuthChangePasswordDTO) {
    const res = await $api<RestBase>(`/api/auth/change-password`, {
      method: 'POST',
      body: userDto,
    });
    if (res != null && res.status === EnumStatus.OK) {
      return res.status;
    }
    return EnumStatus.ERROR;
  }
}

const AuthService = new _AuthService();
export { AuthService };
