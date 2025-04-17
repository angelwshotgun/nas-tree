export interface UserAuthDTO {
  email?: string;
  full_name?: string;
  phone_number?: string;
  address?: string;
  unit?: string;
  avatar?: string;
}
export interface UserAuthChangePasswordDTO {
  password: string;
  new_password: string;
  confirm_password: string;
}
