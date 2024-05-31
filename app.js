
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const apikeyroute = require("./routes/apikey.route");
const authRoute = require("./routes/users.route");
dotenv.config();

console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL)
.then(res => {
    console.log("App connected to Mongodb");
}).catch(res => {
    console.log("error connecting to database", res.message);
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/api/key", apikeyroute);
app.use("/auth",authRoute);
// app.use("/auth",Login);

app.listen( process.env.PORT, () => {
    console.log("app listening on :" + process.env.PORT)
});