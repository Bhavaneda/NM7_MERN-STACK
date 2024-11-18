const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }], // Optional for future relationships
});

module.exports = mongoose.model("Shop", shopSchema);
