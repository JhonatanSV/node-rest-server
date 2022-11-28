const { Role, User, Category, Product } = require("../models");

const isValidRole = async (role = "") => {
  const existsRole = await Role.findOne({ role });
  if (!existsRole) {
    throw new Error(`The role ${role} is not registered in the DB`);
  }
};

const existsEmail = async (mail = "") => {
  const existsEmail = await User.findOne({ mail });
  if (existsEmail) {
    throw new Error(`The email ${mail} already exists`);
  }
};

const existsUserById = async (id) => {
  const existsUser = await User.findById(id);
  if (!existsUser) {
    throw new Error(`The user with id ${id} doesn't exists`);
  }
};

const existsCategoryById = async (id) => {
  const existsCategory = await Category.findById(id);
  if (!existsCategory) {
    throw new Error(`The category with id:${id} doesn't exists`);
  }
};

const existsProductById = async (id) => {
  const existsProduct = await Product.findById(id);
  if (!existsProduct) {
    throw new Error(`The product with id:${id} doesn't exists`);
  }
};

const allowedCollections = async (collection = "", collections = []) => {
  const validator = collections.includes(collection);
  if (!validator) {
    throw new Error(
      `The collection ${collection} is not allowed. Allowed collections: ${collections}`
    );
  }

  return true;
};

module.exports = {
  isValidRole,
  existsEmail,
  existsUserById,
  existsCategoryById,
  existsProductById,
  allowedCollections,
};
