export interface ThuMucNgonNguModel {
  id?: number;
  thumucId?: number;
  ten_thumuc: string;
  ngon_ngu: string;
  locale: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface ThuMucModel {
  id?: number;
  thu_tu: number;
  duong_dan: string;
  createdAt?: number;
  updatedAt?: number;
  thumuc_ngonngu: ThuMucNgonNguModel[];
}
