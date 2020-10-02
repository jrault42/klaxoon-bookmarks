
'use strict';

const config = {
  domain: process.env.DOMAIN || 'http://localhost',
  port: '8080',

  express: {
    headers: {
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'POST, GET, DELETE, PUT',
      'Access-Control-Allow-Credentials': 'true'
    },
    allowedOrigins: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',')
      : ['http://localhost:3000']
  },

  // MongoDB configuration
  mongodb: 'mongodb://localhost:27017/bookmarks',
  testmongodb: 'mongodb://localhost:27017/bookmarks-test'
};

module.exports = config;
