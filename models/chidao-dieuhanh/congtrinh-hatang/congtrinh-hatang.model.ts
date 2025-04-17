interface CongTrinhHaTangThongKeModel {
  soLuong: Array<CongTrinhHaTangThongKeSoLuongModel>;
  hanhChinh: Array<CongTrinhHaTangThongKeHanhChinhModel>;
}

interface CongTrinhHaTangThongKeSoLuongModel {
  loai_congtrinh: string;
  solieu_chitiet: string;
  solieu_chitiet_array: Array<CongTrinhHaTangThongKeLieuChiTietModel>;
}

interface CongTrinhHaTangThongKeHanhChinhModel {
  ten_hanhchinh: string;
  solieu_chitiet: string;
  solieu_chitiet_array: Array<CongTrinhHaTangThongKeLieuChiTietModel>;
}

interface CongTrinhHaTangThongKeLieuChiTietModel {
  mo_ta: string;
  gia_tri: number;
}

interface CongTrinhHaTangModel {
  thongKeCongTrinh: Array<ThongKeCongtrinhModel>;
  thongKeHaTang: Array<ThongKeHaTangModel>;
}

interface ThongKeCongtrinhModel {
  ten_hanhchinh: string;
  soluong_ubnd: number;
  soluong_nvh_xa: number;
  soluong_nvh_thon: number;
  soluong_benhvien: number;
  soluong_coso_yte: number;
  soluong_truonghoc: number;
}

interface ThongKeHaTangModel {
  ten_hanhchinh: string;
  soluong_cong: number;
  chieudai_ke: number;
  soluong_trambom: number;
}

export type { CongTrinhHaTangModel, ThongKeCongtrinhModel, ThongKeHaTangModel, CongTrinhHaTangThongKeModel, CongTrinhHaTangThongKeHanhChinhModel, CongTrinhHaTangThongKeLieuChiTietModel };
