const mongoose = require('mongoose');

const accessCodeSchema = new mongoose.Schema({
  code: { type: String, required: true }
});

const AccessCode = mongoose.model('AccessCode', accessCodeSchema);

module.exports = AccessCode;