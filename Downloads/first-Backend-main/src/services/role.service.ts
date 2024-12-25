import {
  NewRole,
  SortRoleBy,
  UpdateRole,
  RoleModel,
} from "../model/role.model";

export async function getAllRoles({
  page,
  limit,
  sort,
  sort_by,
}: {
  page: number;
  limit: number;
  sort?: "asc" | "desc";
  sort_by?: SortRoleBy;
}) {
  const query = RoleModel.find()
    .skip((page - 1) * limit)
    .limit(limit);

  if (sort_by && sort) {
    query.sort({ [sort_by]: sort });
  }
  const data = await query.exec();
  return data;
}

export async function getRoleById(id: string) {
  return await RoleModel.findById(id);
}

export async function getRoleByName(name: string) {
  return await RoleModel.find().where({
    name: name,
  });
}

export async function createRole(Role: NewRole) {
  return await RoleModel.create(Role);
}

export async function updateRole(id: string, Role: UpdateRole) {
  return await RoleModel.findByIdAndUpdate(id, Role);
}

export async function deleteRole(id: string) {
  return await RoleModel.findByIdAndDelete(id);
}
