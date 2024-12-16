import { Request, Response } from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../services/task.service";
import { Task } from "../model/task.model";

async function handleGetTasks(req: Request, res: Response): Promise<void> {
  const page = parseInt((req.query.page as string | undefined) ?? "1");
  const limit = parseInt((req.query.limit as string | undefined) ?? "10");
  const sort = req.query.sort as "asc" | "desc";
  const sort_by = req.query.sort_by as keyof Omit<
    Task,
    "message" | "completed"
  >;
  const tasks = await getTasks({ page, limit, sort, sort_by });
  res.json(tasks);
}

async function handleGetTaskById(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const task = await getTaskById(id);
  res.json(task);
}

async function handleCreateTask(req: Request, res: Response) {
  const new_task = req.body;
  await createTask(new_task);
  res.json({ message: "Task created" });
}

async function handleUpdateTask(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const updated_task = req.body;
  await updateTask(id, updated_task);
  res.json({ message: "Task updated" });
}

async function handleDeleteTask(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  await deleteTask(id);
  res.json({ message: "Task deleted" });
}

export {
  handleGetTasks,
  handleGetTaskById,
  handleCreateTask,
  handleUpdateTask,
  handleDeleteTask,
};
