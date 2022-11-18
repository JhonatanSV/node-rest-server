const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const getUsers = (req = request, res = response) => {
  const params = req.query;

  res.json({
    msg: "GET",
    params,
  });
};

const postUser = async (req, res = response) => {
  const { name, mail, password, role } = req.body;
  const user = new User({ name, mail, password, role });

  const existsEmail = await User.findOne({ mail });
  if (existsEmail) {
    return res.status(400).json({
      msg: "The mail already exists",
    });
  }

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.json({
    user,
  });
};

const putUser = (req, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "",
    id,
  });
};

const deleteUser = (req, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "",
    id,
  });
};

module.exports = { getUsers, postUser, putUser, deleteUser };
