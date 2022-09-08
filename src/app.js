require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const app = express();

const clientRoutes = require("./clients/client.routes");

app.set("port", process.env.PORT);

app.use(morgan("dev"));
app.use("/clients", clientRoutes);

app.listen(app.get("port"), async () => {
  await require("./db/db");
  console.log(`Server running on port ${app.get("port")}`);
});
