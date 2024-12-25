import { Router } from "express";
import {
  handleCreateUser,
  handleDeleteUser,
  handleGetUserById,
  handleGetUsers,
  handleUpdateUser,
} from "../controllers/user.controller";
import validate from "../helpers/validate";
import {
  UserCreatedSchema,
  userGetAllSchema,
  UserUpdateSchema,
} from "../schema/user.schema";
import { catchErrors } from "../helpers/catchErrors";
import { RoleGuard } from "../guards/Role.guard";

const router = Router();

router
  .get("/", [validate(userGetAllSchema),RoleGuard("users", "get")], catchErrors(handleGetUsers))
  .get("/:id", [RoleGuard("users", "get")],catchErrors(handleGetUserById))
  .post("/", [validate(UserCreatedSchema),RoleGuard("users", "create")], catchErrors(handleCreateUser))
  .patch("/:id", [validate(UserUpdateSchema),RoleGuard("users", "update")], catchErrors(handleUpdateUser))
  .delete("/:id", [RoleGuard("users", "delete")],catchErrors(handleDeleteUser));

export default router;
