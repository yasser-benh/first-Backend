import { Router } from "express";
import {
  handleCreateSession,
  handleDeleteSession,
  handleGetSessionById,
  handleGetSessionCurrentSession,
  handleGetSessions,
  handleSignUp,
  handleUpdateCurrentSession,
  handleUpdateSession,
} from "../controllers/session.controller";
import validate from "../helpers/validate";
import {
  SessionCreatedSchema,
  SessionUpdateSchema,
  SignUpSchema,
} from "../schema/session.schema";
import { catchErrors } from "../helpers/catchErrors";
import { RoleGuard } from "../guards/Role.guard";
import { SessionGetAllSchema } from "../schema/session.schema";
import { AuthGuard } from "../guards/Auth.guard";

const router = Router();

router
  .get(
    "/",
    [validate(SessionGetAllSchema), AuthGuard],
    catchErrors(handleGetSessions)
  )
  .get("/me", [AuthGuard], catchErrors(handleGetSessionCurrentSession))
  .get("/:id", [AuthGuard], catchErrors(handleGetSessionById))
  .post(
    "/login",
    [validate(SessionCreatedSchema)],
    catchErrors(handleCreateSession)
  )
  .post("/signup", [validate(SignUpSchema)], catchErrors(handleSignUp))
  .patch(
    "/me",
    [validate(SessionUpdateSchema), AuthGuard],
    catchErrors(handleUpdateCurrentSession)
  )
  .patch(
    "/:id",
    [validate(SessionUpdateSchema), AuthGuard],
    catchErrors(handleUpdateSession)
  )
  .delete("/:id", [AuthGuard], catchErrors(handleDeleteSession));

export default router;
