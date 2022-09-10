import { NewClient } from "../interfaces/new-client";
import { ClientModel } from "../models/clients.model";

// const { UniqueConstraintError } = require("../helpers/error-db");

const QR_SKIP = +process.env.QR_SKIP!;
const QR_LIMIT = +process.env.QR_LIMIT!;

export async function findAll(skip: number, limit: number, sortBy: string) {
  try {
    return ClientModel.find({})
      .skip(skip ?? QR_SKIP)
      .limit(limit ?? QR_LIMIT)
      .sort(sortBy ?? "name");
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong when retrieving all clients");
  }
}

export async function registerClient(client: NewClient) {
  try {
    const newClient = await ClientModel.create(client);
    return { status: 201, data: { newClient, success: true } };
  } catch (error: any) {
    // this error code means constrain violation, if a property must be unique and you try to save it (the same client)
    // twice this error will be raise
    if (error.code === 11000) {
      return {
        status: 400,
        data: { message: "This email is already taken", success: false },
      };
    } else {
      throw new Error(error);
    }
  }
}

export async function searchClient(name: string, skip: number, limit: number) {
  try {
    const clientRegex = new RegExp("^" + name);
    const clients = await ClientModel.find({
      name: { $regex: clientRegex, $options: "gi" },
    })
      .skip(skip ?? QR_SKIP)
      .limit(limit ?? QR_LIMIT);
    return { status: 200, data: clients };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong when searching clients");
  }
}

export async function removeClientById(id: string) {
  try {
    await ClientModel.findOneAndRemove({ _id: id });
    return { msg: "Client remove successfully", success: true };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong when removing a client");
  }
}
