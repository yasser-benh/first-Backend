import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validate =
  (schema: AnyZodObject) => (req: Request, res: any, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      return res.status(400).json(e.errors);
    }
  };

export default validate;
