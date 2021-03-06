/**
 * various helper function for controller
 */
'use strict';

const db = require('../database.js');

module.exports = {

  /**
   *
   * @param coll
   * @param search
   * @param action
   * @param options
   */
  updateInDB (coll, search, action, options) {
    return db.collection(coll).updateOne(search, action, options);
  },

  /**
   *
   * @param coll
   * @param document
   * @param options
   * @returns {*|{document}|Promise}
   */
  insertInDB (coll, document, options) {
    return db.collection(coll).insertOne(document, options);
  },

  /**
   *
   * @param coll
   * @param options
   * @returns {Cursor|FindOperatorsUnordered|FindOperatorsOrdered|*|T|{}}
   */
  findInDB (coll, options) {
    return db.collection(coll).find(options);
  },

  /**
   *
   * @param coll
   * @param options
   * @returns {Promise}
   */
  findOneInDB (coll, options) {
    return db.collection(coll).findOne(options);
  },

  /**
   *
   * @param coll
   * @param options
   * @returns {UnorderedBulkOperation|*}
   */
  removeInDB (coll, options) {
    return db.collection(coll).deleteOne(options);
  },

  ObjectId (id) {
    return db.ObjectID(id);
  }
};
