const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  destination: { type: String, required: true },
  travelDate: { type: String },
  duration: { type: String },
  adults: { type: String, default: "2 Adults" },
  children: { type: String, default: "0 Children" },
  travelStyle: { type: String, default: "Luxury Custom" },
  budget: { type: String, default: "₹50k - ₹1 Lakh" },
  specialRequests: { type: String },
  packageName: { type: String },
  status: { 
    type: String, 
    enum: ['new', 'contacted', 'confirmed', 'cancelled'], 
    default: 'new' 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Enquiry', enquirySchema);
