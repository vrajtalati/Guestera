
const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  name: { type: String, required: true },
  image: String,
  description: String,
  taxApplicable: { type: Boolean, default: null },
  tax: { type: Number, default: null }
});

// Pre-save hook to inherit tax fields from the associated category
SubCategorySchema.pre('save', async function(next) {
  if (this.isModified('category')) { // Only fetch the category if it was modified
    const Category = mongoose.model('Category');
    const category = await Category.findById(this.category);

    if (category) {
      // Inherit tax fields from category
      this.taxApplicable = category.taxApplicable;
      this.tax = category.tax;
    }
  }
  next();
});

module.exports = mongoose.model('SubCategory', SubCategorySchema);
