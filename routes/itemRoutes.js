// routes/itemRoutes.js
const express = require('express');
const Item = require('../models/Item');

const router = express.Router();

// Create Item under category
router.post('/:categoryId/items', async (req, res) => {
  try {
    const item = new Item({ ...req.body, category: req.params.categoryId });
    item.totalAmount = item.baseAmount - (item.discount || 0);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Create item under subcategory
router.post('/:subCategoryId/items', async (req, res) => {
  try {
    const item = new Item({
      ...req.body,
      subCategory: req.params.subCategoryId  // Ensure the field name matches the schema
    });

    // Calculate total amount
    item.totalAmount = item.baseAmount - (item.discount || 0);

    // Save the item to the database
    await item.save();

    // Respond with the created item
    res.status(201).json(item);
  } catch (err) {
    // Respond with an error if something goes wrong
    res.status(400).json({ error: err.message });
  }
});
// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all items under a specific category
router.get('/:categoryId/items', async (req, res) => {
  try {
    const { categoryId } = req.params;
    
    // Find all items under the given category
    const items = await Item.find({ category: categoryId });

    if (items.length === 0) {
      return res.status(404).json({ message: 'No items found for this category' });
    }

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all items under a specific subcategory
router.get('/:subCategoryId/items', async (req, res) => {
  try {
    const { subCategoryId } = req.params;
    
    // Find all items under the given subcategory
    const items = await Item.find({ subCategory: subCategoryId });

    if (items.length === 0) {
      return res.status(404).json({ message: 'No items found for this subcategory' });
    }

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Search items by name with suggestions
router.get('/search', async (req, res) => {
    try {
      const { query } = req.query;
  
      if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
      }
  
      // Perform the search
      const items = await Item.find({ 
        name: { $regex: query, $options: 'i' } // Case-insensitive partial match
      });
  
      // If no exact matches, find suggestions
      let suggestions = [];
      if (items.length === 0) {
        suggestions = await Item.find({
          name: { $regex: query, $options: 'i' }
        }).limit(5); // Limit to top 5 suggestions
      }
  
      res.status(200).json({ items, suggestions });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Get item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit item
router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    item.totalAmount = item.baseAmount - (item.discount || 0);
    await item.save();
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
