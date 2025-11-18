import express from "express";
const app = express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import { connectDB } from "./src/config/database.js";
connectDB();

app.use(express.json());
app.use(cookieParser());

import productRoutes from "./src/routes/product.js";
import authRoutes from "./src/routes/auth.js";

app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`API ejecutandose en : ${port}`);
});
