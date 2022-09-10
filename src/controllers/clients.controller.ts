import { Request, Response } from "express";
import { NewClient } from "../interfaces/new-client";

const { extractClientInfo } = require("../helpers/extract-client-info");
const clientService = require("../services/clients.service");

async function getClients(req: Request, res: Response) {
  const { skip, limit } = req.query;
  const clients = await clientService.findAll(skip, limit);
  res.status(200).json(clients);
}

async function registerNewClient(req: Request, res: Response) {
  const clientInfo: NewClient = req.body;
  const { status, data } = await clientService.registerClient(clientInfo);
  return res.status(status).json(data);
}

async function searchClients(req: Request, res: Response) {
  const { name } = req.params;
  const { skip, limit } = req.query;
  const { status, data } = await clientService.searchClient(name, skip, limit);
  return res.status(status).json(data);
}

async function removeClient(req: Request, res: Response) {
  const { id } = req.params;
  await clientService.removeClientById(id);
  return res
    .status(200)
    .json({ msg: "Client removed successfully", success: true });
}

module.exports = { getClients, registerNewClient, searchClients, removeClient };
