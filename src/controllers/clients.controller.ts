import { Request, Response } from "express";
import { NewClient } from "../interfaces/new-client";
import { userService } from "../services/user.service";

const clientService = require("../services/clients.service");

async function getClients(req: any, res: Response) {
  const { skip, limit } = req.query;
  const { username } = req.user;
  // const clients = await clientService.findAll(skip, limit);
  const clients = await userService.getClients(username);
  res.status(200).json(clients);
}

async function registerNewClient(req: any, res: Response) {
  const clientInfo: NewClient = req.body;
  const { username } = req.user;
  // const { status, data?, msg? } = await clientService.registerClient(clientInfo);
  const { status, data, msg, success } = await userService.registerNewClient(
    username,
    clientInfo
  );
  return res.status(status).json({ data, msg, success });
}

async function removeClient(req: any, res: Response) {
  const { id } = req.params;
  const { username } = req.user;
  const { status, msg, success } = await userService.removeClient(username, id);
  return res.status(status).json({ msg, success });
}

export default { getClients, registerNewClient, removeClient };
