import passport from "passport";
import { Strategy } from "passport-local";
import { JwtUser } from "../../interfaces/jwt-user";
import { User } from "../../interfaces/user";
import { userService } from "../../services/user.service";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(
  (user: { username: string; password: string }, done) => {
    done(null, user);
  }
);

export const LocalStrategy = new Strategy(async function verify(
  username,
  password,
  cb
) {
  const user: User | null = await userService.getUser(username);

  if (!user) {
    return cb(null, false, { message: "Incorrect username or password" });
  }

  return cb(null, { username: user.username, password: user.password });
});
