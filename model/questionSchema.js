//IMPORT
const mongoose = require("mongoose");

//SCHEMA
const questionSchema = new mongoose.Schema({
  //STRUCTURE
  Question: {
    type: String,
    required: true,
  },
  OPTIONS: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Option",
    },
  ],
});

//MODEL
const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
