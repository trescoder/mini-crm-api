const { UniqueConstraintError } = require("../helpers/error-db");
const ClientModel = require("./clients.model");

async function findAll() {
  try {
    return ClientModel.find({});
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
      throw new UniqueConstraintError("Email is already");
    }
    throw new Error(error);
  }
}

module.exports = {
  findAll,
  registerClient,
};
