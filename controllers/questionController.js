const Question = require("../model/questionSchema");
const Option = require("../model/optionSchema");

//CREATE QUESTION CONTROLLER
module.exports.createQuestion = async function (req, res) {
  const { question } = req.body;
  // CREATE QUESTION
  const response = await Question.create({ Question: question });
  if (response) {
    return res.status(200).send(response);
  } else {
    return res.status(400).send(err);
  }
};

// FETCH LIST OF QUESTION CONTROLLER
module.exports.fetchQuestions = async function (req, res) {
  const response = await Question.findOne({ _id: req.params.id }).populate(
    "Options"
  );
  if (response) {
    return res.status(200).send(response);
  } else {
    return res.status(500).send("Server Error/Question not found");
  }
};

// CREATE OPTION CONTROLER
module.exports.createOption = async function (req, res) {
  // FINDING QUESTION BY ID
  const question_response = await Question.findOne({ _id: req.params.id });
  if (question_response) {
    let question_id = question_response._id;
    let text = req.body.Text;
    if (text) {
      // CREATE OPTION
      const option_response = await Option.create({
        Question: question_id,
        Text: text,
      });
      if (option_response) {
        let link_Vote =
          req.protocol +
          "://" +
          req.headers.host +
          "/options/" +
          option_response._id +
          "/add_vote";
        // UPDATING OPTION LINK VOTE
        option_response.link_Vote = link_Vote;
        await option_response.save();
        // PUSHING OPTIONS FROM QUESTION SCHEMA
        question_response.Options.push(option_response._id);
        await question_response.save();
        return res.status(200).send(option_response);
      } else {
        return res.status(500).send("Option is not created");
      }
    } else {
      return res.status(406).send("Please Provide text");
    }
  } else {
    return res.status(404).send("Question Not Found");
  }
};
