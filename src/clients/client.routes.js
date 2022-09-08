const router = require("express").Router();
const clientController = require("./clients.controller");

router.get("/", clientController.getClients);

module.exports = router;
