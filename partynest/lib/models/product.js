import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: String,
    stock: { type: Number, default: 1 },
  },
  {timestamps: true}
);

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
