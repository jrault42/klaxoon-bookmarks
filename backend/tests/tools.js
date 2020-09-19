'use strict';

const config = require('../config/config');
const mongo = require('../api/database');

module.exports =
{
  openDB () {
    return mongo.connect(config.test.mongo);
  },

  clearDB () {
    return mongo.db.dropDatabase();
  },

  closeDB () {
    return mongo.db.close();
  }
};
