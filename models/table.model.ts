interface Table {
  id?: number;
  table_schema?: string;
  table_name?: string;
  name_en?: string;
  name_vn?: string;
  permanent?: boolean;
  order?: number;
  identity_column?: TableColumn;
  key_column?: TableColumn;
  label_column?: TableColumn;
  columns?: TableColumn[];
}

interface TableColumn {
  id?: number;
  name_en?: string;
  name_vn?: string;
  table_id?: number;
  require?: boolean;
  column_name?: string;
  data_type?: string;
  character_max_length?: number;
  visible?: boolean;
  is_identity?: boolean;
  is_key?: boolean;
  is_label?: boolean;
  is_nullable?: boolean;
  permanent?: boolean;
  order?: number;
  has_category?: boolean;
  is_searchable?: boolean;
  readonly?: boolean;
  less_col_id?: number;
  data_in_radius_of_layer?: number;
  lookup_table_id?: number;
  suggestion_column_id?: number;
  allow_group?: boolean;
  summary_total?: boolean;
  summary_count?: boolean;
  summary_percent?: boolean;
  formula?: string;
  unit?: string;
  table?: Table;
}

export type { Table, TableColumn };
