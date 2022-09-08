const clientModel = require("./clients.model");

async function findAll() {
  return clientModel.find({});
}

module.exports = {
  findAll,
};
