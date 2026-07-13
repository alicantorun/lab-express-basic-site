const metrics = {
  totalRequests: 0,
  routes: {},
};

function requestMetrics(req, res, next) {
  metrics.totalRequests += 1;
  metrics.routes[req.path] = (metrics.routes[req.path] || 0) + 1;
  next();
}

requestMetrics.metrics = metrics;

module.exports = requestMetrics;
