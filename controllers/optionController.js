const Option = require("../model/optionSchema");

// DELETE OPTION CONTROLLER
module.exports.deleteOption = async function (req, res) {
  let response = await Option.findOne({ _id: req.params.id });
  if (response) {
    if (response.Vote > 0) {
      return res
        .status(405)
        .send("Not Allowed To Delete Because it has votes in it");
    }
    await Option.deleteOne({ _id: req.params.id });
    return res.status(200).send("Option Deleted Successfully");
  } else {
    return res.status(500).send("Server Error / Option Not Found");
  }
};
