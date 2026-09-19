const express = require('express');
const router = express.Router();
const Package = require('../models/Package');
const memoryStore = require('../data/inMemoryStore');
const { protectAdmin } = require('../middleware/authMiddleware');

// @route   GET /api/packages
router.get('/', async (req, res) => {
  try {
    const { category, subcategory, search, featured, sort, includeSubcategories } = req.query;

    if (!global.isMongoConnected) {
      let list = [...memoryStore.packages];

      if (category && category !== 'all') {
        const catLower = category.trim().toLowerCase();
        list = list.filter(p => (p.category || '').trim().toLowerCase() === catLower);
      }

      if (subcategory && subcategory.trim()) {
        const subLower = subcategory.trim().toLowerCase();
        list = list.filter(p => {
          const pkgSub = (p.subcategory || '').trim().toLowerCase();
          const pkgTitle = (p.title || '').trim().toLowerCase();
          const pkgSlug = (p.slug || '').trim().toLowerCase();

          // Exclude mismatched packages (e.g. title/slug is 'masuri' when subcategory query is 'uttrakhand')
          if ((pkgTitle.includes('masuri') || pkgSlug.includes('masuri') || pkgTitle.includes('mussoorie')) && subLower !== 'masuri' && subLower !== 'mussoorie') {
            return false;
          }

          if ((pkgTitle.includes('uttrakhand') || pkgSlug.includes('uttrakhand') || pkgTitle.includes('uttarakhand')) && (subLower === 'masuri' || subLower === 'mussoorie')) {
            return false;
          }

          if (pkgSub) {
            return pkgSub === subLower;
          }
          // If subcategory not set on package, fallback match title or slug
          return pkgTitle === subLower || pkgSlug === subLower || pkgTitle.includes(subLower) || pkgSlug.includes(subLower);
        });
      }

      if (featured === 'true') {
        list = list.filter(p => p.isFeatured);
      }

      if (search) {
        const s = search.toLowerCase();
        list = list.filter(p => 
          (p.title || '').toLowerCase().includes(s) || 
          (p.route || '').toLowerCase().includes(s) || 
          (p.description || '').toLowerCase().includes(s) ||
          (p.subcategory || '').toLowerCase().includes(s)
        );
      }

      if (sort === 'price-low') list.sort((a, b) => a.priceVal - b.priceVal);
      if (sort === 'price-high') list.sort((a, b) => b.priceVal - a.priceVal);
      if (sort === 'duration') list.sort((a, b) => b.daysCount - a.daysCount);
      return res.json(list);
    }

    let query = {};

    if (category && category !== 'all') {
      query.category = { $regex: `^${category.trim()}$`, $options: 'i' };
    }

    if (subcategory && subcategory.trim()) {
      const subLower = subcategory.trim().toLowerCase();
      query.$and = [
        {
          $or: [
            { subcategory: { $regex: `^${subcategory.trim()}$`, $options: 'i' } },
            { 
              $and: [
                { $or: [{ subcategory: { $exists: false } }, { subcategory: '' }, { subcategory: null }] },
                { $or: [{ title: { $regex: subcategory.trim(), $options: 'i' } }, { slug: { $regex: subcategory.trim(), $options: 'i' } }] }
              ]
            }
          ]
        }
      ];

      // Exclude mismatched titles
      if (subLower !== 'masuri' && subLower !== 'mussoorie') {
        query.$and.push({ title: { $not: { $regex: 'masuri|mussoorie', $options: 'i' } } });
      }
      if (subLower === 'masuri' || subLower === 'mussoorie') {
        query.$and.push({ title: { $not: { $regex: 'uttrakhand|uttarakhand', $options: 'i' } } });
      }
    }

    if (featured === 'true') query.isFeatured = true;

    if (search) {
      const searchCondition = [
        { title: { $regex: search, $options: 'i' } },
        { route: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { subcategory: { $regex: search, $options: 'i' } }
      ];
      if (query.$and) {
        query.$and.push({ $or: searchCondition });
      } else if (query.$or) {
        query = {
          $and: [
            { category: query.category },
            { $or: query.$or },
            { $or: searchCondition }
          ]
        };
      } else {
        query.$or = searchCondition;
      }
    }

    let sortOptions = { createdAt: -1 };
    if (sort === 'price-low') sortOptions = { priceVal: 1 };
    if (sort === 'price-high') sortOptions = { priceVal: -1 };
    if (sort === 'duration') sortOptions = { daysCount: -1 };

    const packages = await Package.find(query).sort(sortOptions);
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/packages/:id
router.get('/:id', async (req, res) => {
  try {
    const key = req.params.id;

    if (!global.isMongoConnected) {
      const found = memoryStore.packages.find(p => p.slug === key || p._id === key);
      if (!found) return res.status(404).json({ message: 'Package not found' });
      return res.json(found);
    }

    const packageItem = await Package.findOne({
      $or: [{ slug: key }, { _id: key.match(/^[0-9a-fA-F]{24}$/) ? key : null }]
    });

    if (!packageItem) return res.status(404).json({ message: 'Package not found' });
    res.json(packageItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/packages
router.post('/', protectAdmin, async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      const newPkg = {
        _id: `pkg-${Date.now()}`,
        slug: req.body.slug || req.body.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        ...req.body
      };
      memoryStore.packages.unshift(newPkg);
      return res.status(201).json(newPkg);
    }

    const newPackage = new Package(req.body);
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/packages/:id
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const key = req.params.id;

    if (!global.isMongoConnected) {
      const index = memoryStore.packages.findIndex(p => p._id === key || p.slug === key);
      if (index === -1) return res.status(404).json({ message: 'Package not found' });
      memoryStore.packages[index] = { ...memoryStore.packages[index], ...req.body };
      return res.json(memoryStore.packages[index]);
    }

    const updatedPackage = await Package.findByIdAndUpdate(key, req.body, { new: true, runValidators: true });
    if (!updatedPackage) return res.status(404).json({ message: 'Package not found' });
    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/packages/:id
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const key = req.params.id;

    if (!global.isMongoConnected) {
      const index = memoryStore.packages.findIndex(p => p._id === key || p.slug === key);
      if (index === -1) return res.status(404).json({ message: 'Package not found' });
      memoryStore.packages.splice(index, 1);
      return res.json({ message: 'Package removed successfully' });
    }

    const deletedPackage = await Package.findByIdAndDelete(key);
    if (!deletedPackage) return res.status(404).json({ message: 'Package removed successfully' });
    res.json({ message: 'Package removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
