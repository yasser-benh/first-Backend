import {
  createProjectFromDb,
  deleteProjectFromDb,
  getAllProjectsFromDb,
  getProjectByIdFromDb,
  NewProject,
  SortProjectsBy,
  UpdateProject,
  updateProjectFromDb,
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
  const data = await getAllProjectsFromDb({ page, limit, sort, sort_by });
  return data;
}

export async function getProjectById(id: number) {
  return await getProjectByIdFromDb(id);
}

export async function createProject(Project: NewProject) {
  return await createProjectFromDb(Project);
}

export async function updateProject(id: number, Project: UpdateProject) {
  return await updateProjectFromDb(id, Project);
}

export async function deleteProject(id: number) {
  return await deleteProjectFromDb(id);
}
