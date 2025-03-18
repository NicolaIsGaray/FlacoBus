const express = require("express");
const adminRoute = express.Router();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");

const AccessCode = require("../models/Gen");
const Pasajero = require("../models/Pasajero");

dotenv.config();

const VALID = process.env.VALIDATOR;
const GENERATOR = process.env.GEN;
const AUTH = process.env.AUTHER;
const KEY = process.env.KEY_INDEX;

const MONGO_U = process.env.MONGO_USR;
const MONGO_P = process.env.MONGO_PSWRD;

adminRoute.use(
  session({
    secret: KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://${MONGO_U}:${MONGO_P}@dataregister.nh3ts.mongodb.net/?retryWrites=true&w=majority&appName=DataRegister`,
      collectionName: "sessions",
      ttl: 14 * 24 * 60 * 60,
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 1,
    },
  })
);

// Endpoint para validar el código de acceso
adminRoute.post(VALID, async (req, res) => {
  const { code } = req.body;

  try {
    const validCode = await AccessCode.findOne({ code });

    if (validCode) {
      req.session.isAuthenticated = true;

      req.session.save((err) => {
        if (err) {
          console.error("Error al guardar la sesión:", err);
          return res.status(500).json({ message: "Error al guardar la sesión" });
        }

        res.status(200).json({ message: "Código válido" });
      });
    } else {
      res.status(400).json({ message: "Código incorrecto" });
    }
  } catch (error) {
    console.error("Error al validar el código:", error);
    res.status(500).json({ message: "Error al validar el código" });
  }
});

function isAuthenticated(req, res, next) {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.status(401).json({ message: "No autenticado" });
  }
}

function generateAccessCode() {
  return Math.floor(1000 + Math.random() * 9000); // Código de 4 dígitos
}

adminRoute.post(GENERATOR, async (req, res) => {
  const code = generateAccessCode();

  try {
    await AccessCode.create({ code });
    console.log(`Nuevo código generado: ${code}`);
    res.status(200).json({ message: "Código generado correctamente" });
  } catch (error) {
    console.error("Error al guardar el código:", error);
    res.status(500).json({ message: "Error al generar el código" });
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

adminRoute.get("/pasajero", async (req, res) => {
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

adminRoute.post('/update-pasajero/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID del pasajero es requerido" });
  }

  try {
    const pasajero = await Pasajero.findByIdAndUpdate(id, { name }, { new: true });
    if (!pasajero) {
      return res.status(404).json({ message: "Pasajero no encontrado" });
    }
    res.status(200).json(pasajero);
  } catch (error) {
    console.error("Error al actualizar el pasajero:", error);
    res.status(500).send(error);
  }
});

adminRoute.delete("/pasajero/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({ message: "ID del pasajero es requerido" });
  }

  try {
    const deletedPasajero = await Pasajero.findByIdAndDelete(id);
    if (!deletedPasajero) {
      return res.status(404).json({ message: "Pasajero no encontrado" });
    }
    res.status(200).json(deletedPasajero);
  } catch (error) {
    console.error("Error al eliminar el pasajero:", error);
    res.status(500).send(error);
  }
})

adminRoute.put("/pasajero/:id/pagos", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { month, hasPaid } = req.body;

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

  if (typeof hasPaid !== "boolean") {
    return res.status(400).json({
      message: "El campo hasPaid debe ser un booleano (true o false)",
    });
  }

  try {
    const pasajero = await Pasajero.findById(id);
    if (!pasajero) {
      return res.status(404).json({ message: "Pasajero no encontrado" });
    }

    pasajero.payments[month] = hasPaid;
    await pasajero.save();

    res.status(200).json({ message: "Pago actualizado", pasajero });
  } catch (error) {
    console.error("Error al actualizar el pago:", error); // Depuración
    res.status(500).json({ message: "Error al actualizar el pago", error });
  }
});

module.exports = adminRoute;
