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
import { catchErrors } from "../helpers/catchErrors";
import { RoleGuard } from "../guards/Role.guard";

const router = Router();

router
  .get("/", [validate(TaskGetAllSchema),RoleGuard("tasks", "get")], catchErrors(handleGetTasks))
  .get("/:id", [RoleGuard("tasks", "get")],catchErrors(handleGetTaskById))
  .post("/", [validate(TaskCreateSchema),RoleGuard("tasks", "create")], catchErrors(handleCreateTask))
  .patch("/:id", [validate(TaskUpdateSchema),RoleGuard("tasks", "update")], catchErrors(handleUpdateTask))
  .delete("/:id", [RoleGuard("tasks", "delete")],catchErrors(handleDeleteTask));

export default router;
