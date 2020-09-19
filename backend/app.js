const app = require('express')();
const middleware = require('swagger-express-mw');
const config = require('./config/config');

module.exports =
{
  init: (port, test) => {
    return new Promise((resolve, reject) => {
      const swaggerConfig = {
        appRoot: __dirname
      };

      app.use((req, res, next) => {
        // Set headers
        res.set(config.express.headers);
        // Set CORS header
        let origin = req.headers.origin;
        if (config.express.allowedOrigins.indexOf(origin) !== -1) res.setHeader('Access-Control-Allow-Origin', origin);
        next();
      });

      // Initialize Swagger
      middleware.create(swaggerConfig, (err, swaggerExpress) => {
        if (err) return reject(err);
        swaggerExpress.register(app);
        return resolve({app: app});
      });
    });
  }
};
