interface ThuMucTreeModel {
  key: string;
  label: string;
  data?: Data;
  selected?: boolean;
  checked?: boolean;
  expanded: boolean;
  icon?: string;
  type?: string;
  parentKey: string;
  children: Array<ThuMucTreeModel>;
  hasDocuments: boolean;
}

interface Data {
  id: number;
  ten_thumuc?: string;
  parent_id?: string;
  co_tailieu: boolean;
}

class ThuMucModel {
  id?: number;
  ten_thumuc?: string;
  parent_id?: number;
  co_tailieu?: boolean;

  constructor() {
    this.id = 0;
    this.ten_thumuc = undefined;
    this.parent_id = 0;
    this.co_tailieu = false;
  }
}

export { ThuMucModel, type ThuMucTreeModel };
