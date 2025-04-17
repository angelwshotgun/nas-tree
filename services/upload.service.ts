import type { RestData } from '../models/base-response.model';
import { BaseService } from './base.service';

// upload images
class _UploadService extends BaseService {
  async uploadImages(form: FormData) {
    const res = await $api<RestData<string[]>>(
      `${EnumMedia.uploadImage}`,
      {
        method: 'POST',
        body: form,
      },
    );
    if (res != null && res.status === EnumStatus.OK) {
      return res.data;
    }
    return [];
  }

  // upload document
  async uploadDocuments(dto: FormData) {
    const res = await $api<RestData<string[]>>(
      `${EnumMedia.uploadDocument}`,
      {
        method: 'POST',
        body: dto,
      },
    );
    if (res != null && res.status === EnumStatus.OK) {
      return res.data;
    }
    return [];
  }

  async exportFile(file: any, nameAttachFile: string, tram: string) {
    try {
      // Perform the API request, explicitly expecting a binary response
      const res = await $api(`/api/giatri-quantrac-tram/${tram}/export`, {
        method: 'POST',
        body: file,
        responseType: 'blob', // Ensure the response is treated as a binary Blob
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
}

const UploadService = new _UploadService();
export { UploadService };
