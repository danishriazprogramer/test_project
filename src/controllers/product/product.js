import Product from "../../models/product.js";
import Joi from "joi";
const productValidation = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional(),
  price: Joi.number().precision(2).positive().required(),
  category: Joi.string().min(3).max(50).required(),
  stock: Joi.number().integer().min(0).required(),
});

export const addProduct = async (req, res) => {
  try {
    console.log(req.file.filename);
    const { error, value } = productValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const existingProduct = await Product.findOne({ name: value.name });

    if (existingProduct) {
      return res.status(400).json({ error: "Product Already Exists" });
    }
    let data = req.body;
    data.imageUrl = req.file.filename;
    const product = new Product(data);
    await product.save();
    return res.status(201).json({ message: "Product Added successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    let { page, limit } = req.query;
    limit = limit ? parseInt(limit) : 12;
    page = page ? parseInt(page) : 1;

    const products = await Product.find()
      .limit(limit)
      .skip((page - 1) * limit);
    let count = await Product.countDocuments();
    let content = {
      pages: Math.ceil(count / limit),
      total: count,
      products: products,
    };

    res.status(200).json({ content, message: "All Product" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
