const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

let carts = {}; // Simple in-memory store for carts keyed by userId

// Get user cart
router.get('/', auth, (req, res) => {
  const cart = carts[req.user.id] || [];
  res.json(cart);
});

// Add item to cart
router.post('/add', auth, (req, res) => {
  const { productId, quantity } = req.body;
  if (!carts[req.user.id]) carts[req.user.id] = [];
  const cart = carts[req.user.id];
  const index = cart.findIndex(item => item.productId === productId);
  if (index > -1) {
    cart[index].quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  res.json(cart);
});

// Remove item
router.post('/remove', auth, (req, res) => {
  const { productId } = req.body;
  if (!carts[req.user.id]) return res.json([]);
  carts[req.user.id] = carts[req.user.id].filter(item => item.productId !== productId);
  res.json(carts[req.user.id]);
});

module.exports = router;
