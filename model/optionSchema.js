const mongoose = require("mongoose");

// OPTION SCHEMA
const optionSchema = new mongoose.Schema({
  Question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "question",
  },
  Text: {
    type: String,
  },
  Vote: {
    type: Number,
    default: 0,
  },
  link_Vote: {
    type: String,
  },
});

// CREATE MODEL
const Option = mongoose.model("option", optionSchema);

module.exports = Option;
