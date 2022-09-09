const { UniqueConstraintError } = require("../helpers/error-db");
const ClientModel = require("./clients.model");
const QR_SKIP = +process.env.QR_SKIP;
const QR_LIMIT = +process.env.QR_LIMIT;

async function findAll({ skip, limit, sortBy }) {
  try {
    return ClientModel.find({})
      .skip(skip ?? QR_SKIP)
      .limit(limit ?? QR_LIMIT)
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
      .skip(skip ?? QR_SKIP)
      .limit(limit ?? QR_LIMIT);
    return { status: 200, data: clients };
  } catch (error) {
    throw new Error(error);
  }
}

async function removeClientById(id) {
  try {
    return ClientModel.findOneAndRemove({ _id: id });
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  findAll,
  registerClient,
  searchClient,
  removeClientById,
};
