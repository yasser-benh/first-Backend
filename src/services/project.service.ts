import { query } from "express";
import {
  NewProject,
  ProjectModel,
  SortProjectsBy,
  UpdateProject,
} from "../model/project.model";

export async function getAllProjects({
  page,
  limit,
  sort,
  sort_by,
}: {
  page: number;
  limit: number;
  sort?: "asc" | "desc";
  sort_by?: SortProjectsBy;
}) {
  const query = ProjectModel.find()
    .skip((page - 1) * limit)
    .limit(limit);

  if (sort_by && sort) {
    query.sort({ [sort_by]: sort });
  }

  const data = await query.exec();

  return data;
}

export async function getProjectById(id: string) {
  return await ProjectModel.findById(id);
}

export async function createProject(Project: NewProject) {
  return await ProjectModel.create(Project);
}

export async function updateProject(id: string, Project: UpdateProject) {
  return await ProjectModel.findByIdAndUpdate(id, Project);
}

export async function deleteProject(id: string) {
  return await ProjectModel.findByIdAndDelete(id);
}
