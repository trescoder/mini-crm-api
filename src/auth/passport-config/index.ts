import passport from "passport";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";

passport.use(JwtStrategy);
passport.use(LocalStrategy);

export default passport;
