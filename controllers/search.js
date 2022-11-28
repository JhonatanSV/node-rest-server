const { response } = require("express");
const { User, Category, Product, Role } = require("../models");
const { ObjectId } = require("mongoose").Types;

const collectionsAllowed = ["user", "category", "product", "role"];

const searchUser = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const user = await User.findById(term);
    return res.json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(term, "i");
  const users = await User.find({
    $or: [{ name: regex }, { mail: regex }],
    $and: [{ state: true }],
  });

  res.json({
    results: users,
  });
};

const searchCategory = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const category = await Category.findById(term);
    return res.json({
      results: category ? [category] : [],
    });
  }

  const regex = new RegExp(term, "i");
  const categories = await Category.find({ name: regex }, { state: true });

  res.json({
    results: categories,
  });
};

const searchProduct = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const product = await User.findById(term).populate("category", "name");
    return res.json({
      results: product ? [product] : [],
    });
  }

  const regex = new RegExp(term, "i");
  const products = await Product.find(
    { name: regex },
    { state: true }
  ).populate("category", "name");

  res.json({
    results: products,
  });
};

const searchRole = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const role = await Role.findById(term);
    return res.json({
      results: role ? [role] : [],
    });
  }

  const regex = new RegExp(term, "i");
  const roles = await Role.find({ name: regex });

  res.json({
    results: roles,
  });
};

const search = (req, res = response) => {
  const { collection, term } = req.body;

  if (!collectionsAllowed.includes(collection)) {
    return res.status(400).json({
      msg: `The collections allowed are: ${collectionsAllowed}`,
    });
  }

  switch (collection) {
    case "user":
      searchUser(term);
      break;
    case "category":
      searchCategory(term);
      break;
    case "product":
      searchProduct(term);
      break;
    case "role":
      searchRole(term);
      break;
    default:
      res.status(500).json({
        msg: "strange exception",
      });
      break;
  }
};

module.exports = { search };
