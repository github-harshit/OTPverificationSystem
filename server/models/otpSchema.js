const mongoose = require('mongoose');

// OTP schema
const otpSchema = new mongoose.Schema({
  sessionIdentifier: {
    type: String,
    required: true,
    unique: true, // Each session/request should have a unique identifier
  },
  otp: {
    type: String,
    required: true,
  },
  expirationTime: {
    type: Date,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false, // Set to true when OTP is successfully verified
  },
  timestamp: {
    type: Date,
    default: Date.now, // Timestamp of OTP generation
  },
});


const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
