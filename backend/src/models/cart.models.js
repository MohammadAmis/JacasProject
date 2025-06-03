// models/Cart.js
import mongoose from 'mongoose';
import cartItemSchema from './cartItem.models.js';

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // one active cart per user
  },
  items: [cartItemSchema],
  status: {
    type: String,
    enum: ['active', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'active'
  },
  total_items: {
    type: Number,
    default: 0
  },
  grand_total: {
    type: Number,
    default: 0
  },
  last_updated: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

cartSchema.pre('save', function (next) {
  this.total_items = this.items.reduce((sum, item) => sum + item.quantity, 0);
  this.grand_total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  this.last_updated = new Date();
  next();
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
