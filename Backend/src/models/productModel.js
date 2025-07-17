import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  category: { type: String, required: false, trim: true },
  name: { type: String, required: true, trim: true },
  manufacturing_date: { type: Date, required: true },
  expiry_date:       { type: Date, required: true },
  stock: { type: Number, required: true, min: 0 },
  quantity: { type: String, required: false },
  price: { type: Number, required: true, min: 0 },
  image_url: { type: String, required: true },
}, {
  timestamps: true  // adds createdAt and updatedAt automatically
});

// Use existing model if defined, else compile a new one
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
