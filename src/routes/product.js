import express from "express";
const router = express.Router();
import { getProduct, addProduct } from "../controllers/product/product.js";
import { isUser, productImg } from "../middleware/utils.js";
router.get("/getProduct",isUser,getProduct);
router.post("/addProduct", isUser, productImg, addProduct);
export default router;
