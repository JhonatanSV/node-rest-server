const { Router } = require("express");
const { check } = require("express-validator");
const { uploadFile } = require("../controllers/upload");

const router = Router();

router.post("/uploadFile", [], uploadFile);

module.exports = router;
