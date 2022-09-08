const router = require("express").Router();
const clientController = require("./clients.controller");

router.get("/", clientController.getClients);
router.get("/:name", clientController.searchClients);

router.post("/", clientController.registerNewClient);

module.exports = router;
