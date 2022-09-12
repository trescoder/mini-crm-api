import { Router } from "express";
import passport from "passport";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { checkTokenExistence } from "../middlewares/isThereAToken";
import { clientRoutes } from "./client.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/user", userRoutes);
router.use(
  "/clients",
  // isLoggedIn,
  checkTokenExistence,
  passport.authenticate("jwt", { session: false }),
  clientRoutes
);

export const appRoutes = router;
