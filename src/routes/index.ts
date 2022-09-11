import { Router } from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { checkTokenExistence } from "../middlewares/isThereAToken";
import { clientRoutes } from "./client.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/user", userRoutes);
router.use("/clients", isLoggedIn, checkTokenExistence, clientRoutes);

export const appRoutes = router;
