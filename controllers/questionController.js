const Question = require("../model/questionSchema");
const Option = require("../model/optionSchema");

//CREATE QUESTION CONTROLLER
module.exports.createQuestion = async function (req, res) {
  const { question } = req.body;
  if (question) {
    // CREATING QUESTION
    const response = await Question.create({ Question: question });
    if (response) {
      return res.status(200).send(response);
    } else {
      return res.status(400).send(err);
    }
  } else {
    return res.status(406).send("please provide some context");
  }
};

// FETCH LIST OF QUESTION CONTROLLER
module.exports.fetchQuestions = async function (req, res) {
  const paramsContent = req.params.id;
  if (paramsContent) {
    // FINDING QUESTION
    const response = await Question.findOne({ _id: req.params.id }).populate(
      "Options"
    );
    if (response) {
      return res.status(200).send(response);
    } else {
      return res.status(500).send("Server Error/Question not found");
    }
  } else {
    return res.status(406).send("Please provider id in params");
  }
};

// CREATE OPTION CONTROLER
module.exports.createOption = async function (req, res) {
  // FINDING QUESTION BY ID
  const paramsContent = req.params.id;
  if (paramsContent) {
    let question_response = await Question.findOne({ _id: req.params.id });
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
          return res.status(500).send("Option Not Created");
        }
      } else {
        return res.status(406).send("Please Provide text");
      }
    } else {
      return res.status(404).send("Question Not Found");
    }
  } else {
    return res.status(406).send("Please Provider id in params");
  }
};

// DETELE QUESTION CONTROLLER
module.exports.deleteQuestion = async function (req, res) {
  console.log("delete req");
  const paramsContent = req.params.id;
  if (paramsContent) {
    const response = await Question.findOne({ _id: req.params.id }).populate(
      "Options"
    );
    console.log("response :: ", response);
    if (response) {
      let check = false;
      if (response.Options.length > 0) {
        // CHECKING IS ANY OPTION IS VOTED OR NOT
        for (let option of response.Options) {
          if (option.Vote > 0) {
            check = true;
          }
        }
      }
      console.log("check :: ", check);
      // IF ANY OF THE OPTION IS VOTED THEN THE QUESTION IS NOT DELETABLE
      if (check) {
        return res.status(405).send("Not Allowed to delete ");
      }
      // DELETING OPTIONS
      await Option.deleteMany({ Question: response._id });
      // DELETING QEUESTION
      await Question.deleteOne({ _id: response._id });
      return res.status(200).send("Question is delted Successfully");
    } else {
      return res.status(500).send("Sever Error / Question Not Found");
    }
  } else {
    return res.status(406).send("Please provide id in params");
  }
};
