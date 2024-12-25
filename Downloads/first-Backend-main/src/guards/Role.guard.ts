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
    const { role } = req.user;

    const role_entity = await getRoleByName(role);

    const has_access = role_entity[0].permissions[resource].includes(
      permission as any
    );

    if (!has_access) {
      return res.status(STATUS_CODES.FORBIDDEN).json({
        message: "Forbidden",
      });
    } else {
      next();
    }
  };
};
