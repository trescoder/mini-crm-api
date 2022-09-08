const mongoose = require("mongoose");

async function testConnection() {
  try {
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;
    const name = process.env.DB_NAME;
    await mongoose.connect(`mongodb://${host}:${port}/${name}`);
    console.log(`Connection with DB successful!`);
  } catch (error) {
    throw new Error(error);
  }
}

testConnection();
