const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', '/PlantsPlanet', '/', {
      target: "Https://awshttps.shop",
      changeOrigin: true,
    })
  );
};