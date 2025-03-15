const express = require("express");
const router = express.Router();

router.use(express.json());

const rutaAdmin = require("./management");

router.get('/home', async (req, res) => {
    try {
        res.status(200).send(req.body);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.use('/admin', rutaAdmin);

module.exports = router;