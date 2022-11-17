const { Router } = require("express");
const {
  getUsers,
  putUser,
  postUser,
  deleteUser,
} = require("../controllers/user");

const router = Router();

router.get("/", getUsers);
router.post("/", postUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);

module.exports = router;
