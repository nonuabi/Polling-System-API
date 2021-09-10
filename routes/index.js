//IMPORTS
const express = require("express");
const router = express.Router();

//ROUTERS
router.use("/questions", require("./questions"));

module.exports = router;
