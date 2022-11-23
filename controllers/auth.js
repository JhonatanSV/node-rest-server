const { response, json } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/JWT");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, picture, mail } = await googleVerify(id_token);

    let user = await User.findOne({ mail });
    if (!user) {
      const data = {
        name,
        mail,
        password: ":p",
        img: picture,
        role: "USER_ROLE",
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    if (!user.state) {
      return res.status(400).json({
        msg: "User inactive",
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      msg: "Okay, google SignIn",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "The token couldn't be verified",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
