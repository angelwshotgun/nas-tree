class TraoDoi {
  id?: number;
  sukien_thientai_id?: number;
  suKienThienTai?: null;
  user_id?: string;
  noi_dung?: string;
  url?: string;
  thoi_gian?: Date;
  kieu_noidung_id?: number;
  userInfo?: UserInfo;

  constructor(
    id?: number,
    sukien_thientai_id?: number,
    suKienThienTai?: null,
    user_id?: string,
    noi_dung?: string,
    url?: string,
    thoi_gian?: Date,
    kieu_noidung_id?: number,
    userInfo?: UserInfo,
  ) {
    this.id = id;
    this.sukien_thientai_id = sukien_thientai_id;
    this.suKienThienTai = suKienThienTai;
    this.user_id = user_id;
    this.noi_dung = noi_dung;
    this.url = url;
    this.thoi_gian = thoi_gian;
    this.kieu_noidung_id = kieu_noidung_id;
    this.userInfo = userInfo;
  }
}

export interface UserInfo {
  userId?: string;
  address?: string;
  fullName?: string;
  provinceCode?: string;
  districtCode?: string;
  communeCode?: string;
  searchContent?: string;
  province?: null;
  district?: null;
  commune?: null;
  user?: null;
}

export { TraoDoi };
