import z from "zod";
import { getQuerySchema } from "../helpers/getQuerySchema";

export const TaskCreateSchema = z.object({
  body: z.object({
    message: z
      .string({
        required_error: "Message is required",
      })
      .min(1)
      .max(255),
    completed: z
      .boolean({
        message: "Completed must be a boolean",
      })
      .optional()
      .default(false),
    created_by: z.string().min(1).max(255),
    assigned_to: z.string().min(1).max(255).optional(),
  }),
});

export const TaskUpdateSchema = z.object({
  body: z.object({
    message: z.string().min(1).max(255).optional(),
    completed: z.boolean().optional(),
  }),
});

export const TaskGetAllSchema = z.object({
  query: getQuerySchema([
    "id",
    "message",
    "completed",
    "created_by",
    "assigned_to",
  ]),
});
