const { Schema, model } = require("mongoose")

const RoleSchema = Schema({
    role: {
        type: String,
        required: [true, "the role is obligatory"]
    }
})

module.exports = model("Role", RoleSchema)