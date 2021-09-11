//IMPORT
const mongoose = require("mongoose");

//SCHEMA
const questionSchema = new mongoose.Schema({
  //STRUCTURE
  Question: {
    type: String,
  },
  Options: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "option",
    },
  ],
});

//MODEL
const Question = mongoose.model("question", questionSchema);
module.exports = Question;
