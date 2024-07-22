import express from "express";
const router = express.Router();
import { login, register, logOut } from "../controllers/auth/auth.js";
import { isUser } from "../middleware/utils.js";
/**
 *  @swagger
 *  tags:
 *    name: AUTH
 */

router.post("/register", register);
router.post("/login", login);
router.route("/logOut").get(isUser, logOut);

export default router;
