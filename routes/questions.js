const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

//CREATE NEW QUESTION ROUTER
router.post("/create", questionController.createQuestion);
//GET LIST OF QUESTION  ROUTER
router.get("/:id", questionController.fetchQuestions);
//CREATE NEW OPTION IN QUESTION ROUTER
router.post("/:id/options/create", questionController.createOption);
//DELETE QUESTION ROUTER
router.delete("/:id/delete", questionController.deleteQuestion);
module.exports = router;
