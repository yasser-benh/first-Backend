import mongoose from "mongoose";
import { UserModelName } from "./user.model";

export interface Task {
  _id: mongoose.Schema.Types.ObjectId;
  created_by: mongoose.Schema.Types.ObjectId;
  assigned_to?: mongoose.Schema.Types.ObjectId | null;
  message: string;
  completed: boolean;
}

export type NewTask = {
  message: string;
  completed: boolean;
  created_by: mongoose.Schema.Types.ObjectId;
  assigned_to?: mongoose.Schema.Types.ObjectId | null;
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
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: UserModelName,
  },
});

export const TaskModelName = "Task";

export const TaskModel = mongoose.model<Task>(TaskModelName, TaskSchema);
