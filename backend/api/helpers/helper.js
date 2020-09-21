/**
 * various helper function for controller
 */
'use strict';

const bunyan = require('bunyan');
const log = bunyan.createLogger({name: 'klaxoon-bookmarks controller'});
const dbHelper = require('../helpers/dbHelper');

module.exports = {
  getBookmarks () {
    return await dbHelper.findInDB('bookmarks', {})
  }

  getBookmark (id) {
  	return 
  }
};
