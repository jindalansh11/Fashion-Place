const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });
    const exists = await Newsletter.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Already subscribed' });
    const subscription = new Newsletter({ email });
    await subscription.save();
    res.json({ message: 'Subscribed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
