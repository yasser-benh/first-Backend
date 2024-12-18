import { Request, Response } from "express";
import { SortProjectsBy } from "../model/project.model";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../services/project.service";
import { STATUS_CODES } from "../constants/STATUS_CODES";
async function handleGetProjects(req: Request, res: Response): Promise<void> {
  const page = parseInt((req.query.page as string | undefined) ?? "1");
  const limit = parseInt((req.query.limit as string | undefined) ?? "10");
  const sort = req.query.sort as "asc" | "desc";
  const sort_by = req.query.sort_by as SortProjectsBy;
  const projects = await getAllProjects({ page, limit, sort, sort_by });
  res.json(projects);
}

async function handleGetProjectById(req: Request, res: Response) {
  const id = req.params.id;
  const project = await getProjectById(id);
  if (project === null) {
    res.status(STATUS_CODES.NOT_FOUND).json({ message: "Project not found" });
    return;
  }
  res.json(project);
}

async function handleCreateProject(req: Request, res: Response) {
  const new_project_payload = req.body;
  const new_project = await createProject(new_project_payload);
  if (new_project === null) {
    res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Invalid payload" });
    return;
  }
  res.status(STATUS_CODES.CREATED).json(new_project);
}

async function handleUpdateProject(req: Request, res: Response) {
  const id = req.params.id;
  const updated_project_payload = req.body;
  const updated_project = await updateProject(id, updated_project_payload);
  if (updated_project === null) {
    res.status(STATUS_CODES.NOT_FOUND).json({ message: "Project not found" });
    return;
  }
  res.json(updated_project);
}

async function handleDeleteProject(req: Request, res: Response) {
  const id = req.params.id;
  const deleted_project = await deleteProject(id);
  if (deleted_project === null) {
    res.status(STATUS_CODES.NOT_FOUND).json({ message: "Project not found" });
    return;
  }
  res.json(deleted_project);
}

export {
  handleUpdateProject,
  handleGetProjectById,
  handleCreateProject,
  handleDeleteProject,
  handleGetProjects,
};
