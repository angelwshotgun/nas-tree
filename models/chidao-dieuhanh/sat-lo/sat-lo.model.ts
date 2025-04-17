interface SatLoThongKeModel {
  total: number;
  thongKeHanhChinh: Array<SatLoThongKeChiTiet>;
  thongKeTinhTrang: Array<SatLoThongKeChiTiet>;
  thongKeTinhTrangHanhChinh: Array<SatLoThongKeTinhTrangHanhChinh>;
}

interface SatLoThongKeChiTiet {
  description: string;
  total: number;
}

interface SatLoThongKeTinhTrangHanhChinh {
  ten_hanhchinh: string;
  solieu_chitiet: string;
  solieu_chitiet_array: Array<SatLoSoLieuChiTiet>;
}

interface SatLoSoLieuChiTiet {
  tinhtrang_satlo: string;
  gia_tri: number;
}

export type { SatLoThongKeModel, SatLoThongKeTinhTrangHanhChinh, SatLoSoLieuChiTiet };
