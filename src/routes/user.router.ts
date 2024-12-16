import { Router } from "express";
import {
  handleCreateUser,
  handleDeleteUser,
  handleGetUsers,
  handleGetUsersById,
  handleUpdateUser,
} from "../controllers/user.controller";
import validate from "../helpers/validate";
import {
  UserCreatedSchema,
  userGetAllSchema,
  UserUpdateSchema,
} from "../schema/user.schema";

const router = Router();

router
  .get("/", [validate(userGetAllSchema)], handleGetUsers)
  .get("/:id", handleGetUsersById)
  .post("/", [validate(UserCreatedSchema)], handleCreateUser)
  .patch("/:id", [validate(UserUpdateSchema)], handleUpdateUser)
  .delete("/:id", handleDeleteUser);

export default router;
