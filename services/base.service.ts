abstract class BaseService {
  static getProvinceCode(): string {
    return '22';
  }

  getAccessToken(): string {
    const { token } = useAuth();
    return token.value!;
  }
}

export { BaseService };
