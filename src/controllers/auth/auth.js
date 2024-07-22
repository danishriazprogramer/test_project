import Users from "../../models/user.js";
import Joi from "joi";
import { sendToken } from "../../middleware/utils.js";

const registerVal = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

const loginVal = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

export const login = async (req, res) => {
  const { error, value } = loginVal.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } else {
    const user = await Users.findOne({
      email: value.email,
      password: value.password,
    });
   if(!user) {
     return res.status(401).json({ error: "Invalid email or password" });
    }

    return sendToken(res, user, "Login Successfully");

  }
};




export const register = async (req, res) => {
  try {
    const { error, value } = registerVal.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await Users.findOne({ email: value.email });

    if (user) {
      return res.status(400).json({ error: "Email Already Exists" });
    }

    let RegisterUser = new Users(req.body);
    await RegisterUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

//logOut API
export const logOut = async (req, res) => {
  try {
    let user = await Users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    user.accessToken = "";
    const updatedData = {
      ...user.toObject(),
    };
    Object.assign(user, updatedData);
    await user.save();
    return res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};


