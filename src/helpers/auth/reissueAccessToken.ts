import { find, get } from "lodash";
import { getSessionById } from "../../services/session.service";
import { verifyJWT } from "./verifyJwt";
import { getUserById } from "../../services/user.service";
import { signJwt } from "./signJWT";
import config from "config";

export async function reissueAccessToken(refreshToken: string) {
  const { decoded, expired } = verifyJWT(
    String(refreshToken),
    "refreshTokenPublicKey"
  );

  if (!decoded || expired) {
    return {
      token: null,
      decoded: null,
    };
  }

  const session = await getSessionById(get(decoded, "session_id"));

  if (!session || !session.valid) {
    return {
      token: null,
      decoded: null,
    };
  }

  const user = await getUserById(get(decoded, "id"));

  if (!user) {
    return {
      token: null,
      decoded: null,
    };
  }

  const newAccessToken = signJwt(
    {
      id: user._id,
      session_id: session._id,
      role: user.role,
    },
    "accessTokenPrivateKey",
    {
      expiresIn: config.get("accessTokenTtl"),
    }
  );

  return {
    token: newAccessToken,
    decoded,
  };
}
