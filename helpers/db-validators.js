const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (role = "") => {
    const existsRole = await Role.findOne({ role });
    if (!existsRole) {
        throw new Error(`the role ${role} is not registered in the DB`)
    }
}

const existsEmail = async (mail = "") => {
    const existsEmail = await User.findOne({ mail });
    if (existsEmail) {
        throw new Error(`the email ${mail} already exists`)
    }
}

const existsUserById = async (id) => {
    const existsUser = await User.findById(id);
    if (!existsUser) {
        throw new Error(`the id ${id} doesn't exists`)
    }
}

module.exports = { isValidRole, existsEmail, existsUserById }