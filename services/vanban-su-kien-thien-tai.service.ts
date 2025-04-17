import type {
  RestData,
  RestPagedDataTable,
} from '../models/base-response.model';
import type { VanBanModel } from '../models/dto/response/su-kien-thien-tai/van-ban.model';
import type {
  VanBan,
  VanBanSuKienThienTaiModel,
} from '../models/vanban-su-kien-thien-tai.model';
import { BaseService } from './base.service';

class _VanBanSuKienThienTaiService extends BaseService {
  async listLoaiTaiLieu(sukien?: number, loaiTaiLieuId?: number) {
    const res = await $api<RestData<VanBanSuKienThienTaiModel[]>>(
      `/api/sukien-thientai/${sukien}/van-ban`,
      {
        method: 'GET',
        params: {
          loaiTaiLieuId: loaiTaiLieuId,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res;
    }
    return null;
  }

  async downloadFileVanBanID(nameAttachFile: string, vanBanId: number) {
    try {
      const res = await $api(`/api/vanban-tailieu/${vanBanId}/download`, {
        method: 'GET',
        responseType: 'blob',
      });
      // Create a Blob object from the response
      const blob = res as Blob; // Type assertion to ensure it's treated as a Blob
      const url = window.URL.createObjectURL(blob);

      // Create a download link and set the file name
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', nameAttachFile || 'downloaded-file'); // Use the passed file name or a default

      // Append the link, trigger the download, and clean up
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      link.remove();
    }
    catch (error) {
      console.error('Error exporting file:', error);
    }
  }

  async downloadFileVanBanNhomDate(nameAttachFile: string, sukien_id: number) {
    try {
      const res = await $api(
        `/api/sukien-thientai/${sukien_id}/van-ban/download`,
        {
          method: 'GET',
          responseType: 'blob',
        },
      );
      // Create a Blob object from the response
      const blob = res as Blob; // Type assertion to ensure it's treated as a Blob
      const url = window.URL.createObjectURL(blob);

      // Create a download link and set the file name
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', nameAttachFile || 'downloaded-file'); // Use the passed file name or a default

      // Append the link, trigger the download, and clean up
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      link.remove();
    }
    catch (error) {
      console.error('Error exporting file:', error);
    }
  }

  async listVanBanSukienThienTaiDatatable(length?: number, start?: number) {
    const res = await $api<RestPagedDataTable<VanBanModel[]>>(
      `/api/vanban-tailieu/datatable`,
      {
        method: 'POST',
        body: {
          length: length,
          start: start,
        },
      },
    );

    if (res && res.status === EnumStatus.OK) {
      return res;
    }
    return null;
  }

  async delete(entity: VanBanModel) {
    const response = await $api<RestPagedDataTable<VanBanModel[]>>(
      `/api/vanban-tailieu`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entity),
      },
    );

    if (response) {
      return response;
    }

    return null;
  }

  async update(entity: VanBanModel) {
    const response = await $api<RestPagedDataTable<VanBanModel[]>>(
      `/api/vanban-tailieu`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entity),
      },
    );

    if (response) {
      return response;
    }

    return null;
  }

  async insert(entity: VanBanModel) {
    const response = await $api<RestPagedDataTable<VanBanModel[]>>(
      `/api/vanban-tailieu`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entity),
      },
    );

    if (response) {
      return response;
    }

    return null;
  }
}

const VanBanSuKienThienTaiService = new _VanBanSuKienThienTaiService();
export { VanBanSuKienThienTaiService };
