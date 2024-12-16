import { Request, Response } from "express";
import { SortProjectsBy } from "../model/project.model";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../services/project.service";
async function handleGetProjects(req: Request, res: Response): Promise<void> {
  const page = parseInt((req.query.page as string | undefined) ?? "1");
  const limit = parseInt((req.query.limit as string | undefined) ?? "10");
  const sort = req.query.sort as "asc" | "desc";
  const sort_by = req.query.sort_by as SortProjectsBy;
  const projects = await getAllProjects({ page, limit, sort, sort_by });
  res.json(projects);
}

async function handleGetProjectById(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const project = await getProjectById(id);
  res.json(project);
}

async function handleCreateProject(req: Request, res: Response) {
  const new_projects = req.body;
  await createProject(new_projects);
  res.json({ message: "Project created" });
}

async function handleUpdateProject(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const updated_project = req.body;
  await updateProject(id, updated_project);
  res.json({ message: "Project updated" });
}

async function handleDeleteProject(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  await deleteProject(id);
  res.json({ message: "Project deleted" });
}

export {
  handleUpdateProject,
  handleGetProjectById as handleGetProjectsById,
  handleCreateProject,
  handleDeleteProject,
  handleGetProjects,
};
