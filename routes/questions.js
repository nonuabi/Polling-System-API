//import
const express = require("express");
//import
const router = express.Router();
//import
const questionController = require("../controllers/questionController");

//routes
router.post("/create", questionController.createQuestion);
router.get("/:id", questionController.fetchQuestions);
router.post("/:id/options/create", questionController.createOption);
router.delete("/:id/delete", questionController.deleteQuestion);
module.exports = router;
