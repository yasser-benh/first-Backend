import { Router } from "express";
import {
  handleCreateProject,
  handleDeleteProject,
  handleGetProjects,
  handleGetProjectsById,
  handleUpdateProject,
} from "../controllers/project.conroller";
import validate from "../helpers/validate";
import {
    ProjectCreatedSchema,
    ProjectGetAllSchema,
    ProjectUpdateSchema,
} from "../schema/project.schema";


const router = Router();

router
  .get("/", [validate(ProjectGetAllSchema)], handleGetProjects)
  .get("/:id", handleGetProjectsById)
  .post("/", [validate(ProjectCreatedSchema)], handleCreateProject)
  .patch("/:id", [validate(ProjectUpdateSchema)], handleUpdateProject)
  .delete("/:id", handleDeleteProject);

export default router;
