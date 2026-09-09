const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  siteName: { type: String, default: "Safaré Journeys" },
  tagline: { type: String, default: "Journeys That Become Memories" },
  phone: { type: String, default: "+91 98765 43210" },
  email: { type: String, default: "concierge@safarejourneys.com" },
  address: { type: String, default: "Safaré House, C-Scheme, Jaipur, Rajasthan 302001, India" },
  whatsapp: { type: String, default: "+919876543210" },
  heroTitle: { type: String, default: "Authentic Luxury India Travel" },
  heroSubtitle: { type: String, default: "Curated bespoke expeditions across royal Rajasthan, tranquil Kerala backwaters, and alpine Kashmir." },
  statsTravelers: { type: String, default: "15,000+" },
  statsTours: { type: String, default: "1,200+" },
  statsRating: { type: String, default: "4.9/5" },
  statsYears: { type: String, default: "18+" }
}, {
  timestamps: true
});

module.exports = mongoose.model('Setting', settingSchema);
