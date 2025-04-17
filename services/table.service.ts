import type { RestData, RestError } from '../models/base-response.model';
import type { CategoryModel } from '../models/dto/response/categories/category.model';
import type { TableColumnModel } from '../models/dto/response/table/column/table-column.model';
import type { TableModel } from '../models/dto/response/table/table.model';
import type { Table } from '../models/table.model';

class _TableService {
  getByName(tableName?: string): Promise<Table | undefined> {
    return $api<RestData<Table>>(`/api/table/${tableName}`).then((res) => {
      if (res && res.status === EnumStatus.OK) {
        return res.data;
      }

      return undefined;
    });
  }

  getRecord(tableName?: string, recordId?: string | number | object): Promise<any | undefined> {
    return $api<RestData<any>>(`/api/table/${tableName}/record/${recordId}`).then((res) => {
      if (res && res.status === EnumStatus.OK) {
        return res.data;
      }

      return undefined;
    });
  }

  async getTableBySchema(schema: string) {
    const response = await $api<RestData<TableModel[]>>(`/api/table/list`, {
      method: 'GET',
      params: {
        schema: schema,
      },
    });

    if (response != null && response.status === EnumStatus.OK) {
      return response.data;
    }

    return null;
  }

  async getDataById(tableId?: number) {
    const response = await $api<RestData<object[]>>(`/api/table/data`, {
      method: 'GET',
      params: {
        id: tableId,
      },
    });

    if (response != null && response.status === EnumStatus.OK) {
      return response.data;
    }

    return null;
  }

  async insert(tableId?: number, entity?: object) {
    const response = await $api<RestData<object[]> | RestError>(`/api/table/${tableId}/insert`, {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify(entity),
    });

    if (response != null && response.status === EnumStatus.OK) {
      return response;
    }
    else if (response != null && response.status === EnumStatus.ERROR) {
      return response;
    }

    return null;
  }

  async update(tableId?: number, entity?: object) {
    const response = await $api<RestData<object[]> | RestError>(`/api/table/${tableId}/update`, {
      method: 'PUT',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify(entity),
    });

    if (response != null && response.status === EnumStatus.OK) {
      return response;
    }
    else if (response != null && response.status === EnumStatus.ERROR) {
      return response;
    }

    return null;
  }

  async delete(tableId: number, entity?: object) {
    const response = await $api<RestData<object[]>>(`/api/table/${tableId}/delete`, {
      method: 'DELETE',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify(entity),
    });

    if (response != null && response.status === EnumStatus.OK) {
      return response;
    }

    return null;
  }

  async getColumnTableById(tableId?: number) {
    const response = await $api<RestData<TableColumnModel[]>>(`/api/table/${tableId}/columns`, {
      method: 'GET',
    });

    if (response != null && response.status === EnumStatus.OK) {
      return response.data;
    }

    return null;
  }

  async getInfoTable(tableId: number) {
    const response = await $api<RestData<TableModel>>(`/api/table/${tableId}`, {
      method: 'GET',
    });

    if (response != null && response.status === EnumStatus.OK) {
      return response.data;
    }

    return null;
  }

  async getRecordTable(tableId: number, recordId: number) {
    const response = await $api<RestData<CategoryModel>>(`/api/table/${tableId}/record/${recordId}`, {
      method: 'GET',
    });

    if (response != null && response.status === EnumStatus.OK) {
      return response.data;
    }

    return null;
  }
}

const TableService = new _TableService();

export { TableService };
