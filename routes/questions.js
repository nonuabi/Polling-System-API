//import
const express = require("express");
//import
const router = express.Router();
//import
const questionController = require("../controllers/questionController");

//routes
router.post("/create", questionController.create_ques);
router.post("/:id/options/create", questionController.createOpt);
module.exports = router;
