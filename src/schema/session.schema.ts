import { z } from "zod";
import { getQuerySchema } from "../helpers/getQuerySchema";

export const SessionCreatedSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email({
      message: "Invalid email format",
    }),
    password: z.string({ required_error: "Password is required" }).min(8),
  }),
});

export const SignUpSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: "Name is required" }).min(1).max(35),
      email: z.string({ required_error: "Email is required" }).email({
        message: "Invalid email format",
      }),
      password: z.string({ required_error: "Password is required" }).min(8),
      confirmPassword: z
        .string({ required_error: "Confirm password is required" })
        .min(8),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
    }),
});

export const SessionUpdateSchema = z.object({
  body: z.object({
    valid: z.boolean(),
  }),
});

export const SessionGetAllSchema = z.object({
  query: getQuerySchema(["id", "created_at", "updated_at"]),
});
