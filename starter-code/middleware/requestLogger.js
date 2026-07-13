function requestLogger(req, res, next) {
  const start = Date.now();

  res.on("finish", function() {
    const durationMs = Date.now() - start;
    console.log(`${req.method} ${req.path} ${res.statusCode} ${durationMs}ms`);
  });

  next();
}

module.exports = requestLogger;
