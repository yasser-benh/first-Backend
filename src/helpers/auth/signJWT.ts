import jwt from "jsonwebtoken";
import config from "config";

export function signJwt(
  object: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) {
  const signingKey = config.get<string>(keyName);
  console.log("🚀 ~ signingKey:");
  const JWT = jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
  return JWT;
}
