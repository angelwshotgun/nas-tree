import { CategoryModel } from '../categories/category.model';

class NhomDuLieuModel extends CategoryModel {
  parent_id?: number;
  order_id?: number;
  layer_list?: any[];

  constructor(
    id?: number,
    mo_ta?: string,
    parent_id?: number,
    order_id?: number,
    layer_list?: any[],
  ) {
    super(id, mo_ta);
    this.parent_id = parent_id;
    this.order_id = order_id;
    this.layer_list = layer_list;
  }
}
export { NhomDuLieuModel };
