import { Router } from "express";
import {
  handleCreateProject,
  handleDeleteProject,
  handleGetProjects,
  handleGetProjectById,
  handleUpdateProject,
} from "../controllers/project.controller";
import validate from "../helpers/validate";
import {
  ProjectCreatedSchema,
  ProjectGetAllSchema,
  ProjectUpdateSchema,
} from "../schema/project.schema";
import { catchErrors } from "../helpers/catchErrors";
import { RoleGuard } from "../guards/Role.guard";

const router = Router();

router
  .get(
    "/",
    [validate(ProjectGetAllSchema), RoleGuard("projects", "get")],
    catchErrors(handleGetProjects)
  )
  .get(
    "/:id",
    [RoleGuard("projects", "get")],
    catchErrors(handleGetProjectById)
  )
  .post(
    "/",
    [validate(ProjectCreatedSchema), RoleGuard("projects", "create")],
    catchErrors(handleCreateProject)
  )
  .patch(
    "/:id",
    [validate(ProjectUpdateSchema), RoleGuard("projects", "update")],
    catchErrors(handleUpdateProject)
  )
  .delete(
    "/:id",
    [RoleGuard("projects", "delete")],
    catchErrors(handleDeleteProject)
  );

export default router;
