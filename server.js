const express = require("express");
const app = express();
const path = require("path");

//App dependencies
require("./config/app-constants");
require("./config/models");
require("./config/routes")(app);

const mongoose = global.mongoose;
mongoose.connect(
  "mongodb://localhost:27017/mydb",
  { useNewUrlParser: true },
  err => {
    if (!err) {
      console.log("Connected to mydb");
    } else {
      console.log(err);
    }
  }
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(1000, () => {
  console.log("Server running on port " + 1000);
});
