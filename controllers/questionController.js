const Question = require("../model/questionSchema");
const Option = require("../model/optionSchema");
//Create question route
module.exports.create_ques = async function (req, res) {
  console.log("test create");
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
module.exports.createOpt = async function (req, res) {
  const question_response = await Question.findOne({ _id: req.params.id });
  console.log(question_response);
  if (question_response) {
    let question_id = question_response._id;
    let text = req.body.Text;
    if (text) {
      const option_response = await Option.create({
        Question: question_id,
        Text: text,
      });
      if (option_response) {
        var link_Vote =
          req.protocol +
          "://" +
          req.headers.host +
          "/options/" +
          option_response._id +
          "/add_vote";
        option_response.link_Vote = link_Vote;
        option_response.save();
        question_response.Options.push(option_response._id);
        question_response.save();
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
  // .then((response) => {
  //   const option_response = Option.create({
  //     Question: question_id,
  //     Text: text,
  //   });
  //   let link_Vote =
  //     req.protocol +
  //     "://" +
  //     req.headers.host +
  //     "/options/" +
  //     option_response._id;
  //   option_response.link_Vote = link_Vote;
  //   await option_response.save();
  //   console.log("check");
  //   Option.findOne({ _id: option_response._id })
  //     .then((response) => {
  //       return res.status(200).send(response);
  //     })
  //     .catch((error) => {
  //       return res.status(404).send(error);
  //     });
  // })
  // .catch((error) => {
  //   return res.status(500).send(error);
  // });

  // if (quest) {
  //   const Question = quest._id;
  //   const Text = req.body.Text;

  //   var option = Option.create({
  //     Question,
  //     Text,
  //   });
  //   var link_Vote =
  //     req.protocol +
  //     "://" +
  //     req.headers.host +
  //     "/options/" +
  //     option._id +
  //     "/add_vote";
  //   option.link_Vote = link_Vote;
  //   option.save();

  //   //push the id
  //   quest.options.push(option._id);
  //   quest.save();

  //   //succesfull create
  //   console.log("Option Has Been Successfully  Added!");
  //   res.data = option;
  //   return;
  // } else {
  //   //error
  //   console.log("Question not Found!");
  //   return res.redirect("back");
  // }
};
