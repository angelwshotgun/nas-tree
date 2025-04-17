class DanhMucModel {
  id?: number;
  table_schema?: string;
  table_name?: string;
  name_en?: string;
  name_vn?: string;
  permanent?: string;
  order?: number;
  table_group_id?: number;
  search_content?: string;
  table_schema_info?: string;
  columns?: null;
  layer?: null;
  table_group?: null;
  identity_column?: null;
  key_column?: null;
  label_column?: null;
}

class TreeDanhMucModel {
  key?: number;
  label?: string;
  data?: DanhMucModel;
  type?: string;
  selected?: boolean;
  expanded?: boolean;
  children?: TreeDanhMucModel[];
}

class ColumnsModel {
  id?: number;
  mo_ta?: string;
  order_id?: number;
}
export { DanhMucModel, TreeDanhMucModel, ColumnsModel };
