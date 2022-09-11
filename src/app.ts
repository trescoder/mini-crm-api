require("dotenv").config();

import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "./auth/passport-config";
import session from "express-session";

const app = express();

import { testConnection } from "./db/db";
import { appRoutes } from "./routes";
import { Constants } from "./constants";

app.set("port", process.env.PORT);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: Constants.SESSION_SECRET, // use to sign the session ID
    resave: false, // forces the session to be saved back to the session store
    saveUninitialized: false, // forces a session that is "uninitialized" to be saved to the store
    cookie: { maxAge: 60 * 60 * 1000 }, // 1hr
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", appRoutes);

app.listen(app.get("port"), async () => {
  await testConnection();
  console.log(`Server running on port ${app.get("port")}`);
});
