/**
 * various helper function for controller
 */
'use strict';

const bunyan = require('bunyan');
const log = bunyan.createLogger({ name: 'klaxoon-bookmarks express helper' });

module.exports = {

  /**
   *
   * @param err
   * @param res
   */
  handleError (err, res) {
    log.info('handleError, err:', err);
    if (err === 403 || err.code === 403) {
      return this.sendAuthorizedError(res, false);
    }

    if (err === 404 || err.code === 404) {
      return this.sendError(res, 404, 'Not found.');
    }
    if (!err.name || err.name.toString() !== 'MongoError') return this.sendError(res, err.code || 500, err.message || 'Unknown error.');
    else return this.sendError(res, 500, err);
  },

  /**
   *
   * @param res
   * @param code
   * @param message
   */
  sendError (res, code, message) {
    log.error(code, message);
    res.status(code);
    res.json({message: message.toString()});
    res.end();
  },

  /**
   *
   * @param res
   */
  sendAuthorizedError (res) {
    this.sendError(res, 403, 'You are not authorized to do this');
  }
};
