const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', '/PlantsPlanet', '/', {
      target: "http://ec2-52-78-9-20.ap-northeast-2.compute.amazonaws.com:8083/",
      changeOrigin: true,
    })
  );
};