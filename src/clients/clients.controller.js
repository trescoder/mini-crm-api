const { extractClientInfo } = require("../helpers/extract-client-info");
const clientService = require("./clients.service");

async function getClients(req, res) {
  const clients = await clientService.findAll();
  res.status(200).json(clients);
}

async function registerNewClient(req, res) {
  const clientInfo = extractClientInfo(req);
  // const client = validateClientInfo(clientInfo);
  const { status, data } = await clientService.registerClient(clientInfo);
  return res.status(status).json(data);
}

module.exports = { getClients, registerNewClient };
