// models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number
    }
  ],
  totalAmount: Number,
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'paid', 'shipped', 'delivered']
  },
  paymentIntentId: String // if using Stripe
}, { timestamps: true });

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
