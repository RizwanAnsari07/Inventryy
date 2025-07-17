import express from "express";
import mongoose from "mongoose";
import Product from "../models/productModel.js";
const router = express.Router();
router.post("/allproducts", async (req, res) => {
    try {
        const data = await Product.find().populate("name");
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/addproduct', async (req, res) => {
    try {
        const {
            name,
            manufacturing_date,
            expiry_date,
            stock,
            price,
            image_url
        } = req.body;
        if (!name || !manufacturing_date || !expiry_date || !stock || !price || !image_url) {
            return res.json({ error: "All feilds are required!" });
        }
        // Create a new product document
        const newProduct = new Product({
            name,
            manufacturing_date: new Date(manufacturing_date),
            expiry_date: new Date(expiry_date),
            stock,
            price,
            image_url,
        });

        await newProduct.save();

        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            product: newProduct,
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }

    

});

router.delete('/:id', async (req, res) => {
  let id = req.params.id.trim();
  console.log('Raw id param:', JSON.stringify(req.params.id));
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    const deleted = await Product.findOneAndDelete({ _id: id });
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ success: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id/stock', async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    if (typeof stock !== 'number' || stock < 0) {
      return res.status(400).json({ message: 'Invalid stock value' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { stock },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET the latest N products
router.get('/latestproducts', async (req, res) => {
  try {
    const N = parseInt(req.query.limit) || 10; // default to 5
    const latestList = await Product
      .find()
      .sort({ createdAt: -1 })  // newest first
      .limit(N)
      .lean()
      .exec();

    if (latestList.length === 0) {
      return res.status(404).json({ success: false, message: 'No products found' });
    }
    res.json(latestList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});



export default router;