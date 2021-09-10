const Question = require("../model/questionSchema");

//Create question route
module.exports.create_ques = async function (req, res) {
  const { question } = req.body;
  Question.create({ Question: question })
    .then((response) => {
      return res.status(200).send(response);
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
};
