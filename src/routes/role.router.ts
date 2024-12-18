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

const router = Router();

router
  .get("/", [validate(RoleGetAllSchema)], catchErrors(handleGetRoles))
  .get("/:id", catchErrors(handleGetRoleById))
  .post("/", [validate(RoleCreatedSchema)], catchErrors(handleCreateRole))
  .patch("/:id", [validate(RoleUpdateSchema)], catchErrors(handleUpdateRole))
  .delete("/:id", catchErrors(handleDeleteRole));

export default router;
