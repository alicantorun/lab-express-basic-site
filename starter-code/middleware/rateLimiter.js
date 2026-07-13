const config = require("../config");

const buckets = new Map();

function rateLimiter(options) {
  const maxRequests = options && typeof options.maxRequests === "number" ? options.maxRequests : config.rateLimit.maxRequests;
  const windowMs = options && typeof options.windowMs === "number" ? options.windowMs : config.rateLimit.windowMs;

  return function(req, res, next) {
    const now = Date.now();
    const key = req.ip || req.connection.remoteAddress || "unknown";
    const current = buckets.get(key) || [];
    const recent = current.filter(function(timestamp) {
      return now - timestamp < windowMs;
    });

    if (recent.length >= maxRequests) {
      res.status(429).json({ error: "Too many requests" });
      return;
    }

    recent.push(now);
    buckets.set(key, recent);
    next();
  };
}

module.exports = rateLimiter;
