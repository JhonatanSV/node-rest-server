const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "The name is obligatory"],
  },
  mail: {
    type: String,
    required: [true, "The mail is obligatory"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "The password is obligatory"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    emun: ["ADMIN_ROLE", "USER_ROLE"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("User", UserSchema);
