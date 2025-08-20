const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: { type: String, required: true }, // 'men', 'women', 'accessories'
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
