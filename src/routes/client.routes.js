const router = require("express").Router();
const clientController = require("../controllers/clients.controller");

router.get("/", clientController.getClients);
router.get("/:name", clientController.searchClients);

router.post("/", clientController.registerNewClient);
router.delete("/:id", clientController.removeClient);

module.exports = router;
