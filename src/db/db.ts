import mongoose from "mongoose";

export async function testConnection() {
  try {
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;
    const name = process.env.DB_NAME;
    await mongoose.connect(`mongodb://${host}:${port}/${name}`);
    console.log(`Connection with DB successful!`);
  } catch (error) {
    console.log(error);
    throw new Error("WE couldn't connect to the database");
  }
}
