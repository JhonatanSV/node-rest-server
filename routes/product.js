const { Router } = require("express");
const { check } = require("express-validator");
const {
  postProduct,
  getProduct,
  getProducts,
  putProduct,
  deleteProduct,
} = require("../controllers/product");
const {
  existsProductById,
  existsCategoryById,
} = require("../helpers/db-validators");
const { isAdminRole, validateFields, validateJWT } = require("../middlewares");

const router = Router();

router.get("/", getProducts);

router.get(
  "/:id",
  [
    check("id", "It's not a valid mongo Id ").isMongoId(),
    check("id", "The Product id doesn't exist").custom(existsProductById),
    validateFields,
  ],
  getProduct
);

router.post(
  "/",
  [
    validateJWT,
    check("category", "It's not a valid mongo Id ").isMongoId(),
    check("category").custom(existsCategoryById),
    check("name", "The name is obligatory").not().isEmpty(),
    validateFields,
  ],
  postProduct
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "It's not a valid mongo Id ").isMongoId(),
    check("id", "The Product id doesn't exist").custom(existsProductById),
    check("category").optional().custom(existsCategoryById),
    check("category", "It's not a valid mongo Id ").optional().isMongoId(),
    validateFields,
  ],
  putProduct
);

router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "It's not a valid mongo Id ").isMongoId(),
    check("id", "The Product id doesn't exist").custom(existsProductById),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
