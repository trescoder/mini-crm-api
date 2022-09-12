import { Strategy, ExtractJwt } from "passport-jwt";
import { Constants } from "../../constants";
import { userService } from "../../services/user.service";

const jwtOptions: any = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = Constants.JWT_SECRET;

export const JwtStrategy = new Strategy(jwtOptions, async function (
  jwt_payload,
  done
) {
  const user = await userService.getUser(jwt_payload.sub);

  if (!user) {
    return done(null, false);
  }
  return done(null, user);
});
