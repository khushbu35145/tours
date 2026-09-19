const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const memoryStore = require('../data/inMemoryStore');
const { protectAdmin } = require('../middleware/authMiddleware');

// @route   GET /api/categories
// @desc    Get all categories with subcategories
router.get('/', async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      return res.json(memoryStore.categories || []);
    }
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/categories/:id
// @desc    Get single category by id or slug
router.get('/:id', async (req, res) => {
  try {
    const key = req.params.id;

    if (!global.isMongoConnected) {
      const found = (memoryStore.categories || []).find(c => c._id === key || c.slug === key);
      if (!found) return res.status(404).json({ message: 'Category not found' });
      return res.json(found);
    }

    const category = await Category.findOne({
      $or: [{ slug: key }, { _id: key.match(/^[0-9a-fA-F]{24}$/) ? key : null }]
    });

    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/categories
// @desc    Create new main Category
router.post('/', protectAdmin, async (req, res) => {
  try {
    const { name, slug, description, image, badge, status, subcategories } = req.body;
    const finalSlug = (slug || name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')).trim();

    if (!finalSlug) {
      return res.status(400).json({ message: 'Category name and slug are required.' });
    }

    if (!global.isMongoConnected) {
      const existing = (memoryStore.categories || []).find(c => c.slug === finalSlug);
      if (existing) {
        return res.status(400).json({ message: `A category with slug "${finalSlug}" already exists. Please choose another name or slug.` });
      }

      const newCat = {
        _id: `cat-${Date.now()}`,
        name,
        slug: finalSlug,
        description: description || '',
        image: image || '',
        badge: badge || '',
        status: status || 'active',
        subcategories: subcategories || [],
        createdAt: new Date().toISOString()
      };
      memoryStore.categories.unshift(newCat);
      return res.status(201).json(newCat);
    }

    // Check duplicate in Mongo
    const existing = await Category.findOne({ slug: finalSlug });
    if (existing) {
      return res.status(400).json({ message: `A category with slug "${finalSlug}" already exists. Please choose another name or slug.` });
    }

    const category = new Category({
      name,
      slug: finalSlug,
      description,
      image,
      badge,
      status,
      subcategories: subcategories || []
    });

    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A category with this name or slug already exists.' });
    }
    res.status(400).json({ message: error.message || 'Error saving category' });
  }
});

// @route   PUT /api/categories/:id
// @desc    Update main Category
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const key = req.params.id;

    if (!global.isMongoConnected) {
      const index = (memoryStore.categories || []).findIndex(c => c._id === key || c.slug === key);
      if (index === -1) return res.status(404).json({ message: 'Category not found' });
      memoryStore.categories[index] = { ...memoryStore.categories[index], ...req.body };
      return res.json(memoryStore.categories[index]);
    }

    const updatedCategory = await Category.findByIdAndUpdate(key, req.body, { new: true, runValidators: true });
    if (!updatedCategory) return res.status(404).json({ message: 'Category not found' });
    res.json(updatedCategory);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A category with this name or slug already exists.' });
    }
    res.status(400).json({ message: error.message || 'Error updating category' });
  }
});

// @route   DELETE /api/categories/:id
// @desc    Delete main Category
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const key = req.params.id;

    if (!global.isMongoConnected) {
      const index = (memoryStore.categories || []).findIndex(c => c._id === key || c.slug === key);
      if (index === -1) return res.status(404).json({ message: 'Category not found' });
      memoryStore.categories.splice(index, 1);
      return res.json({ message: 'Category deleted successfully' });
    }

    const deletedCategory = await Category.findByIdAndDelete(key);
    if (!deletedCategory) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/categories/:id/subcategories
// @desc    Add subcategory to a category
router.post('/:id/subcategories', protectAdmin, async (req, res) => {
  try {
    const key = req.params.id;
    const { name, slug, description, image, status } = req.body;
    const finalSlug = (slug || name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')).trim();

    if (!global.isMongoConnected) {
      const cat = (memoryStore.categories || []).find(c => c._id === key || c.slug === key);
      if (!cat) return res.status(404).json({ message: 'Category not found' });
      
      const newSub = {
        _id: `sub-${Date.now()}`,
        name,
        slug: finalSlug,
        description: description || '',
        image: image || '',
        status: status || 'active'
      };
      if (!cat.subcategories) cat.subcategories = [];
      cat.subcategories.push(newSub);
      return res.status(201).json(cat);
    }

    const category = await Category.findById(key);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    category.subcategories.push({
      name,
      slug: finalSlug,
      description,
      image,
      status
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/categories/:id/subcategories/:subId
// @desc    Update a subcategory
router.put('/:id/subcategories/:subId', protectAdmin, async (req, res) => {
  try {
    const { id, subId } = req.params;

    if (!global.isMongoConnected) {
      const cat = (memoryStore.categories || []).find(c => c._id === id || c.slug === id);
      if (!cat) return res.status(404).json({ message: 'Category not found' });
      const sub = (cat.subcategories || []).find(s => s._id === subId || s.slug === subId);
      if (!sub) return res.status(404).json({ message: 'Subcategory not found' });
      Object.assign(sub, req.body);
      return res.json(cat);
    }

    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    const subcategory = category.subcategories.id(subId);
    if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });

    subcategory.set(req.body);
    await category.save();
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/categories/:id/subcategories/:subId
// @desc    Delete a subcategory
router.delete('/:id/subcategories/:subId', protectAdmin, async (req, res) => {
  try {
    const { id, subId } = req.params;

    if (!global.isMongoConnected) {
      const cat = (memoryStore.categories || []).find(c => c._id === id || c.slug === id);
      if (!cat) return res.status(404).json({ message: 'Category not found' });
      const index = (cat.subcategories || []).findIndex(s => s._id === subId || s.slug === subId);
      if (index === -1) return res.status(404).json({ message: 'Subcategory not found' });
      cat.subcategories.splice(index, 1);
      return res.json(cat);
    }

    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    category.subcategories.pull({ _id: subId });
    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
