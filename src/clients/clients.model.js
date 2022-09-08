const { model, Schema } = require("mongoose");

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
    type: Number,
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

module.exports = model("Client", clientSchema);
