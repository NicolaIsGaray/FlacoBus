const express = require("express");
const router = express.Router();

router.use(express.json());

const rutaAdmin = require("./management");
// const rutaPasajeros = require("./pasajeros");

router.get('/home', async (req, res) => {
    try {
        res.status(200).send(req.body);
    } catch (error) {
        res.status(500).send(error);
    }
})

// router.use('/admin', rutaAdmin);
// router.use('/pasajeros', rutaPasajeros);

module.exports = router;