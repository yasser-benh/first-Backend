import { z } from "zod";
import { getQuerySchema } from "../helpers/getQuerySchema";

export const ProjectCreatedSchema = z.object({
  body: z.object({
    description: z
      .string({ required_error: "Description is required" })
      .min(1)
      .max(255)
      .optional(),
    name: z.string({ required_error: "Name is required" }).min(1).max(35),
  }),
});

export const ProjectUpdateSchema = z.object({
  body: z.object({
    name: z
      .string({
        message: "Name must be a string",
      })
      .min(1)
      .max(35)
      .optional(),
    description: z
      .string({
        message: "Description must be a string",
      })
      .min(1)
      .max(255)
      .optional(),
  }),
});

export const ProjectGetAllSchema = z.object({
  query: getQuerySchema(["id", "name", "description", "created_by"]),
});
