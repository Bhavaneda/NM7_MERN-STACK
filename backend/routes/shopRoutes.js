const express = require("express");
const router = express.Router();
const Shop = require("../models/Shop");
const Item = require("../models/Item");

// Fetch all shops
router.get("/", async (req, res) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (err) {
    res.status(500).json({ message: "Error fetching shops" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Fetch items related to this shop
    const items = await Item.find({ shop: req.params.id });

    return res.json({ shop: shop, items: items });  // Ensure shop and items are correctly included
  } catch (err) {
    res.status(500).json({ message: "Error fetching shop details" });
  }
});


module.exports = router;
