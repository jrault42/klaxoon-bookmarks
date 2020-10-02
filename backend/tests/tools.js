'use strict';

const config = require('../config/config');
const Database = require('../api/database');

module.exports =
{
  openDB () {
    return Database.connect(config.testmongodb);
  },

  clearDB () {
    return Database.db.dropDatabase();
  },

  closeDB () {
    return Database.db.close();
  },

  ObjectID () {
    return Database.ObjectID();
  }
};
