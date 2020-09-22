/**
 * various helper function for controller
 */
'use strict';

const bunyan = require('bunyan');
const log = bunyan.createLogger({name: 'klaxoon-bookmarks controller'});
const dbHelper = require('../helpers/dbHelper');

module.exports = {
  async getBookmarks () {
	log.debug('getBookmarks');
	return dbHelper.findInDB('bookmarks', {}).toArray();
  },

  async getBookmark (id) {
	log.debug('getBookmark');
	return;
  }
};
