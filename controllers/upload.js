const { response, json } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/JWT");
const { googleVerify } = require("../helpers/google-verify");

const uploadFile = async (req, res = response) => {};

module.exports = {
  uploadFile,
};
