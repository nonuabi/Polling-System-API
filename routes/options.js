const express = require("express");
const router = express.Router();

// CONTROLLER
const optionController = require("../controllers/optionController");

// ADD_VOTE TO THE OPTION ROUTER
router.post("/:id/add_vote", optionController.addVote);
// DELETE OPTION ROUTER
router.delete("/:id/delete", optionController.deleteOption);

module.exports = router;
