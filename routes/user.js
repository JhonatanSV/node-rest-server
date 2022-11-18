const { Router } = require("express");
const { check } = require("express-validator");

const {
  getUsers,
  putUser,
  postUser,
  deleteUser,
} = require("../controllers/user");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.get("/", getUsers);
router.post(
  "/",
  [
    check("mail", "The mail is not valid").isEmail(),
    check("name", "The name is obligatory").not().isEmpty(),
    check(
      "password",
      "The password must be greater than 6 characters"
    ).isLength({ min: 6 }),
    check("role", "the role is not valid").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validateFields,
  ],
  postUser
);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);

module.exports = router;
