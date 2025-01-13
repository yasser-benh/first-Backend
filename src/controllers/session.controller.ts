import { Request, Response } from "express";
import { SignupSession, SortSessionsBy } from "../model/session.model";
import {
  createSession,
  deleteSession,
  getAllSessions,
  getSessionById,
  updateSession,
} from "../services/session.service";
import { STATUS_CODES } from "../constants/STATUS_CODES";
import { CustomRequest } from "../app";
import { createUser, validatePassword } from "../services/user.service";
import { signJwt } from "../helpers/auth/signJWT";
import config from "config";

async function handleGetSessions(req: Request, res: Response): Promise<void> {
  const page = parseInt((req.query.page as string | undefined) ?? "1");
  const limit = parseInt((req.query.limit as string | undefined) ?? "10");
  const sort = req.query.sort as "asc" | "desc";
  const sort_by = req.query.sort_by as SortSessionsBy;
  const sessions = await getAllSessions({ page, limit, sort, sort_by });
  res.json(sessions);
}

async function handleGetSessionById(req: Request, res: Response) {
  const id = req.params.id;
  const session = await getSessionById(id);
  res.json(session);
}

async function handleGetSessionCurrentSession(
  req: CustomRequest,
  res: Response
) {
  const { session_id } = req.user;
  const session = await getSessionById(session_id);
  res.json(session);
}

async function handleCreateSession(req: CustomRequest, res: Response) {
  const { user, valid } = await validatePassword({
    email: req.body.email,
    password: req.body.password,
  });
  if (!valid) {
    res
      .status(STATUS_CODES.NOT_FOUND)
      .json({ message: "Invalid email or password" });
    return;
  }

  const new_Session = await createSession({
    user_id: user._id,
    valid: true,
    user_agent: req.headers["user-agent"],
  });
  console.log({
    id: user._id,
    session_id: new_Session._id,
    role: user.role,
  });
  const token = signJwt(
    {
      id: user._id,
      session_id: new_Session._id,
      role: user.role,
    },
    "accessTokenPrivateKey",
    {
      expiresIn: config.get("accessTokenTtl"),
    }
  );

  const refreshToken = signJwt(
    {
      id: user._id,
      session_id: new_Session._id,
      role: user.role,
    },
    "refreshTokenPrivateKey",
    {
      expiresIn: config.get("refreshTokenTtl"),
    }
  );

  res.json({ token, refreshToken });
}

async function handleSignUp(req: CustomRequest, res: Response) {
  const new_Session_payload: SignupSession = req.body;

  const new_user = await createUser({
    name: new_Session_payload.name,
    email: new_Session_payload.email,
    password: new_Session_payload.password,
  });
  console.log("🚀 ~ handleSignUp ~ new_user:", new_user);

  const new_Session = await createSession({
    user_id: new_user._id,
    valid: true,
    user_agent: req.headers["user-agent"],
  });
  console.log("🚀 ~ handleSignUp ~ new_Session:", new_Session);

  if (new_Session === null) {
    res.status(STATUS_CODES.NOT_FOUND).json({ message: "Invalid payload" });
    return;
  }

  const token = signJwt(
    {
      id: new_user._id,
      session_id: new_Session._id,
      role: new_user.role,
    },
    "accessTokenPrivateKey",
    {
      expiresIn: config.get("accessTokenTtl"),
    }
  );

  const refreshToken = signJwt(
    {
      id: new_user._id,
      session_id: new_Session._id,
      role: new_user.role,
    },
    "refreshTokenPrivateKey",
    {
      expiresIn: config.get("refreshTokenTtl"),
    }
  );

  res.status(STATUS_CODES.CREATED).json({ token, refreshToken });
}

async function handleUpdateSession(req: Request, res: Response) {
  const id = req.params.id;
  const updated_Session_payload = req.body;
  const updated_Session = await updateSession(id, updated_Session_payload);
  if (updated_Session === null) {
    res.status(STATUS_CODES.NOT_FOUND).json({ message: "Session not found" });
    return;
  }
  res.json(updated_Session);
}

async function handleUpdateCurrentSession(req: CustomRequest, res: Response) {
  const { session_id } = req.user;
  const updated_Session_payload = req.body;
  const updated_Session = await updateSession(
    session_id,
    updated_Session_payload
  );
  if (updated_Session === null) {
    res.status(STATUS_CODES.NOT_FOUND).json({ message: "Session not found" });
    return;
  }
  res.json(updated_Session);
}

async function handleDeleteSession(req: Request, res: Response) {
  const id = req.params.id;
  const deleted_Session = await deleteSession(id);
  res.json(deleted_Session);
}

export {
  handleUpdateSession,
  handleGetSessionById,
  handleCreateSession,
  handleDeleteSession,
  handleGetSessions,
  handleGetSessionCurrentSession,
  handleSignUp,
  handleUpdateCurrentSession,
};
