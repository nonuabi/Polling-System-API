const Option = require("../model/optionSchema");

// ADD VOTE IN OPTION CONTROLLER
module.exports.addVote = async function (req, res) {
  // FINDING OPTION BY ID
  let response = await Option.findOne({ _id: req.params.id });
  if (response) {
    //   INCREMENTING VOTE BY 1
    response.Vote += 1;
    await response.save();
    return res.status(200).send(response);
  } else {
    return res.status(500).send("Server Error / Option Not Found");
  }
};

// DELETE OPTION CONTROLLER
module.exports.deleteOption = async function (req, res) {
  // FIDNING OPTION BY ID
  let response = await Option.findOne({ _id: req.params.id });
  if (response) {
    if (response.Vote > 0) {
      return res
        .status(405)
        .send("Not Allowed To Delete Because it has votes in it");
    }
    // DELETE OPTION
    await Option.deleteOne({ _id: req.params.id });
    return res.status(200).send("Option Deleted Successfully");
  } else {
    return res.status(500).send("Server Error / Option Not Found");
  }
};
