const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const memoryStore = require('../data/inMemoryStore');
const { protectAdmin } = require('../middleware/authMiddleware');

router.post('/', async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      const newEnq = {
        _id: `enq-${Date.now()}`,
        ...req.body,
        status: 'new',
        createdAt: new Date().toISOString()
      };
      memoryStore.enquiries.unshift(newEnq);
      return res.status(201).json({
        success: true,
        message: 'Enquiry submitted successfully! Our luxury concierge will contact you within 2 hours.',
        data: newEnq
      });
    }

    const enquiry = new Enquiry(req.body);
    const saved = await enquiry.save();
    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully! Our luxury concierge will contact you within 2 hours.',
      data: saved
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', protectAdmin, async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      return res.json(memoryStore.enquiries);
    }
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protectAdmin, async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      const enq = memoryStore.enquiries.find(e => e._id === req.params.id);
      if (!enq) return res.status(404).json({ message: 'Enquiry not found' });
      enq.status = req.body.status;
      return res.json(enq);
    }

    const updated = await Enquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Enquiry not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      const idx = memoryStore.enquiries.findIndex(e => e._id === req.params.id);
      if (idx === -1) return res.status(404).json({ message: 'Enquiry not found' });
      memoryStore.enquiries.splice(idx, 1);
      return res.json({ message: 'Enquiry deleted' });
    }

    const deleted = await Enquiry.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Enquiry not found' });
    res.json({ message: 'Enquiry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
