import { Request, Response } from "express";
import { STATUS_CODES } from "../constants/STATUS_CODES";

export function catchErrors(callback: Function) {
  return async function (req: Request, res: Response) {
    try {
      await callback(req, res);
    } catch (error) {
      console.error(error);
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  };
}
