require("dotenv").config();

import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

import clientRoutes from "./routes/client.routes";
import { testConnection } from "./db/db";

app.set("port", process.env.PORT);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/clients", clientRoutes);

app.listen(app.get("port"), async () => {
  await testConnection();
  console.log(`Server running on port ${app.get("port")}`);
});
