const { Router } = require("express");
const { check } = require("express-validator");
const {
  upload,
  updateImage,
  getImage,
  updateImageCloud,
} = require("../controllers/upload");
const { allowedCollections } = require("../helpers");
const { validateFields, validateEmptyFile } = require("../middlewares");

const router = Router();

router.get(
  "/:collection/:id",
  [
    check("id", "The id should be a MongoId").isMongoId(),
    check("collection").custom((c) =>
      allowedCollections(c, ["users", "products"])
    ),
    validateFields,
  ],
  getImage
);

router.post("/file", validateEmptyFile, upload);

router.put(
  "/image/:collection/:id",
  [
    validateEmptyFile,
    check("id", "The id should be a MongoId").isMongoId(),
    check("collection").custom((c) =>
      allowedCollections(c, ["users", "products"])
    ),
    validateFields,
  ],
  updateImage
);

router.put(
  "/imageCloud/:collection/:id",
  [
    validateEmptyFile,
    check("id", "The id should be a MongoId").isMongoId(),
    check("collection").custom((c) =>
      allowedCollections(c, ["users", "products"])
    ),
    validateFields,
  ],
  updateImageCloud
);

module.exports = router;
