const express = require("express");
const adminRoute = express.Router();
const session = require('express-session');
const dotenv = require('dotenv');

const AccessCode = require("../models/Gen");
const Pasajero = require("../models/Pasajero");

dotenv.config();

const VALID = process.env.VALIDATOR;
const GENERATOR = process.env.GEN;
const AUTH = process.env.AUTHER;
const KEY = process.env.KEY_INDEX;

function isAuthenticated(req, res, next) {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.status(401).json({ message: 'No autenticado' });
  }
}

adminRoute.use(session({
  secret: KEY,
  resave: false, // No guardar la sesión si no se modifica
  saveUninitialized: true, // Guardar sesiones nuevas
  cookie: { 
    secure: false, // Usar `true` solo si estás usando HTTPS
    httpOnly: true, // La cookie no es accesible desde JavaScript
    maxAge: 1000 * 60 * 60 * 24 // La cookie expira en 1 día
  }
}));

// Generar un código de acceso aleatorio
function generateAccessCode() {
  return Math.floor(1000 + Math.random() * 9000); // Código de 4 dígitos
}

adminRoute.post(GENERATOR, async (req, res) => {
  const code = generateAccessCode();

  try {
    // Guardar el código en la base de datos
    await AccessCode.create({ code });
    console.log(`Nuevo código generado: ${code}`);
    res.status(200).json({ message: "Código generado correctamente" });
  } catch (error) {
    console.error("Error al guardar el código:", error);
    res.status(500).json({ message: "Error al generar el código" });
  }
});

// Endpoint para validar el código de acceso
adminRoute.post(VALID, async (req, res) => {
  const { code } = req.body;

  try {
    const validCode = await AccessCode.findOne({ code });

    if (validCode) {
      req.session.isAuthenticated = true; // Almacenar autenticación en la sesión
      res.status(200).json({ message: "Código válido" });
    } else {
      res.status(400).json({ message: "Código incorrecto" });
    }
  } catch (error) {
    console.error("Error al validar el código:", error);
    res.status(500).json({ message: "Error al validar el código" });
  }
});

adminRoute.get(AUTH, (req, res) => {
  
  if (req.session.isAuthenticated) {
    res.status(200).json({ isAuthenticated: true });
  } else {
    res.status(200).json({ isAuthenticated: false });
  }
});

adminRoute.get("/config", (req, res) => {
  res.json({
    validator: VALID,
    auther: AUTH,
  });
});

adminRoute.get("/pasajero", isAuthenticated, async (req, res) => {
  try {
    const pasajeros = await Pasajero.find();
    res.json(pasajeros);
  } catch (error) {
    console.error("Error al buscar el pasajero:", error);
    res.status(500).send(error);
  }
});

adminRoute.post("/add-pasajero", isAuthenticated, async (req, res) => {
  try {
    const { name, shift, location, payments } = req.body;

    const newPasajero = new Pasajero({
      name,
      shift,
      location,
      payments,
    });

    await newPasajero.save();
    res.status(200).send(newPasajero);
  } catch (error) {
    console.error("Error al guardar el pasajero:", error);
    res.status(400).send(error);
  }
});

adminRoute.put("/pasajero/:id/pagos", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { month, hasPaid } = req.body;

  // Validar que el mes sea válido
  const validMonths = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ];

  if (!validMonths.includes(month)) {
    return res.status(400).json({ message: "Mes no válido" });
  }

  // Validar que hasPaid sea un booleano
  if (typeof hasPaid !== "boolean") {
    return res
      .status(400)
      .json({
        message: "El campo hasPaid debe ser un booleano (true o false)",
      });
  }

  try {
    // Buscar al pasajero por su ID
    const pasajero = await Pasajero.findById(id);
    if (!pasajero) {
      return res.status(404).json({ message: "Pasajero no encontrado" });
    }

    pasajero.payments[month] = hasPaid;
    await pasajero.save();

    // Respuesta exitosa
    res.status(200).json({ message: "Pago actualizado", pasajero });
  } catch (error) {
    console.error("Error al actualizar el pago:", error); // Depuración
    res.status(500).json({ message: "Error al actualizar el pago", error });
  }
});

module.exports = adminRoute;
