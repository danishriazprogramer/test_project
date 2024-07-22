import multer, { diskStorage } from "multer";
import { config } from "dotenv";
import randomstring from "randomstring";
import  Users  from "../models/user.js";
import path from "path";
import jwt from "jsonwebtoken";
export const sendToken = async (res, user, message) => {
  try {
    const token = user.getAuthToken();
    let users = await Users.findById(user._id);
    users.accessToken = token;
    await users.save();
    const content = {
      accessToken: token,
      customer: {
        firstName: users?.firstName,
        lastName: users?.lastName,
        id: users?.id,
      },
    };

    return res
      .status(200)
      .json({ success: true, title: "Success", message, content });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const isUser = async (req, res, next) => {
  try {
    let token = req?.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(203).json({ message: "You Must Be Logged In" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await Users.findById(decoded._id);
    if (req.user.accessToken != token) {
      return res.status(203).json({ message: "You Must Be Logged In" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const fileType = (file, cb) => {
  let allow = /jpeg|jpg|png|gif|mp4|mov|svg|mkv/;
  const isMatch = allow.test(path.extname(file.originalname).toLowerCase());
  const isMIME = allow.test(file.mimetype);

  if (isMIME && isMatch) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const productImg = multer({
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/products");
    },
    filename: (req, file, cb) => {
      let p1 = randomstring.generate(6);
      let p2 = randomstring.generate(6);
      let ext = path.extname(file.originalname).toLowerCase();

      cb(null, file.fieldname + "_" + p1 + p2 + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    fileType(file, cb);
  },
}).single("image");
