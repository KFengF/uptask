const express = require("express");
const routes = require("./routes");

const app = express();

app.use("/", routes());

app.listen(5000, function() {
  console.log("app running in port 5000");
});
