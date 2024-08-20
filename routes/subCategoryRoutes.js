// routes/subCategoryRoutes.js
const express = require('express');
const SubCategory = require('../models/SubCategory');

const router = express.Router();

// Create SubCategory
router.post('/:categoryId/subcategories', async (req, res) => {
  try {
    const subCategory = new SubCategory({ ...req.body, category: req.params.categoryId });
    await subCategory.save();
    res.status(201).json(subCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all subcategories
router.get('/', async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    res.status(200).json(subCategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get subcategory by ID
router.get('/:id', async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);
    if (!subCategory) {
      return res.status(404).json({ error: 'SubCategory not found' });
    }
    res.status(200).json(subCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:categoryId/subcategories', async (req, res) => {
  try {
    const { categoryId } = req.params;
    
    // Find all subcategories under the given category
    const subCategories = await SubCategory.find({ category: categoryId });

    if (subCategories.length === 0) {
      return res.status(404).json({ message: 'No subcategories found for this category' });
    }

    res.status(200).json(subCategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Edit subcategory
router.put('/:id', async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subCategory) {
      return res.status(404).json({ error: 'SubCategory not found' });
    }
    res.status(200).json(subCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
