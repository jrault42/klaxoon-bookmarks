/**
 * various helper function for controller
 */
'use strict';

const bunyan = require('bunyan');
const log = bunyan.createLogger({name: 'klaxoon-bookmarks controller'});
const dbHelper = require('../helpers/dbHelper');
const fetch = require('node-fetch');
const moment = require('moment');

moment.locale('fr');

module.exports = {
  /**
   *
   * @returns {Promise}
   */
  async getBookmarks () {
    log.debug('getBookmarks');
    return dbHelper.findInDB('bookmarks', {}).toArray();
  },

  /**
   *
   * @param id
   * @returns {Promise<*|Promise>}
   */
  async getBookmark (id) {
    log.debug('getBookmark');
    return dbHelper.findOneInDB('bookmarks', {_id: dbHelper.ObjectId(id)})
  },

  /**
   *
   * @param url
   * @returns {Promise<void>}
   */
  async createBookmark (url) {
    log.debug('createBookmark');

    const json = await (await fetch(url)).json();
    if (!json) { throw new Error('Error while getting content with oembed.') }

    await dbHelper.insertInDB('bookmarks', {
      json,
      createDate: moment().format('L'),
      keyWords: []
    })
  }
};
