class PermissionModel {
  module?: string;
  read_permission?: ModuleModel;
  create_permission?: ModuleModel;
  edit_permission?: ModuleModel;
  delete_permission?: ModuleModel;
  view_permission?: ModuleModel;
  download_permission?: ModuleModel;
  raw?: ModuleModel[];
}

class ModuleModel {
  id?: number;
  permission_name?: string;
  permission_value?: string;
  parent_path?: string;
  parent?: {
    id?: number;
    permission_name?: string;
    permission_value?: string;
    parent_path?: string;
    parent?: string;
    module?: string;
  };

  module?: {
    id?: number;
    text?: string;
  };
}
export { PermissionModel };
