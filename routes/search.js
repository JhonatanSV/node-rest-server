const { Router } = require("express");
const { check } = require("express-validator");
const { search } = require("../controllers/search");
const { validateFields } = require("../middlewares");

const router = Router();

router.get(
  "/:collection/term",
  [
    check("collection", "The collection is obligatory").not().isEmpty(),
    check("term", "The term is obligatory").not().isEmpty(),
    validateFields,
  ],
  search
);

module.exports = router;
