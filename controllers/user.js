const { response, request } = require("express");

const getUsers = (req = request, res = response) => {
  const params = req.query;

  res.json({
    msg: "GET",
    params,
  });
};

const postUser = (req, res = response) => {
  const body = req.body;

  res.json({
    msg: "",
    body,
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
