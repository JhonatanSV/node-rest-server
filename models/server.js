const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
const fileUpload = require("express-fileupload");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      users: "/api/users",
      categories: "/api/categories",
      products: "/api/products",
      search: "/api/search",
      upload: "/api/upload",
    };

    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static("public"));

    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.users, require("../routes/user"));
    this.app.use(this.paths.categories, require("../routes/category"));
    this.app.use(this.paths.products, require("../routes/product"));
    this.app.use(this.paths.search, require("../routes/search"));
    this.app.use(this.paths.upload, require("../routes/upload"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running in port: ", this.port);
    });
  }
}

module.exports = Server;
