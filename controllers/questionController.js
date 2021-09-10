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

//creating Option ROUTE
module.exports.createOpt = function (req, res) {
  var quest = Question.findOne({ _id: req.params.id });

  if (quest) {
    const Question = quest._id;
    const Text = req.body.Text;

    var option = Option.create({
      Question,
      Text,
    });
    var link_Vote =
      req.protocol +
      "://" +
      req.headers.host +
      "/options/" +
      option._id +
      "/add_vote";
    option.link_Vote = link_Vote;
    option.save();

    //push the id
    quest.options.push(option._id);
    quest.save();

    //succesfull create
    console.log("Option Has Been Successfully  Added!");
    res.data = option;
    return;
  } else {
    //error
    console.log("Question not Found!");
    return res.redirect("back");
  }
};
