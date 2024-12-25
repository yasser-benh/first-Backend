import mongoose from "mongoose";

export type PermissionType = {
  tasks: ("create" | "update" | "delete" | "get" | "assign")[];
  projects: ("create" | "update" | "delete" | "get")[];
  users: ("create" | "update" | "delete" | "get")[];
  roles: ("create" | "update" | "delete" | "get")[];
  sessions: ("get" | "update" | "delete")[];
};

export interface Role {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  description?: string;
  permissions: Partial<PermissionType>;
}

export type NewRole = {
  name: string;
  description?: string;
  permissions: PermissionType;
};

export type UpdateRole = Partial<Omit<NewRole, "name">>;

export type SortRoleBy = keyof Role;

const RoleSchema = new mongoose.Schema<Role>({
  name: { type: String, required: true },
  description: { type: String, required: false },
  permissions: {
    type: Object,
    required: true,
  },
});

const RolesTableName = "Role";

export const RoleModel = mongoose.model<Role>(RolesTableName, RoleSchema);
