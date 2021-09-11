//IMPORTS
const express = require("express");
const router = express.Router();

//ROUTERS MIDDLEWARES
router.use("/questions", require("./questions"));
router.use("/options", require("./options"));

module.exports = router;
