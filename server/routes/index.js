const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send({ response: "Blattgruen.eu - NodeJS Webserver" }).status(200);
});

module.exports = router;


