import { z } from "zod";
import { getQuerySchema } from "../helpers/getQuerySchema";

export const UserCreatedSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email({
      message: "Invalid email format",
    }),
    name: z.string({ required_error: "Name is required" }).min(1).max(35),
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
  }),
});

export const userGetAllSchema = z.object({
  query: getQuerySchema(["id", "name", "email"]),
});
