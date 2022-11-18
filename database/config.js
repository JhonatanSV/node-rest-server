const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error trying to connect to the DB ");
  }
};

module.exports = { dbConnection };
