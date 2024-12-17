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

const router = Router();

router
  .get("/", [validate(TaskGetAllSchema)], catchErrors(handleGetTasks))
  .get("/:id", catchErrors(handleGetTaskById))
  .post("/", [validate(TaskCreateSchema)], catchErrors(handleCreateTask))
  .patch("/:id", [validate(TaskUpdateSchema)], catchErrors(handleUpdateTask))
  .delete("/:id", catchErrors(handleDeleteTask));

export default router;
