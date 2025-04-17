interface ThuySanSoLuongModel {
  soLuong: Array<ThuySanDataModel>;
  hanhChinh: Array<ThuySanHanhChinhModel>;

}

interface ThuySanDataModel {
  data: ThuySanSoLieuChiTietModel;
}

interface ThuySanHanhChinhModel {
  ten_hanhchinh: string;
  solieu_chitiet: string;
  solieu_chitiet_array: Array<ThuySanSoLieuChiTietModel>;
}

interface ThuySanSoLieuChiTietModel {
  mo_ta: string;
  gia_tri: number;
}

export type { ThuySanSoLuongModel, ThuySanHanhChinhModel, ThuySanSoLieuChiTietModel };
