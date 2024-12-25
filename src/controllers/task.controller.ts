import { Request, Response } from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../services/task.service";
import { NewTask, SortTasksBy, UpdateTask } from "../model/task.model";
import { STATUS_CODES } from "../constants/STATUS_CODES";
import { CustomRequest } from "../app";
import { getRoleByName } from "../services/role.service";

async function handleGetTasks(req: Request, res: Response): Promise<void> {
  const page = parseInt((req.query.page as string | undefined) ?? "1");
  const limit = parseInt((req.query.limit as string | undefined) ?? "10");
  const sort = req.query.sort as "asc" | "desc";
  const sort_by = req.query.sort_by as SortTasksBy;
  const tasks = await getTasks({ page, limit, sort, sort_by });
  res.json(tasks);
}

async function handleGetTaskById(req: Request, res: Response) {
  const id = req.params.id;
  const task = await getTaskById(id);
  if (task === null) {
    res.status(STATUS_CODES.NOT_FOUND).json({ message: "Task not found" });
    return;
  }
  res.json(task);
}

async function handleCreateTask(req: CustomRequest, res: Response) {
  const new_task_payload: NewTask = req.body;
  if (new_task_payload.assigned_to !== null) {
    const { role } = req.user;
    const [{ permissions }] = await getRoleByName(role);
    if (!permissions.tasks.includes("assign")) {
      res
        .status(STATUS_CODES.FORBIDDEN)
        .json({ message: "Forbidden: Cannot assign task" });
      return;
    }
  }
  const new_task = await createTask(new_task_payload);
  if (new_task === null) {
    res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Invalid payload" });
    return;
  }
  res.status(STATUS_CODES.CREATED).json(new_task);
}

async function handleUpdateTask(req: CustomRequest, res: Response) {
  const id = req.params.id;
  const updated_task_payload: UpdateTask = req.body;
  if (updated_task_payload.assigned_to !== null) {
    const { role } = req.user;
    const [{ permissions }] = await getRoleByName(role);
    if (!permissions.tasks.includes("assign")) {
      res
        .status(STATUS_CODES.FORBIDDEN)
        .json({ message: "Forbidden: Cannot assign task" });
      return;
    }
  }
  const updated_task = await updateTask(id, updated_task_payload);
  if (updated_task === null) {
    res.status(STATUS_CODES.NOT_FOUND).json({ message: "Task not found" });
    return;
  }
  res.json(updated_task);
}

async function handleDeleteTask(req: Request, res: Response) {
  const id = req.params.id;
  const deleted_task = await deleteTask(id);
  if (deleted_task === null) {
    res.status(STATUS_CODES.NOT_FOUND).json({ message: "Task not found" });
    return;
  }
  res.json(deleted_task);
}

export {
  handleGetTasks,
  handleGetTaskById,
  handleCreateTask,
  handleUpdateTask,
  handleDeleteTask,
};
