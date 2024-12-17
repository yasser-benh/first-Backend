import {
  NewTask,
  SortTasksBy,
  TaskModel,
  UpdateTask,
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
  const query = TaskModel.find()
    .skip((page - 1) * limit)
    .limit(limit);

  if (sort_by && sort) {
    query.sort({ [sort_by]: sort });
  }

  const data = await query.exec();
  return data;
}

export async function getTaskById(id: string) {
  return await TaskModel.findById(id);
}

export async function createTask(task: NewTask) {
  try {
    return await TaskModel.create(task);
  } catch (error) {
    return null;
  }
}

export async function updateTask(id: string, task: UpdateTask) {
  return await TaskModel.findByIdAndUpdate(id, task);
}

export async function deleteTask(id: string) {
  return await TaskModel.findByIdAndDelete(id);
}
