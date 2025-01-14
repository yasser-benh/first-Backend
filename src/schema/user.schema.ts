import { z } from "zod";
import { getQuerySchema } from "../helpers/getQuerySchema";

export const UserCreatedSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email({
      message: "Invalid email format",
    }),
    name: z.string({ required_error: "Name is required" }).min(1).max(35),
    password: z.string({ required_error: "Password is required" }).min(8),
    role: z.string({ required_error: "Role is required" }),
    avatar: z.string({ required_error: "Avatar is required" }).url({
      message: "Invalid URL format",
    }),
  }),
});

export const UserUpdateSchema = z.object({
  body: z.object({
    email: z
      .string({
        message: "Invalid email format",
      })
      .email({ message: "Invalid email format" })
      .optional(),
    name: z
      .string({
        message: "Name must be a string",
      })
      .min(1)
      .max(35)
      .optional(),
    password: z
      .string({ message: "Password must be a string" })
      .min(8)
      .optional(),
    role: z.string({ message: "Role must be a string" }).optional(),
    avatar: z
      .string({
        message: "Avatar must be a string",
      })
      .url({ message: "Invalid URL format" })
      .optional(),
  }),
});

export const userGetAllSchema = z.object({
  query: getQuerySchema(["id", "name", "email", "role", "avatar"]),
});
