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

const router = Router();

router
  .get(
    "/",
    [validate(SessionGetAllSchema), RoleGuard("sessions", "get")],
    catchErrors(handleGetSessions)
  )
  .get("/me", catchErrors(handleGetSessionCurrentSession))
  .get(
    "/:id",
    [RoleGuard("sessions", "get")],
    catchErrors(handleGetSessionById)
  )
  .post(
    "/login",
    [validate(SessionCreatedSchema), RoleGuard("sessions", "create")],
    catchErrors(handleCreateSession)
  )
  .post("/signup", [validate(SignUpSchema)], catchErrors(handleSignUp))
  .patch(
    "/me",
    [validate(SessionUpdateSchema)],
    catchErrors(handleUpdateCurrentSession)
  )
  .patch(
    "/:id",
    [validate(SessionUpdateSchema), RoleGuard("sessions", "update")],
    catchErrors(handleUpdateSession)
  )
  .delete(
    "/:id",
    [RoleGuard("sessions", "delete")],
    catchErrors(handleDeleteSession)
  );

export default router;
