const { Router } = require("express");
const { check, param, query } = require("express-validator");

const {
  getUsers,
  putUser,
  postUser,
  deleteUser,
} = require("../controllers/user");
const {
  isValidRole,
  existsEmail,
  existsUserById,
} = require("../helpers/db-validators");
const {
  validateFields,
  validateJWT,
  hasRole,
  isAdminRole,
} = require("../middlewares");

const router = Router();

router.get(
  "/",
  [
    query("limit", "Send a valid limit value").isNumeric().optional(),
    query("from", "Send a valid from value").isNumeric().optional(),
    validateFields,
  ],
  getUsers
);
router.post(
  "/",
  [
    check("mail", "The mail is not valid").isEmail(),
    check("mail").custom(existsEmail),
    check("name", "The name is obligatory").not().isEmpty(),
    check(
      "password",
      "The password must be greater than 6 characters"
    ).isLength({ min: 6 }),
    check("role").custom(isValidRole),
    validateFields,
  ],
  postUser
);
router.put(
  "/:id",
  [
    check("id", "It's not a valid id").isMongoId(),
    check("id").custom(existsUserById),
    check("role").custom(isValidRole),
    validateFields,
  ],
  putUser
);
router.delete(
  "/:id",
  [
    validateJWT,
    hasRole("ADMIN_ROLE", "SALES_ROLE"),
    check("id", "It's not a valid id").isMongoId(),
    check("id").custom(existsUserById),
    validateFields,
  ],
  deleteUser
);

module.exports = router;
