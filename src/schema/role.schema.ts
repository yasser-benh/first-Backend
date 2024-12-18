import { z } from "zod";
import { getQuerySchema } from "../helpers/getQuerySchema";

export const RoleCreatedSchema = z.object({
  body: z.object({
    permissions: z.object({
      tasks: z
        .array(z.enum(["create", "get", "update", "delete", "assign"]))
        .optional(),
      projects: z
        .array(z.enum(["create", "get", "update", "delete"]))
        .optional(),
      users: z.array(z.enum(["create", "get", "update", "delete"])).optional(),
      roles: z.array(z.enum(["create", "get", "update", "delete"])).optional(),
    }),
    name: z
      .string({
        message: "Name must be a string",
      })
      .min(1)
      .max(35),
    description: z
      .string({
        message: "Name must be a string",
      })
      .min(1)
      .max(255)
      .optional(),
  }),
});

export const RoleUpdateSchema = z.object({
  body: z.object({
    permissions: z.object({
      tasks: z
        .array(z.enum(["create", "get", "update", "delete", "assign"]))
        .optional(),
      projects: z
        .array(z.enum(["create", "get", "update", "delete"]))
        .optional(),
      users: z.array(z.enum(["create", "get", "update", "delete"])).optional(),
      roles: z.array(z.enum(["create", "get", "update", "delete"])).optional(),
    }),
    description: z
      .string({
        message: "Name must be a string",
      })
      .min(1)
      .max(255)
      .optional(),
  }),
});

export const RoleGetAllSchema = z.object({
  query: getQuerySchema(["id", "name", "description"]),
});
