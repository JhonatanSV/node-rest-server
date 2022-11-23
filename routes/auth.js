const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post(
  "/login",
  [
    validateJWT,
    check("mail", "The email is obligatory").isEmail(),
    check("password", "The password is obligatory").not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  "/google",
  [check("id_token", "the token is neccesary").not().isEmpty(), validateFields],
  googleSignIn
);

module.exports = router;
