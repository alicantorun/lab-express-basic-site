const express = require("express");
const app = express();
const config = require("./config");
const rateLimiter = require("./middleware/rateLimiter");
const requestLogger = require("./middleware/requestLogger");
const requestMetrics = require("./middleware/requestMetrics");

app.use(requestLogger);
app.use(requestMetrics);
app.use(rateLimiter(config.rateLimit));
app.use(express.static("public"));

app.get("/metrics", function(req, res) {
  res.json({
    totalRequests: requestMetrics.metrics.totalRequests,
    perRouteRequestCounts: requestMetrics.metrics.routes,
    uptimeSeconds: process.uptime(),
  });
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/about", function(req, res) {
  res.sendFile(__dirname + "/views/about.html");
});

app.listen(3000, () => console.log("port 3000 is listenning"));
