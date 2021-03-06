/**
 * @author Jeanne Rault <jeanne.rault@telecomsante.com>
 * @Date 08/04/2020
 */
'use strict';

const bunyan = require('bunyan');
const log = bunyan.createLogger({name: 'klaxoon-bookmarks controller'});
const helper = require('../helpers/helper');
const expressHelper = require('../helpers/expressHelper');

const bookmarksController = {
  /**
   *
   * @param req
   * @param res
   */
  home (req, res) {
    res.send('You are at the home of the klaxoon-bookmarks API!');
  },

  /**
   *
   * @param req
   * @param res
   */
  async getBookmarks (req, res) {
    log.debug('getBookmarks');
    try {
      const offset = req.swagger.params.offset.value;
      const limit = req.swagger.params.limit.value;
      const bookmarks = await helper.getBookmarks(offset, limit);
      res.send(bookmarks);
    } catch (err) {
      expressHelper.handleError(err, res);
    }
  },

  /**
   *
   * @param req
   * @param res
   */
  async getBookmark (req, res) {
    log.debug('getBookmark');
    try {
      const id = req.swagger.params.id.value;
      const bookmark = await helper.getBookmark(id);
      res.send(bookmark);
    } catch (err) {
      expressHelper.handleError(err, res);
    }
  },

    /**
   *
   * @param req
   * @param res
   * @returns {Promise<T | never>}
   */
  async createBookmark (req, res) {
    log.debug('createBookmark');
    try {
      const bookmarkUrl = req.swagger.params.body.raw.bookmarkUrl;
      const mongoid = req.swagger.params.mongoid && req.swagger.params.mongoid.value;
      await helper.createBookmark(bookmarkUrl, mongoid);
      res.status(201);
      res.end();
    } catch (err) {
      expressHelper.handleError(err, res);
    }
  },

  /**
   *
   * @param req
   * @param res
   * @returns {Promise<T | never>}
   */
  async updateBookmark (req, res) {
    log.debug('updateBookmark');
    try {
      const id = req.swagger.params.id.value;
      const body = req.swagger.params.body.value;
      const overwrite = req.swagger.params.overwrite && req.swagger.params.overwrite.value;

      await helper.updateBookmark(id, body, overwrite);
      res.status(200);
      res.end();
    } catch (err) {
      expressHelper.handleError(err, res);
    }
  },

    /**
   *
   * @param req
   * @param res
   * @returns {Promise<T | never>}
   */
  async deleteBookmark (req, res) {
    log.debug('deleteBookmark');
    try {
      const id = req.swagger.params.id.value;
      await helper.deleteBookmark(id);
      res.status(204);
      res.end();
    } catch (err) {
      expressHelper.handleError(err, res);
    }
  }
};

// Export it
module.exports = bookmarksController;
