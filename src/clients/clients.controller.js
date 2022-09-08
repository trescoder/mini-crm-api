const clientService = require("./clients.service");

async function getClients(req, res) {
  const clients = await clientService.findAll();
  res.status(200).json(clients);
}

module.exports = { getClients };
