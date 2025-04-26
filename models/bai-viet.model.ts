import type { ThuMucModel } from "./thu-muc.model";

class BaiVietModel {
  id?: number;
  tieu_de?: string;
  mo_ta?: string;
  duong_dan?: string;
  noi_dung?: string;
  anh?: string;
  vi_tri?: string;
  thumucId?: number;
  createdAt?: number;
  updatedAt?: number;
  thumuc?: ThuMucModel;
}

export { BaiVietModel };
