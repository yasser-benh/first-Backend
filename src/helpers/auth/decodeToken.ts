import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { STATUS_CODES } from "../../constants/STATUS_CODES";
import { verifyJWT } from "./verifyJwt";
import { CustomRequest } from "../../app";
import { reissueAccessToken } from "./reissueAccessToken";
import { SessionModel } from "../../model/session.model";
import { UserModel } from "../../model/user.model";

export async function decodeToken(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken = get(req, "headers.x-refresh");

  if (!accessToken) {
    req.user = null;
    return next();
  }

  const { decoded, expired } = verifyJWT(accessToken, "accessTokenPublicKey");

  if (decoded) {
    const { session_id, id } = decoded as any;

    const [session, user] = await Promise.all([
      SessionModel.findById(session_id),
      UserModel.findById(id),
    ]);

    if (!session || !user || !session.valid) {
      req.user = null;
      next();
    }

    req.user = decoded as any;
    return next();
  }

  if (expired && refreshToken) {
    const { token, decoded } = await reissueAccessToken(String(refreshToken));

    if (!token) {
      req.user = null;
      return next();
    }

    if (decoded) {
      req.user = decoded as any;
      return next();
    }
  }

  return next();
}
