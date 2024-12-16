import { z } from "zod";

export function getQuerySchema(sort_by: readonly [string, ...string[]]) {
  return z
    .object({
      page: z.string().optional(),
      limit: z.string().optional(),
      sort: z.enum(["asc", "desc"]).optional(),
      sort_by: z.enum(sort_by).optional(),
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
    });
}
