import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

// const cookieParser = require('cookie-parser')
// const bodyParser = require('body-parser')
// const fileUpload = require('express-fileupload')
// const dotenv = require('dotenv');
// const path = require("path");

// const errorMiddleware = require("./middlewares/errors");

// Setting up config file
// if (process.env.NODE_ENV !== "PRODUCTION")
//   require("dotenv").config({ path: "backend/config/config.env" });
// // dotenv.config({ path: 'backend/config/config.env' })

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(fileUpload());

// Import all routes
import productRoutes from "./src/routes/product.js";
// const auth = require("./routes/auth");
// const payment = require("./routes/payment");
// const order = require("./routes/order");

 app.use("/api/v1", productRoutes);
// app.use("/api/v1", auth);
// app.use("/api/v1", payment);
// app.use("/api/v1", order);

// if (process.env.NODE_ENV === "PRODUCTION") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
//   });
// }
let port = process.env.PORT || 8080;
// Middleware to handle errors
// app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`API ejecutandose en : ${port}`);
});
