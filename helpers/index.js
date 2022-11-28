const dbValidators = require("./db-validators");
const generateJWT = require("./JWT");
const googleVerify = require("./google-verify");
const upload = require("./upload-file");

module.exports = {
  ...dbValidators,
  ...generateJWT,
  ...googleVerify,
  ...upload,
};
