const { UniqueConstraintError } = require("../helpers/error-db");
const ClientModel = require("./clients.model");

async function findAll({ skip, limit, sortBy }) {
  try {
    return ClientModel.find({})
      .skip(skip ?? 0)
      .limit(limit ?? 10)
      .sort(sortBy ?? "name");
  } catch (error) {
    throw new Error(error);
  }
}

async function registerClient(client) {
  try {
    const newClient = await ClientModel.create(client);
    return { status: 201, data: { newClient, success: true } };
  } catch (error) {
    if (error.code === 11000) {
      throw new UniqueConstraintError("Email is already is in used");
    } else {
      throw new Error(error);
    }
  }
}

async function searchClient(name, { skip, limit }) {
  try {
    const clientRegex = new RegExp("^" + name);
    const clients = await ClientModel.find({
      name: { $regex: clientRegex, $options: "gi" },
    })
      .skip(skip ?? 0)
      .limit(limit ?? 10);
    return { status: 200, data: clients };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  findAll,
  registerClient,
  searchClient,
};
