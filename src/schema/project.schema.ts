import { z } from "zod";

export const ProjectCreatedSchema = z.object({
  body: z.object({
    discription: z.string({ required_error: "Discription is required" }).min(1).max(255),
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
      discripttion: z
      .string({
        message: "Discription must be a string",
      })
      .min(1)
      .max(255)
      .optional(),
  })
  

});

export const ProjectGetAllSchema = z.object({
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
