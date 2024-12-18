import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { STATUS_CODES } from "../constants/STATUS_CODES";

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
      return res.status(STATUS_CODES.BAD_REQUEST).json(e.errors);
    }
  };

export default validate;
