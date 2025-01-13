import config from "config";
import jwt from "jsonwebtoken";

export function verifyJWT(
  token: string,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
) {
  const publicKey = config.get<string>(keyName);
  try {
    const decoded = jwt.verify(token, publicKey);
    return { decoded, expired: false, valid: true };
  } catch (error) {
    return {
      decoded: null,
      expired: error.message === "jwt expired",
      valid: false,
    };
  }
}
