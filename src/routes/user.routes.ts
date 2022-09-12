import { Router } from "express";
import passport from "passport";
import { userController } from "../controllers/user.controller";
const router = Router();

router.post("/login", passport.authenticate("local"), userController.login);
router.post("/sign-up", userController.addUser);
router.post("/logout", userController.logout);

export const userRoutes = router;
