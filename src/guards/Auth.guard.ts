import { NextFunction, Response } from "express";
import { CustomRequest } from "./../app";
import { STATUS_CODES } from "../constants/STATUS_CODES";

export async function AuthGuard(
  req: CustomRequest,
  res: any,
  next: NextFunction
) {
  const user = req.user;

  if (!user) {
    return res
      .status(STATUS_CODES.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }

  return next();
}
