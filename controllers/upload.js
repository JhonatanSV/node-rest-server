const { response } = require("express");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { uploadFile } = require("../helpers");
const { User, Product } = require("../models");

const getImage = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `The user with id ${id} doesn't exists`,
        });
      }
      break;
    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `The product with id ${id} doesn't exists`,
        });
      }
      break;
    default:
      return res.status(500).json({ msg: "Collection not covered" });
  }

  if (model.img) {
    const pathImg = path.join(__dirname, "..uploads", collection, model.img);

    if (fs.existsSync(pathImg)) {
      return res.sendFile(pathImg);
    }
  }

  const pathImg = path.join(__dirname, "../assets/no-image.jpg");

  res.sendFile(pathImg);
};

const upload = async (req, res = response) => {
  try {
    const response = await upload(req.files, ["txt", "md", "pdf"], "texts");

    res.json({
      msg: response,
    });
  } catch (error) {
    res.status(400).json({
      msg: error,
    });
  }
};

const updateImage = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `The user with id ${id} doesn't exists`,
        });
      }
      break;
    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `The product with id ${id} doesn't exists`,
        });
      }
      break;
    default:
      return res.status(500).json({ msg: "Collection not covered" });
  }

  if (model.img) {
    const pathImg = path.join(__dirname, "..uploads", collection, model.img);

    if (fs.existsSync(pathImg)) {
      fs.unlinkSync(pathImg);
    }
  }

  const name = await uploadFile(req.files, undefined, collection);
  model.img = name;

  await model.save();

  res.json(model);
};

const updateImageCloud = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `The user with id ${id} doesn't exists`,
        });
      }
      break;
    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `The product with id ${id} doesn't exists`,
        });
      }
      break;
    default:
      return res.status(500).json({ msg: "Collection not covered" });
  }

  if (model.img) {
    const cuts = model.img.split("/");
    const name = cuts[cuts.length - 1];
    const [public_id] = name.split(".");

    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  const name = secure_url;

  model.img = name;
  await model.save();

  res.json(model);
};

module.exports = {
  upload,
  updateImage,
  updateImageCloud,
  getImage,
};
