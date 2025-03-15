const mongoose = require('mongoose');

const pasajeroSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shift: { type: String, required: true },
  location: { type: [String], default: [] },
  payments: {
    ene: { type: Boolean, default: false },
    feb: { type: Boolean, default: false },
    mar: { type: Boolean, default: false },
    abr: { type: Boolean, default: false },
    may: { type: Boolean, default: false },
    jun: { type: Boolean, default: false },
    jul: { type: Boolean, default: false },
    ago: { type: Boolean, default: false },
    sep: { type: Boolean, default: false },
    oct: { type: Boolean, default: false },
    nov: { type: Boolean, default: false },
    dic: { type: Boolean, default: false }
  }
});

const Pasajero = mongoose.model('Pasajero', pasajeroSchema);

module.exports = Pasajero;