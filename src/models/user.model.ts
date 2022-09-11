import { model, Schema } from "mongoose";
import { clientSchema } from "./clients.model";

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    require: true,
    unique: true,
    lowercase: true,
    minLength: 4,
    maxLength: 30,
  },
  password: { type: String, require: true },
  clients: {
    type: [clientSchema],
    default: [],
  },
});

export const UserModel = model("User", UserSchema);
