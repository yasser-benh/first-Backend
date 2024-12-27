import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { STATUS_CODES } from "../../constants/STATUS_CODES";
import { verifyJWT } from "./verifyJwt";
import { CustomRequest } from "../../app";
import { reissueAccessToken } from "./reissueAccessToken";

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
