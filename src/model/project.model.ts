import mongoose from "mongoose";

export interface Project {
  _id: mongoose.Schema.Types.ObjectId;
  created_by: mongoose.Schema.Types.ObjectId;
  name: string;
  description?: string;
}

export type NewProject = {
  name: string;
  description?: string;
};

export type UpdateProject = Partial<NewProject>;

export type SortProjectsBy = keyof Project;

const ProjectSchema = new mongoose.Schema<Project>({
  name: { type: String, required: true },
  description: { type: String, required: false },
});

export const ProjectModelName = "Project";

export const ProjectModel = mongoose.model<Project>(
  ProjectModelName,
  ProjectSchema
);

// export async function getAllProjectsFromDb({
//   page,
//   limit,
//   sort,
//   sort_by,
// }: {
//   page: number;
//   limit: number;
//   sort?: "asc" | "desc";
//   sort_by?: SortProjectsBy;
// }) {
//   let data = await readDatabase<Project>("projects");
//   if (sort_by && sort) {
//     data = sortData(data, sort, sort_by);
//   }
//   return paginateData(data, page, limit);
// }

// export async function getProjectByIdFromDb(id: number) {
//   const data = await readDatabase<Project>("projects");
//   const project = data.find((project) => {
//     return project.id === id;
//   });
//   return project;
// }

// export async function createProjectFromDb(new_user: NewProject) {
//   const projects = await readDatabase<Project>("projects");
//   const project = { ...new_user, id: new Date().getTime() };
//   await writeDatabase([...projects, project], "projects");
// }

// export async function updateProjectFromDb(
//   id: number,
//   updated_project: UpdateProject
// ) {
//   const projects = await readDatabase<Project>("projects");
//   const new_projects = projects.map((project) => {
//     if (project.id === id) {
//       return { ...project, ...updated_project };
//     }
//     return project;
//   });
//   await writeDatabase(new_projects, "projects");
// }

// export async function deleteProjectFromDb(id: number): Promise<void> {
//   const projects = await readDatabase<Project>("projects");
//   const new_projects = projects.filter((project) => project.id !== id);
//   await writeDatabase(new_projects, "projects");
// }
