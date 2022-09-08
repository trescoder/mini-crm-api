require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const app = express();

app.set("port", process.env.PORT);

app.listen(app.get("port"), () => {
  console.log(`Server running on port ${app.get("port")}`);
});
