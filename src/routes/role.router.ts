import { Router } from "express";
import {
  handleDeleteRole,
  handleGetRoles,
  handleGetRoleById,
  handleUpdateRole,
  handleCreateRole,
} from "../controllers/role.controller";
import validate from "../helpers/validate";
import {
  RoleCreatedSchema,
  RoleGetAllSchema,
  RoleUpdateSchema,
} from "../schema/role.schema";
import { catchErrors } from "../helpers/catchErrors";
import { RoleGuard } from "../guards/Role.guard";

const router = Router();

router
  .get(
    "/",
    [validate(RoleGetAllSchema), RoleGuard("roles", "get")],
    catchErrors(handleGetRoles)
  )
  .get("/:id", [RoleGuard("roles", "get")], catchErrors(handleGetRoleById))
  .post(
    "/",
    [validate(RoleCreatedSchema), RoleGuard("roles", "create")],
    catchErrors(handleCreateRole)
  )
  .patch(
    "/:id",
    [validate(RoleUpdateSchema), RoleGuard("roles", "update")],
    catchErrors(handleUpdateRole)
  )
  .delete(
    "/:id",
    [RoleGuard("roles", "delete")],
    catchErrors(handleDeleteRole)
  );

export default router;
