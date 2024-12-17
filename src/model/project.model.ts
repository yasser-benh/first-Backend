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
