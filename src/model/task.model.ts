import mongoose from "mongoose";
import { UserModelName } from "./user.model";

export interface Task {
  _id: mongoose.Schema.Types.ObjectId;
  created_by: mongoose.Schema.Types.ObjectId;
  asynied_to?: mongoose.Schema.Types.ObjectId | null;
  message: string;
  completed: boolean;
}

export type NewTask = {
  message: string;
  completed: boolean;
  created_by: mongoose.Schema.Types.ObjectId;
  asynied_to?: mongoose.Schema.Types.ObjectId | null;
};

export type UpdateTask = Partial<Task>;

export type SortTasksBy = keyof Task;

const TaskSchema = new mongoose.Schema<Task>({
  message: { type: String, required: true },
  completed: { type: Boolean, required: true },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: UserModelName,
  },
  asynied_to: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: UserModelName,
  },
});

export const TaskModelName = "Task";

export const TaskModel = mongoose.model<Task>(TaskModelName, TaskSchema);

// export async function getTasksFromDb({
//   page,
//   limit,
//   sort,
//   sort_by,
// }: {
//   page: number;
//   limit: number;
//   sort?: "asc" | "desc";
//   sort_by?: SortTasksBy;
// }) {
//   let data = await readDatabase<Task>("tasks");
//   if (sort_by && sort) {
//     data = sortData(data, sort, sort_by);
//   }
//   return paginateData(data, page, limit);
// }

// export async function getTaskByIdFromDb(id: number) {
//   const data = await readDatabase<Task>("tasks");
//   return data.find((task) => task.id === id);
// }

// export async function createTaskFromDb(new_task: NewTask) {
//   const tasks = await readDatabase<Task>("tasks");
//   const task = { ...new_task, id: new Date().getTime() };
//   await writeDatabase([...tasks, task], "tasks");
// }

// export async function updateTaskFromDb(id: number, updated_task: UpdateTask) {
//   const tasks = await readDatabase<Task>("tasks");
//   const new_tasks = tasks.map((task) => {
//     if (task.id === id) {
//       return { ...task, ...updated_task };
//     }
//     return task;
//   });
//   await writeDatabase(new_tasks, "tasks");
// }

// export async function deleteTaskFromDb(id: number) {
//   const tasks = await readDatabase<Task>("tasks");
//   const new_tasks = tasks.filter((task) => task.id !== id);
//   await writeDatabase(new_tasks, "tasks");
// }
