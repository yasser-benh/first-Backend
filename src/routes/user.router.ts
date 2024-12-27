import { Router } from "express";
import {
  handleCreateUser,
  handleDeleteUser,
  handleGetUserById,
  handleGetUsers,
  handleUpdateUser,
  handleGetCurrentUser,
  handleUpdateCurrentUser,
} from "../controllers/user.controller";
import validate from "../helpers/validate";
import {
  UserCreatedSchema,
  userGetAllSchema,
  UserUpdateSchema,
} from "../schema/user.schema";
import { catchErrors } from "../helpers/catchErrors";
import { RoleGuard } from "../guards/Role.guard";
import { AuthGuard } from "../guards/Auth.guard";

const router = Router();

router
  .get(
    "/",
    [AuthGuard, RoleGuard("users", "get"), validate(userGetAllSchema)],
    catchErrors(handleGetUsers)
  )
  .get("/me", catchErrors(handleGetCurrentUser))
  .get("/:id", [RoleGuard("users", "get")], catchErrors(handleGetUserById))
  .post(
    "/",
    [validate(UserCreatedSchema), RoleGuard("users", "create")],
    catchErrors(handleCreateUser)
  )
  .patch("/me", catchErrors(handleUpdateCurrentUser))
  .patch(
    "/:id",
    [validate(UserUpdateSchema), RoleGuard("users", "update")],
    catchErrors(handleUpdateUser)
  )
  .delete(
    "/:id",
    [RoleGuard("users", "delete")],
    catchErrors(handleDeleteUser)
  );

export default router;
