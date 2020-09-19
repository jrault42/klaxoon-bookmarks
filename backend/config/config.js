
'use strict';

const config = {
  domain: process.env.DOMAIN || 'http://localhost',

  express: {
    headers: {
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'POST, GET, DELETE, PUT',
      'Access-Control-Allow-Credentials': 'true'
    },
    allowedOrigins: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',')
      : []
  },

  // MongoDB configuration
  mongodb: (process.env.MONGODB || 'mongodb://localhost'),
  port: 8080,
  test: {
    mongo: process.env.MONGODBTEST,
    loglevel: 'error'
  }
};

module.exports = config;
