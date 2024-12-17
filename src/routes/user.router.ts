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

const router = Router();

router
  .get("/", [validate(userGetAllSchema)], catchErrors(handleGetUsers))
  .get("/:id", catchErrors(handleGetUserById))
  .post("/", [validate(UserCreatedSchema)], catchErrors(handleCreateUser))
  .patch("/:id", [validate(UserUpdateSchema)], catchErrors(handleUpdateUser))
  .delete("/:id", catchErrors(handleDeleteUser));

export default router;
