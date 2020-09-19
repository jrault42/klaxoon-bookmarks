'use strict';

const bunyan = require('bunyan');
const mongo = require('mongodb');
const log = bunyan.createLogger({ name: 'klaxoon-bookmarks database' });

/**
 * @lends Database
 */
const Database = {
  db: null,
  ObjectID: mongo.ObjectID,
  bucket: null,

  /*
  * Connect to mongo
  */
  connect (url) {
    return mongo.MongoClient.connect(url)
      .then(db => {
        this.db = db;
      })
      .catch(err => {
        log.info('An error occured while connecting to mongo:', err);
      });
  },

  /**
   * Direct access to Mongo
   * @see http://docs.mongodb.org/manual/reference/method/js-collection/
   */
  collection () {
    return this.db.collection.apply(this.db, arguments);
  }
};

// Export it
module.exports = Database;
