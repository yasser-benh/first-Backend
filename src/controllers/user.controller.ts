import { Request, Response } from "express";
import { SortUsersBy } from "../model/user.model";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../services/user.service";
import { STATUS_CODES } from "../constants/STATUS_CODES";
import { CustomRequest } from "../app";

async function handleGetUsers(req: Request, res: Response): Promise<void> {
  const page = parseInt((req.query.page as string | undefined) ?? "1");
  const limit = parseInt((req.query.limit as string | undefined) ?? "10");
  const sort = req.query.sort as "asc" | "desc";
  const sort_by = req.query.sort_by as SortUsersBy;
  const users = await getAllUsers({ page, limit, sort, sort_by });
  res.json(users);
}

async function handleGetUserById(req: Request, res: Response) {
  const id = req.params.id;
  const user = await getUserById(id);
  res.json(user);
}

async function handleGetCurrentUser(req: CustomRequest, res: Response) {
  const current_user = req.user;
  const user = await getUserById(current_user.id);
  res.json(user);
}

async function handleCreateUser(req: Request, res: Response) {
  const new_user_payload = req.body;
  const new_user = await createUser(new_user_payload);
  if (new_user === null) {
    res.status(STATUS_CODES.NOT_FOUND).json({ message: "Invalid payload" });
    return;
  }
  res.status(STATUS_CODES.CREATED).json(new_user);
}

async function handleUpdateUser(req: Request, res: Response) {
  const id = req.params.id;
  const updated_user_payload = req.body;
  const updated_user = await updateUser(id, updated_user_payload);
  if (updated_user === null) {
    res.status(STATUS_CODES.NOT_FOUND).json({ message: "User not found" });
    return;
  }
  res.json(updated_user);
}

async function handleUpdateCurrentUser(req: CustomRequest, res: Response) {
  const id = req.user.id;
  const updated_user_payload = req.body;
  const updated_user = await updateUser(id, updated_user_payload);
  if (updated_user === null) {
    res.status(STATUS_CODES.NOT_FOUND).json({ message: "User not found" });
    return;
  }
  res.json(updated_user);
}

async function handleDeleteUser(req: Request, res: Response) {
  const id = req.params.id;
  const deleted_user = await deleteUser(id);
  res.json(deleted_user);
}

export {
  handleUpdateUser,
  handleGetUserById,
  handleCreateUser,
  handleDeleteUser,
  handleGetUsers,
  handleGetCurrentUser,
  handleUpdateCurrentUser,
};
