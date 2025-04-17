import type {
  RestData,
  RestPagedDataTable,
} from "../models/base-response.model";
import type { HoChuaChart } from "../models/ho-chua-chart.model";
import type { HoThuyLoiModel } from "../models/ho-thuyloi.model";
import { BaseService } from "./base.service";

class _HoThuyLoiService extends BaseService {
  async getListByTime(
    tram_id: number,
    id_ho: number,
    option: number,
    fromDate?: Date,
    toDate?: Date,
    provinceCodes?: string[]
  ) {
    const response = await $api<RestData<HoChuaChart[]>>(
      `/api/giatri-quantrac-ho-thuyloi/list-by-time`,
      {
        method: "POST",
        body: {
          tram_id: tram_id,
          id_ho: tram_id ?? id_ho,
          option: option,
          from_date: fromDate,
          to_date: toDate,
          province_codes: provinceCodes,
        },
      }
    );

    if (response != null && response.status === EnumStatus.OK) {
      return response.data || [];
    }
    return [];
  }

  async getHoThuyLoiId(id_ho?: number) {
    const response = await $api<RestData<HoChuaChart[] | HoThuyLoiModel[]>>(
      `/api/ho-thuyloi/${id_ho}`,
      {
        method: "GET",
      }
    );

    if (response != null && response.status === EnumStatus.OK) {
      return response.data || [];
    }
    return [];
  }

  async getHoThuyLoiDatatable(
    searchKey?: string,
    length?: number,
    start?: number,
    dungTichTu?: number,
    dungTichDen?: number,
    listProvinceCodes?: Array<string>
  ) {
    const res = await $api<RestPagedDataTable<HoThuyLoiModel[]>>(
      `/api/ho-thuyloi/datatable`,
      {
        method: "POST",
        body: {
          draw: 1,
          length: length,
          start: start,
          search: {
            value: searchKey,
          },
          dungTichTu: dungTichTu,
          dungTichDen: dungTichDen,
          listProvinceCodes: listProvinceCodes,
        },
      }
    );
    if (res != null && res.status === EnumStatus.OK) {
      return res;
    }
    return [];
  }

  async delete(entity: HoThuyLoiModel) {
    const res = await $api<RestData<number>>(`/api/ho-thuyloi`, {
      method: `DELETE`,
      body: JSON.stringify(entity),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res && res.status == EnumStatus.OK) {
      return res;
    }
    return null;
  }

  async update(entity: HoThuyLoiModel) {
    const response = await $api<RestPagedDataTable<HoThuyLoiModel[]>>(
      `/api/ho-thuyloi`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entity),
      }
    );

    if (response) {
      return response;
    }

    return null;
  }

  async insert(entity: HoThuyLoiModel) {
    const response = await $api<RestPagedDataTable<HoThuyLoiModel[]>>(
      `/api/ho-thuyloi`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entity),
      }
    );

    if (response) {
      return response;
    }

    return null;
  }

  async getTemplateHoThuyLoi(type: number, filename: string) {
    const response = await $api(`/api/ho-thuyloi/template`, {
      method: "GET",
      params: {
        type: type,
      },
    });
    if (response) {
      const URL = window.URL || window.webkitURL;
      const downloadUrl = URL.createObjectURL(response as Blob);

      if (filename) {
        // use HTML5 a[download] attribute to specify filename
        const a = document.createElement("a");
        // safari doesn't support this yet
        if (typeof a.download === "undefined") {
          window.open(downloadUrl);
        } else {
          a.href = downloadUrl;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
        }
      } else {
        window.open(downloadUrl);
      }

      setTimeout(function () {
        URL.revokeObjectURL(downloadUrl);
      }, 100); // cleanup
    }
  }

  async importHoThuyLoi(file: File, type: number, provinceCode: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type.toString());
    formData.append('provinceCode', provinceCode);

    const res = await $api<RestData<string>>(`/api/ho-thuyloi/import`, {
      method: "POST",
      body: formData,
    });
    if (res != null && res.status === EnumStatus.OK) {
      return res;
    }
    return null;
  }
}

const HoThuyLoiService = new _HoThuyLoiService();
export { HoThuyLoiService };
