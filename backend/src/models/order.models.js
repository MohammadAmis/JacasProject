// models/Order.js
import mongoose from 'mongoose';
import cartItemSchema from './cartItem.models.js';

const orderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
    unique: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [cartItemSchema],
  total_items: {
    type: Number,
    default: 0
  },
  grand_total: {
    type: Number,
    default: 0
  },
  address: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  payment_method: {
    type: String,
    enum: ['COD', 'UPI', 'Credit Card', 'Debit Card', 'Net Banking','Other'],
    default: 'COD',
    required: true
  },
  order_date: {
    type: Date,
    default: Date.now
  },
  shipping_date: {
    type: Date
  }
}, { timestamps: true });

orderSchema.pre('save', function (next) {
  this.total_items = this.items.reduce((sum, item) => sum + item.quantity, 0);
  this.grand_total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  next();
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
