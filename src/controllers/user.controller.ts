import { Request, Response } from "express";
import { SortUsersBy } from "../model/user.model";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../services/user.service";
async function handleGetUsers(req: Request, res: Response): Promise<void> {
  const page = parseInt((req.query.page as string | undefined) ?? "1");
  const limit = parseInt((req.query.limit as string | undefined) ?? "10");
  const sort = req.query.sort as "asc" | "desc";
  const sort_by = req.query.sort_by as SortUsersBy;
  const users = await getAllUsers({ page, limit, sort, sort_by });
  res.json(users);
}

async function handleGetUserById(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const user = await getUserById(id);
  res.json(user);
}

async function handleCreateUser(req: Request, res: Response) {
  const new_users = req.body;
  await createUser(new_users);
  res.json({ message: "User created" });
}

async function handleUpdateUser(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const updated_user = req.body;
  await updateUser(id, updated_user);
  res.json({ message: "User updated" });
}

async function handleDeleteUser(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  await deleteUser(id);
  res.json({ message: "User deleted" });
}

export {
  handleUpdateUser,
  handleGetUserById as handleGetUsersById,
  handleCreateUser,
  handleDeleteUser,
  handleGetUsers,
};
