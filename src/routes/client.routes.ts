import { Router } from "express";
const router = Router();
import clientController from "../controllers/clients.controller";

router.get("/", clientController.getClients);
router.post("/", clientController.registerNewClient);
router.delete("/:id", clientController.removeClient);
export const clientRoutes = router;
