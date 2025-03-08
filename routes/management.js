const express = require("express");
const adminRoute = express.Router();

const Pasajero = require("../models/Pasajero");

adminRoute.get('/pasajero', () => {
    Pasajero.find()
       .then(pasajeros => {
            res.json(pasajeros);
        })
       .catch(err => res.status(400).json('Error:'+ err));
})