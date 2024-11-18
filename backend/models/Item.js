const mongoose = require('mongoose');

// Item schema definition
const itemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  shop: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Shop',  // Reference to the Shop model
    required: true 
  }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt fields
});

// Create Item model using the schema
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
