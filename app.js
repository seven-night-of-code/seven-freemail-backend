const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const apikeyroute = require("./routes/apikey.route");
const authRoute = require("./routes/auth.route");
(bodyParser = require("body-parser")),
(swaggerJsdoc = require("swagger-jsdoc")),
(swaggerUi = require("swagger-ui-express"));
dotenv.config();

console.log(process.env.MONGO_URL);
mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => {
    console.log("App connected to Mongodb");
  })
  .catch((res) => {
    console.log("error connecting to database", res.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/key", apikeyroute);
app.use("/auth", authRoute);
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Seven freemail",
      version: "1.0.0",
      description:
        "this is seven freemail",
      license: {
        name: "Open source software",
        url: "",
      },
      contact: {
        name: "Seven Night Of Code",
        url: "",
        email: "seven-night-of-code@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.listen(process.env.PORT, () => {
  console.log("app listening on :" + process.env.PORT);
});
