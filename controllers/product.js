const { response, request } = require("express");

const { Product } = require("../models");

const getProducts = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const condition = { state: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(condition),
    Product.find(condition)
      .populate("user", "name")
      .populate("category", "name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    products,
  });
};

const getProduct = async (req = request, res = response) => {
  const id = req.params.id;
  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");

  res.json({
    product,
  });
};

const postProduct = async (req, res = response) => {
  const { state, user, ...body } = req.body;

  const ProductDB = await Product.findOne({ name: body.name });
  if (ProductDB) {
    res.status(400).json({
      msg: `The product ${body.name} already exists`,
    });
  }

  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.user._id,
  };

  const product = new Product(data);

  await product.save();

  res.status(201).json({
    product,
  });
};

const putProduct = async (req, res = response) => {
  const id = req.params.id;
  const { state, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.json({
    product,
  });
};

const deleteProduct = async (req, res = response) => {
  const id = req.params.id;

  const Product = await Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json({
    Product,
  });
};

module.exports = {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
};
