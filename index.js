//initialize port

//import
const express = require("express");
const connectDB = require("./config/mongoose");
const port = process.env.PORT || 8080;
const app = express();
connectDB();

// JSON CONVERT REQUEST BODY TO JSON
app.use(express.urlencoded({ extended: true }));

// DEFINE ROUTES
app.use("/", require("./routes/index"));

//check for error
app.listen(port, function (err) {
  if (err) {
    console.log("Error in running server");
    return;
  }
  console.log("Server is up and running at port", port);
});
