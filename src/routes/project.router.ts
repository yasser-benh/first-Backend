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

const router = Router();

router
  .get("/", [validate(ProjectGetAllSchema)], handleGetProjects)
  .get("/:id", handleGetProjectById)
  .post("/", [validate(ProjectCreatedSchema)], handleCreateProject)
  .patch("/:id", [validate(ProjectUpdateSchema)], handleUpdateProject)
  .delete("/:id", handleDeleteProject);

export default router;
