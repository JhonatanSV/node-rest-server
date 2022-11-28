const { response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "There is no token in the request",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: "The user doesn't exist in DB",
      });
    }

    if (!user.state) {
      return res.status(401).json({
        msg: "The user is inactive",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Invalid token",
    });
  }
};

module.exports = { validateJWT };
