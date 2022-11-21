const { response, request, query } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const condition = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(condition),
    User.find(condition).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

const postUser = async (req, res = response) => {
  const { name, mail, password, role } = req.body;
  const user = new User({ name, mail, password, role });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.json({
    user,
  });
};

const putUser = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, mail, ...data } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    data.password = bcryptjs.hashSync(password, salt);
  }

  const userDB = await User.findByIdAndUpdate(id, data, { new: true });

  res.json({
    userDB,
  });
};

const deleteUser = async (req, res = response) => {
  const id = req.params.id;

  const user = await User.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json({
    user,
  });
};

module.exports = { getUsers, postUser, putUser, deleteUser };
