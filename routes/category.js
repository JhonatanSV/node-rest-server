const { Router } = require("express");
const { check } = require("express-validator");
const {
  postCategory,
  getCategory,
  getCategories,
  putCategory,
  deleteCategory,
} = require("../controllers/category");
const { existsCategoryById } = require("../helpers/db-validators");
const { isAdminRole, validateFields, validateJWT } = require("../middlewares");

const router = Router();

router.get("/", getCategories);

router.get(
  "/:id",
  [
    check("id", "It's not a valid mongo Id ").isMongoId(),
    check("id", "The category id doesn't exist").custom(existsCategoryById),
    validateFields,
  ],
  getCategory
);

router.post(
  "/",
  [
    validateJWT,
    check("name", "The name is obligatory").not().isEmpty(),
    validateFields,
  ],
  postCategory
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "It's not a valid mongo Id ").isMongoId(),
    check("id", "The category id doesn't exist").custom(existsCategoryById),
    validateFields,
  ],
  putCategory
);

router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "It's not a valid mongo Id ").isMongoId(),
    check("id", "The category id doesn't exist").custom(existsCategoryById),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;
