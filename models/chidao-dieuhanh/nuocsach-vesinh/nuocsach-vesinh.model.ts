interface NuocSachVeSinhBieuDoModel {
  nuocSach: NuocSachVeSinhModel;
  veSinh: NuocSachVeSinhModel;
}
interface NuocSachVeSinhModel {
  tongso_nam: number;
  tongso_nu: number;
  tongso_ho: number;
  thongke_chitiet: string;
};

interface NuocSachVeSinhHanhChinhModel {
  nuocSach: Array<NuocSachVeSinhChiTietModel>;
  veSinh: Array<NuocSachVeSinhChiTietModel>;
}

interface NuocSachVeSinhChiTietModel {
  ten_hanhchinh: string;
  solieu_chitiet: string;
  solieu_chitiet_array: Array<LoaiNguonNuocThongKeChiTietModel | LoaiVeSinhThongKeChiTietModel>;
}

interface LoaiNguonNuocThongKeChiTietModel {
  loai_nguonnuoc: string;
  tongso_hodan: number;
  tongso_nam: number;
  tongso_nu: number;
}

interface LoaiVeSinhThongKeChiTietModel {
  loai_nha_vs: string;
  tongso_hodan: number;
  tongso_nam: number;
  tongso_nu: number;
}

export type { NuocSachVeSinhBieuDoModel, NuocSachVeSinhHanhChinhModel, LoaiNguonNuocThongKeChiTietModel, LoaiVeSinhThongKeChiTietModel, NuocSachVeSinhChiTietModel };
