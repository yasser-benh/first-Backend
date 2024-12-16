import z from "zod";

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
  }),
});

export const TaskUpdateSchema = z.object({
  body: z.object({
    message: z.string().min(1).max(255).optional(),
    completed: z.boolean().optional(),
  }),
});

export const TaskGetAllSchema = z.object({
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
