// models/CartItem.js
import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  product_name: {
    type: String,
    required: true
  },
  product_image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }
}, {
  _id: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

cartItemSchema.virtual('total').get(function () {
  return this.price * this.quantity;
});

export default cartItemSchema;
