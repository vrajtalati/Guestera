
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
  name: { type: String, required: true },
  image: String,
  description: String,
  taxApplicable: { type: Boolean, default: false },
  tax: Number,
  baseAmount: { type: Number, required: true },
  discount: Number,
  totalAmount: { type: Number, required: true }
});

// Create a text index on the name field which would help in suggesting in search api
ItemSchema.index({ name: 'text' });

module.exports = mongoose.model('Item', ItemSchema);