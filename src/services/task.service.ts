import {
  createTaskFromDb,
  deleteTaskFromDb,
  getTaskByIdFromDb,
  getTasksFromDb,
  NewTask,
  SortTasksBy,
  Task,
  UpdateTask,
  updateTaskFromDb,
} from "../model/task.model";

export async function getTasks({
  page,
  limit,
  sort,
  sort_by,
}: {
  page: number;
  limit: number;
  sort?: "asc" | "desc";
  sort_by?: SortTasksBy;
}) {
  const data = await getTasksFromDb({ page, limit, sort, sort_by });
  return data;
}

export async function getTaskById(id: number) {
  return await getTaskByIdFromDb(id);
}

export async function createTask(task: NewTask) {
  return await createTaskFromDb(task);
}

export async function updateTask(id: number, task: UpdateTask) {
  return await updateTaskFromDb(id, task);
}

export async function deleteTask(id: number) {
  return await deleteTaskFromDb(id);
}
