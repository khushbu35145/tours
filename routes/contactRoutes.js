const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const memoryStore = require('../data/inMemoryStore');
const { protectAdmin } = require('../middleware/authMiddleware');

router.post('/', async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      const newCnt = {
        _id: `cnt-${Date.now()}`,
        ...req.body,
        status: 'new',
        createdAt: new Date().toISOString()
      };
      memoryStore.contacts.unshift(newCnt);
      return res.status(201).json({
        success: true,
        message: 'Message sent successfully! We will get back to you shortly.',
        data: newCnt
      });
    }

    const contact = new Contact(req.body);
    const saved = await contact.save();
    res.status(201).json({
      success: true,
      message: 'Message sent successfully! We will get back to you shortly.',
      data: saved
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', protectAdmin, async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      return res.json(memoryStore.contacts);
    }
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protectAdmin, async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      const cnt = memoryStore.contacts.find(c => c._id === req.params.id);
      if (!cnt) return res.status(404).json({ message: 'Message not found' });
      cnt.status = req.body.status;
      return res.json(cnt);
    }

    const updated = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Message not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      const idx = memoryStore.contacts.findIndex(c => c._id === req.params.id);
      if (idx === -1) return res.status(404).json({ message: 'Message not found' });
      memoryStore.contacts.splice(idx, 1);
      return res.json({ message: 'Message deleted' });
    }

    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
