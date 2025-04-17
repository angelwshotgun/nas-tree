import type { RestData } from '../../models/base-response.model';
import type { CongTrinhHaTangModel, CongTrinhHaTangThongKeModel } from '../../models/chidao-dieuhanh/congtrinh-hatang/congtrinh-hatang.model';
import type { UBNDThongKeModel } from '../../models/chidao-dieuhanh/congtrinh-hatang/ubnd.model';
import type { DanCutheoHanhChinhModel } from '../../models/chidao-dieuhanh/dan-cu/dancu-theo-hanhchinh.model';
import type { DanCuTheoNhomModel } from '../../models/chidao-dieuhanh/dan-cu/dancu-theonhom.model';
import type { DoiTuongDeTonThuongModel } from '../../models/chidao-dieuhanh/dan-cu/doituong-deton-thuong.model';
import type { HoChuaModel } from '../../models/chidao-dieuhanh/ho-chua/ho-chua.model';
import type { NhaOHanhChinhModel } from '../../models/chidao-dieuhanh/nha-o/nhao-hanhchinh.model';
import type { NhaOLoaiModel } from '../../models/chidao-dieuhanh/nha-o/nhao-loai.model';
import type { ChanNuoiSoLuongModel } from '../../models/chidao-dieuhanh/nong-nghiep/chan-nuoi.model';
import type { ThuySanSoLuongModel } from '../../models/chidao-dieuhanh/nong-nghiep/thuy-san.model';
import type { TrongTrotDienTichModel } from '../../models/chidao-dieuhanh/nong-nghiep/trong-trot.model';
import type { NuocSachVeSinhBieuDoModel, NuocSachVeSinhHanhChinhModel } from '../../models/chidao-dieuhanh/nuocsach-vesinh/nuocsach-vesinh.model';
import type { SatLoThongKeModel } from '../../models/chidao-dieuhanh/sat-lo/sat-lo.model';
import { BaseService } from '../base.service';

const runtimeConfig = useRuntimeConfig();

class _ChiDaoDieuHanhService extends BaseService {
  async getDataDanSoHanhChinh(districtCode?: Array<string>, communeCode?: Array<string>, includeParent?: boolean, lng?: number, lat?: number, radius?: number) {
    const res = await $api<RestData<Array<DanCutheoHanhChinhModel>>>(
      `/dskt-api/thong-ke/dan-so/hanh-chinh`,
      {
        method: 'GET',
        params: {
          provinceCode: runtimeConfig.public.provinceCode,
          districtCode: districtCode,
          communeCode: communeCode,
          includeParent: includeParent,
          lon: lng,
          lat: lat,
          radius: radius,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }
    return null;
  }

  async getDataDanCuDoiTuongDeTonThuongChart(districtCode?: Array<string>, communeCode?: Array<string>, lng?: number, lat?: number, radius?: number) {
    const res = await $api<RestData<DoiTuongDeTonThuongModel>>(
      `/dskt-api/thong-ke/dan-so/doituong-tonthuong`,
      {
        method: 'GET',
        params: {
          provinceCode: runtimeConfig.public.provinceCode,
          districtCode: districtCode,
          communeCode: communeCode,
          lon: lng,
          lat: lat,
          radius: radius,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }
    return null;
  }

  async getDataDanCuTheoNhom(districtCode?: Array<string>, communeCode?: Array<string>, lng?: number, lat?: number, radius?: number) {
    const res = await $api<RestData<DanCuTheoNhomModel>>(
      `/dskt-api/thong-ke/dan-so/nhom`,
      {
        method: 'GET',
        params: {
          provinceCode: runtimeConfig.public.provinceCode,
          districtCode: districtCode,
          communeCode: communeCode,
          lon: lng,
          lat: lat,
          radius: radius,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }
    return null;
  }

  async getDataNhaOHanhChinh(districtCode?: Array<string>, communeCode?: Array<string>, lng?: number, lat?: number, radius?: number) {
    const res = await $api<RestData<Array<NhaOHanhChinhModel>>>(
      `/dskt-api/thong-ke/nha-o/hanh-chinh`,
      {
        method: 'GET',
        params: {
          provinceCode: runtimeConfig.public.provinceCode,
          districtCode: districtCode,
          communeCode: communeCode,
          lon: lng,
          lat: lat,
          radius: radius,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }

    return null;
  }

  async getDataNhaOLoai(districtCode?: Array<string>, communeCode?: Array<string>, lng?: number, lat?: number, radius?: number) {
    const res = await $api<RestData<NhaOLoaiModel>>(
      `/dskt-api/thong-ke/nha-o/loai`,
      {
        method: 'GET',
        params: {
          provinceCode: runtimeConfig.public.provinceCode,
          districtCode: districtCode,
          communeCode: communeCode,
          lon: lng,
          lat: lat,
          radius: radius,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }
    return null;
  }

  async getDataTrongTrotDienTich(districtCode?: Array<string>, communeCode?: Array<string>, lng?: number, lat?: number, radius?: number) {
    const res = await $api<RestData<TrongTrotDienTichModel>>(
      `/dskt-api/thong-ke/trong-trot/dien-tich`,
      {
        method: 'GET',
        params: {
          provinceCode: runtimeConfig.public.provinceCode,
          districtCode: districtCode,
          communeCode: communeCode,
          lon: lng,
          lat: lat,
          radius: radius,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }

    return null;
  }

  async getDataChanNuoiSoLuong(districtCode?: Array<string>, communeCode?: Array<string>, lng?: number, lat?: number, radius?: number) {
    const res = await $api<RestData<ChanNuoiSoLuongModel>>(
      `/dskt-api/thong-ke/chan-nuoi/so-luong`,
      {
        method: 'GET',
        params: {
          provinceCode: runtimeConfig.public.provinceCode,
          districtCode: districtCode,
          communeCode: communeCode,
          lon: lng,
          lat: lat,
          radius: radius,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }

    return null;
  }

  async getDataThuySanSoLuong(districtCode?: Array<string>, communeCode?: Array<string>, lng?: number, lat?: number, radius?: number) {
    const res = await $api<RestData<ThuySanSoLuongModel>>(
      `/dskt-api/thong-ke/thuy-haisan/so-luong`,
      {
        method: 'GET',
        params: {
          provinceCode: runtimeConfig.public.provinceCode,
          districtCode: districtCode,
          communeCode: communeCode,
          lon: lng,
          lat: lat,
          radius: radius,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }

    return null;
  }

  async getDataThongKeCongTrinhHaTang(districtCode?: Array<string>, communeCode?: Array<string>, lng?: number, lat?: number, radius?: number) {
    const res = await $api<RestData<CongTrinhHaTangModel>>(
      `/dskt-api/thong-ke/congtrinh-hatang`,
      {
        method: 'GET',
        params: {
          provinceCode: runtimeConfig.public.provinceCode,
          districtCode: districtCode,
          communeCode: communeCode,
          lon: lng,
          lat: lat,
          radius: radius,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }

    return null;
  }

  async getDataTruongHoc(districtCode?: Array<string>, communeCode?: Array<string>) {
    const res = await $api<RestData<CongTrinhHaTangThongKeModel>>(
      `/dskt-api/thong-ke/truong-hoc`,
      {
        method: 'GET',
        params: {
          provinceCode: runtimeConfig.public.provinceCode,
          districtCode: districtCode,
          communeCode: communeCode,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }

    return null;
  }

  async getDataCoSoYTe(districtCode?: Array<string>, communeCode?: Array<string>) {
    const res = await $api<RestData<CongTrinhHaTangThongKeModel>>(
      `/dskt-api/thong-ke/coso-yte`,
      {
        method: 'GET',
        params: {
          provinceCode: runtimeConfig.public.provinceCode,
          districtCode: districtCode,
          communeCode: communeCode,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }

    return null;
  }

  async getDataNhaVanHoa(districtCode?: Array<string>, communeCode?: Array<string>) {
    const res = await $api<RestData<CongTrinhHaTangThongKeModel>>(
      `/dskt-api/thong-ke/nha-vanhoa`,
      {
        method: 'GET',
        params: {
          provinceCode: runtimeConfig.public.provinceCode,
          districtCode: districtCode,
          communeCode: communeCode,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }

    return null;
  }

  async getDataUBND(districtCode?: Array<string>, communeCode?: Array<string>) {
    const res = await $api<RestData<UBNDThongKeModel>>(
      `/dskt-api/thong-ke/ubnd`,
      {
        method: 'GET',
        params: {
          provinceCode: runtimeConfig.public.provinceCode,
          districtCode: districtCode,
          communeCode: communeCode,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }

    return null;
  }

  async getDataHoThuyLoi(provinceCode: string, districtCode?: Array<string>, communeCode?: Array<string>, lng?: number, lat?: number, radius?: number) {
    const res = await $api<RestData<HoChuaModel>>(
      `/api/ho-thuyloi/thong-ke`,
      {
        method: 'GET',
        params: {
          provinceCode: provinceCode,
          districtCode: districtCode,
          communeCode: communeCode,
          lon: lng,
          lat: lat,
          radius: radius,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }

    return null;
  }

  async getDataHoThuyDien(provinceCode: string, districtCode?: Array<string>, communeCode?: Array<string>, lng?: number, lat?: number, radius?: number) {
    const res = await $api<RestData<HoChuaModel>>(
      `/api/ho-thuydien/thong-ke`,
      {
        method: 'GET',
        params: {
          provinceCode: provinceCode,
          districtCode: districtCode,
          communeCode: communeCode,
          lon: lng,
          lat: lat,
          radius: radius,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }

    return null;
  }

  async getDataSatLo(provinceCode: string, districtCode?: Array<string>, communeCode?: Array<string>, lng?: number, lat?: number, radius?: number) {
    const res = await $api<RestData<SatLoThongKeModel>>(
      `/api/diem-satlo/thong-ke`,
      {
        method: 'GET',
        params: {
          provinceCode: provinceCode,
          districtCode: districtCode,
          communeCode: communeCode,
          lon: lng,
          lat: lat,
          radius: radius,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }

    return null;
  }

  async getDataNuocSachVeSinh(districtCode?: Array<string>, communeCode?: Array<string>, lng?: number, lat?: number, radius?: number) {
    const res = await $api<RestData<NuocSachVeSinhBieuDoModel>>(
      `/dskt-api/thong-ke/nuocsach-vesinh`,
      {
        method: 'GET',
        params: {
          provinceCode: runtimeConfig.public.provinceCode,
          districtCode: districtCode,
          communeCode: communeCode,
          lon: lng,
          lat: lat,
          radius: radius,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }
    return null;
  }

  async getDataNuocSachVeSinhHanhChinh(districtCode?: Array<string>, communeCode?: Array<string>, lng?: number, lat?: number, radius?: number) {
    const res = await $api<RestData<NuocSachVeSinhHanhChinhModel>>(
      `/dskt-api/thong-ke/nuocsach-vesinh/hanh-chinh`,
      {
        method: 'GET',
        params: {
          provinceCode: runtimeConfig.public.provinceCode,
          districtCode: districtCode,
          communeCode: communeCode,
          lon: lng,
          lat: lat,
          radius: radius,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }
    return null;
  }

  async getDataVungAnhHuong(districtCode?: Array<string>, communeCode?: Array<string>, lng?: number, lat?: number, radius?: number) {
    const res = await $fetch<RestData<string>>('/dskt-api/thong-ke/vung-anhhuong', {
      method: 'GET',
      params: {
        provinceCode: runtimeConfig.public.provinceCode,
        districtCode: districtCode,
        communeCode: communeCode,
        lon: lng,
        lat: lat,
        radius: radius,
      },
    });

    if (res && res.status === EnumStatus.OK) {
      return res.data;
    }
    return null;
  }
}

const ChiDaoDieuHanhService = new _ChiDaoDieuHanhService();
export { ChiDaoDieuHanhService };
