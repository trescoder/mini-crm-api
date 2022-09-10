import { model, Schema } from "mongoose";

const clientSchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true,
  },
  last_name: {
    type: String,
    trim: true,

    require: true,
  },
  email: {
    type: String,
    trim: true,
    require: true,
    unique: true,
  },
  tel: {
    type: String,
    require: true,
  },
  birthday: {
    type: Date,
    require: true,
  },
  address: {
    type: String,
    trim: true,
    require: true,
  },
  contact_type: {
    type: String,
    default: "Cliente",
    trim: true,
    require: true,
  },
  origin: {
    type: String,
    default: "Landing Page",
    trim: true,
    require: true,
  },
});
clientSchema.index({ name: "text" });

export const ClientModel = model("Client", clientSchema);
