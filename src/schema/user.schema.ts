import { z } from "zod";

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
  query: z
    .object({
      page: z.string().optional(),
      limit: z.string().optional(),
      sort: z.enum(["asc", "desc"]).optional(),
      sort_by: z.enum(["id"]).optional(),
    })
    .refine((data) => {
      if (data.page) {
        if (isNaN(parseInt(data.page))) {
          return false;
        }
      }
      if (data.limit) {
        if (isNaN(parseInt(data.limit))) {
          return false;
        }
      }
      return true;
    }),
});
