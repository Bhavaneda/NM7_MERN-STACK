const express = require('express');
const Item = require('../models/Item');
const Shop = require('../models/Shop');  // Include the Shop model if needed for validation or population
const router = express.Router();

// Create a new item
router.post('/', async (req, res) => {
  try {
    const { name, price, description, image, shop } = req.body;
    
    // Ensure that the shop ID is valid before creating the item
    const foundShop = await Shop.findById(shop);
    if (!foundShop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    
    // Create the new item
    const newItem = new Item({ name, price, description, image, shop });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating item' });
  }
});

// Get all items for a specific shop (populating the shop data)
router.get('/:shopId', async (req, res) => {
  try {
    const items = await Item.find({ shop: req.params.shopId }).populate('shop');  // Populate the 'shop' field with shop details
    res.json(items);  // Return the items associated with the shop
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching items for this shop' });
  }
});

// Get all items (without filtering by shop, if needed)
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().populate('shop');  // Populate the 'shop' field with shop details
    res.json(items);  // Return all items
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching items' });
  }
});

module.exports = router;
