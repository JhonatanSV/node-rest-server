const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/JWT");

const login = async (req, res = response) => {
  const { mail, password } = req.body;

  try {
    const user = await User.findOne({ mail });
    if (!user) {
      return res.status(400).json({
        msg: "User-Password incorrect",
      });
    }

    if (!user.state) {
      return res.status(400).json({
        msg: "User inactive",
      });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "User-Password incorrect",
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk with administrator",
    });
  }
};

module.exports = {
  login,
};
