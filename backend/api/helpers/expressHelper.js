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
      if (err.message === 'only 2 periods by mode') {
        return this.sendAuthorizedError(res, true);
      }
      return this.sendAuthorizedError(res, false);
    }
    if (err.toString().indexOf('Invalid URI') !== -1) return this.sendError(res, 422, 'Invalid URI');
    if (!err.name || err.name.toString() !== 'MongoError') return this.sendError(res, err.code || 500, err.message || 'Unknown error.');
    else return this.sendError(res, 500, err);
  },

  /**
   *
   * @param res
   * @param data
   * @param message
   */
  sendData (res, data, message) {
    log.info(message, data);
    if (data) res.json(data);
    res.end();
  },

  /**
   *
   * @param res
   * @param message
   */
  sendMessage (res, message) {
    log.info(message);
    res.json({message: message.toString()});
    res.end();
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
