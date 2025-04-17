class TreeModel {
  constructor() {
    this.id = '';
  }

  id: string;
  text?: string;
  order?: number;
  has_media?: boolean;
  children?: Array<TreeModel>;
  data?: TreeData | Layer | undefined;
  state?: State;
  type?: string;
  data_count?: number;
}

class State {
  opened?: boolean;
  disabled?: boolean;
  selected?: boolean;
}

class TreeData {
  constructor() {
    this.uid = '';
  }

  id?: number;
  mo_ta?: string;
  parent_id?: number;
  parent?: TreeData | Layer | undefined;
  order_id?: number;
  layer_list?: Array<Layer>;
  uid: string;
  children?: Array<TreeData | Layer>;
  key?: string;
  mapservice_url?: string;
  data: any;
}

class Layer {
  constructor() {
    this.symbol_width = 0;
    this.symbol_height = 0;
    this.uid = '';
  }

  key?: string;
  id?: number;
  parent_id?: number;
  nhom_dulieu_id?: number;
  nguon?: number;
  ten_lop?: string;
  symbol?: string;
  symbol_color?: string;
  symbol_width: number;
  symbol_height: number;
  bang_dulieu?: string;
  co_hienthi?: boolean;
  mapservice_type_id?: number;
  mapservice_url?: string;
  mapservice_param?: string;
  macdinh_hienthi?: boolean;
  order_id?: number;
  kieu_hinhhoc?: string;
  nhom_dulieu?: NhomDuLieu;
  uid: string;
  parent?: TreeData | Layer | undefined;
  children?: Array<TreeData | Layer>;
  data: any;
}

class NhomDuLieu {
  id?: number;
  mo_ta?: string;
  parent_id?: number;
  order_id?: number;
  layer_list?: Array<Layer>;
}

// class TreeChildModel {
//     id?: number;
//     mo_ta?: string;
//     icon?: string;
//     parent_id?: null;
//     mapservice_url?: null;
// }

export { TreeModel, TreeData, Layer };
