import { Request, Response } from "express";
import {
  createRole,
  deleteRole,
  getAllRoles,
  getRoleByName,
  updateRole,
} from "../services/role.service";
import { STATUS_CODES } from "../constants/STATUS_CODES";
import { SortRoleBy } from "../model/role.model";

async function handleGetRoles(req: Request, res: Response): Promise<void> {
  const page = parseInt((req.query.page as string | undefined) ?? "1");
  const limit = parseInt((req.query.limit as string | undefined) ?? "10");
  const sort = req.query.sort as "asc" | "desc";
  const sort_by = req.query.sort_by as SortRoleBy;
  const roles = await getAllRoles({ page, limit, sort, sort_by });
  res.json(roles);
}

async function handleGetRoleById(req: Request, res: Response) {
  const id = req.params.id;
  const role = await getRoleByName(id);
  res.json(role);
}

async function handleCreateRole(req: Request, res: Response) {
  const new_role_payload = req.body;
  console.log("🚀 ~ handleCreateRole ~ new_role_payload:", new_role_payload);
  const new_role = await createRole(new_role_payload);
  console.log("🚀 ~ handleCreateRole ~ new_role:", new_role);
  if (new_role === null) {
    res.status(STATUS_CODES.NOT_FOUND).json({ message: "Invalid payload" });
    return;
  }
  res.status(STATUS_CODES.CREATED).json(new_role);
}

async function handleUpdateRole(req: Request, res: Response) {
  const id = req.params.id;
  const updated_role_payload = req.body;
  const updated_role = await updateRole(id, updated_role_payload);
  if (updated_role === null) {
    res.status(STATUS_CODES.NOT_FOUND).json({ message: "Role not found" });
    return;
  }
  res.json(updated_role);
}

async function handleDeleteRole(req: Request, res: Response) {
  const id = req.params.id;
  const deleted_role = await deleteRole(id);
  res.json(deleted_role);
}

export {
  handleUpdateRole,
  handleGetRoleById,
  handleCreateRole,
  handleDeleteRole,
  handleGetRoles,
};
