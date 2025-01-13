import { NextFunction, Response } from "express";
import { STATUS_CODES } from "../constants/STATUS_CODES";
import { CustomRequest } from "../app";
import { getRoleByName } from "../services/role.service";
import { PermissionType } from "../model/role.model";

export const RoleGuard = (
  resource: keyof PermissionType,
  permission: PermissionType[typeof resource][0]
) => {
  return async (req: CustomRequest, res: any, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return res.status(STATUS_CODES.FORBIDDEN).json({
        message: "Forbidden",
      });
    }
    const { role } = user;

    const [{ permissions }] = await getRoleByName(role);

    const has_access = permissions[resource]?.includes(permission as any);

    if (!has_access) {
      return res.status(STATUS_CODES.FORBIDDEN).json({
        message: "Forbidden",
      });
    } else {
      next();
    }
  };
};
