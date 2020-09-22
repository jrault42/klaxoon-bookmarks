/**
 * various helper function for controller
 */
'use strict';

const bunyan = require('bunyan');
const log = bunyan.createLogger({name: 'klaxoon-bookmarks controller'});
const dbHelper = require('../helpers/dbHelper');

module.exports = {
  getBookmarks () {
	log.debug('getBookmarks');
	return dbHelper.findInDB('bookmarks', {}).toArray();
  },

  getBookmark (id) {
	log.debug('getBookmark');
	return;
  }
};
