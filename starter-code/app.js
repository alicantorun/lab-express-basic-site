const express = require("express");
const app = express();

app.use(express.static("public"));

// app.get("/", (req, res) => res.send("Hello World!"));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/about", function(req, res) {
  res.sendFile(__dirname + "/views/about.html");
});

app.listen(3000, () => console.log("port 3000 is listenning"));
