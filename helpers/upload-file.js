const { v4: uuidv4 } = require("uuid");
const path = require("path");

const uploadFile = (
  files,
  allowedExtensions = ["png", "jpg", "jpeg", "gif"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const cuts = file.name.split(".");
    const extension = cuts[cuts.length - 1];

    if (!allowedExtensions.includes(extension)) {
      return reject(
        `The extension: ${extension} is not allowed. Allowed extensions : ${allowedExtensions}`
      );
    }

    const tempName = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", folder, tempName);

    file.mv(uploadPath, function (err) {
      if (err) return reject(err);

      resolve(uploadPath);
    });
  });
};

module.exports = {
  uploadFile,
};
