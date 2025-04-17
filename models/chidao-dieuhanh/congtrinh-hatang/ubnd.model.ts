interface UBNDThongKeModel {
  soLuong: Array<UNNDThongKeSoLuongModel>;
  hanhChinh: Array<UNNDThongKeHanhChinhModel>;
}

interface UNNDThongKeHanhChinhModel {
  ten_hanhchinh: string;
  solieu_chitiet: string;
  solieu_chitiet_array: Array<UNNDThongKeSoLuongModel>;
}

interface UNNDThongKeSoLuongModel {
  mo_ta: string;
  gia_tri: number;
}

export type { UBNDThongKeModel, UNNDThongKeHanhChinhModel };
