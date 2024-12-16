import { Router } from "express";
import {
  handleCreateTask,
  handleDeleteTask,
  handleGetTaskById,
  handleGetTasks,
  handleUpdateTask,
} from "../controllers/task.controller";
import validate from "../helpers/validate";
import {
  TaskGetAllSchema,
  TaskCreateSchema,
  TaskUpdateSchema,
} from "../schema/task.schema";

const router = Router();

router
  .get("/", [validate(TaskGetAllSchema)], handleGetTasks)
  .get("/:id", handleGetTaskById)
  .post("/", [validate(TaskCreateSchema)], handleCreateTask)
  .patch("/:id", [validate(TaskUpdateSchema)], handleUpdateTask)
  .delete("/:id", handleDeleteTask);

export default router;
