interface SuKienThienTaiDatatableParams {
  searchKey?: string;
  year?: number;
  length?: number;
  start?: number;
  loaiThienTaiIds?: number[];
  districtCodes?: string[];
  provinceCodes?: string[];
  from?: Date;
  to?: Date;
}

export type { SuKienThienTaiDatatableParams };
