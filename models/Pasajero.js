const mongoose = require("mongoose");

const userData = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  hasPayed: {
    type: Boolean,
    default: false
  },
  month: {
    type: String,
    required: true,
    enum: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  },
  shift: {
    type: String,
    required: true,
    enum: ["Mañana", "Tarde"]
  },
  ubication: {
    type: String,
    required: true,
    enum: ["Ciudad", "Colonia"]
  }
});

module.exports = mongoose.model("Pasajero", userData);
