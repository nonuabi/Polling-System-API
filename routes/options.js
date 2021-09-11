const express = require("express");
const router = express.Router();

const optionController = require("../controllers/optionController");

router.delete("/:id/delete", optionController.deleteOption);

module.exports = router;
