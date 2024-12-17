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

const router = Router();

router
  .get("/", [validate(ProjectGetAllSchema)], catchErrors(handleGetProjects))
  .get("/:id", catchErrors(handleGetProjectById))
  .post("/", [validate(ProjectCreatedSchema)], catchErrors(handleCreateProject))
  .patch(
    "/:id",
    [validate(ProjectUpdateSchema)],
    catchErrors(handleUpdateProject)
  )
  .delete("/:id", catchErrors(handleDeleteProject));

export default router;
