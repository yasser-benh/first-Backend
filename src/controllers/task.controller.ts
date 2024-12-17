import { Request, Response } from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../services/task.service";
import { SortTasksBy } from "../model/task.model";
import { STATUS_CODES } from "../constants/STATUS_CODES";

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

async function handleCreateTask(req: Request, res: Response) {
  const new_task_payload = req.body;
  const new_task = await createTask(new_task_payload);
  if (new_task === null) {
    res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Invalid payload" });
    return;
  }
  res.status(STATUS_CODES.CREATED).json(new_task);
}

async function handleUpdateTask(req: Request, res: Response) {
  const id = req.params.id;
  const updated_task_payload = req.body;
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
