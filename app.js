import express from "express";
import cors from "cors";
import auth from "./src/routes/auth.js";
import product from "./src/routes/product.js";
import bodyparser from "body-parser";
import  fs from "fs";
export const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use("/auth", auth);
app.use("/product", product);

