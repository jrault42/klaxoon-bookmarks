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
   * @param offset
   * @param limit
   * @returns {Promise<{nbTotal, bookmarks: (*|T[]|string)}>}
   */
  async getBookmarks (offset, limit) {
    log.debug('getBookmarks');

    const nbTotal = await dbHelper.findInDB('bookmarks', {}).count();
    const bookmarks = await dbHelper.findInDB('bookmarks', {}).skip(offset).limit(limit).toArray();
    return {
      nbTotal,
      bookmarks
    };
  },

  /**
   * Get a specific bookmark
   * @param id
   * @returns {Promise<*|Promise>}
   */
  async getBookmark (id) {
    log.debug('getBookmark');
    const bookmark = await dbHelper.findOneInDB('bookmarks', {_id: dbHelper.ObjectId(id)});
    if (!bookmark) {
      const error = new Error('Bookmark not found');
      error.code = 404;
      throw error;
    }
    return bookmark;
  },

  /**
   *
   * @param encodedUrl
   * @param mongoid
   * @returns {Promise<void>}
   */
  async createBookmark (encodedUrl, mongoid) {
    log.debug('createBookmark');

    const urlToGet = encodedUrl.includes('vimeo.com')
      ? `https://vimeo.com/api/oembed.json?url=${encodedUrl}`
      : `https://www.flickr.com/services/oembed/?format=json&url=${encodedUrl}`;

    const json = await (await fetch(urlToGet)).json();
    if (!json) { throw new Error('Error while getting content with oembed.'); }

    const {type, title, author_name, width, height} = json;

    let bookmarkObject;
    if (json.type === 'video') {
      const html = json.html;
      const slicedHtml = html.slice(html.indexOf('https:'));
      bookmarkObject = {
        url: slicedHtml.slice(0, slicedHtml.indexOf('"')),
        type,
        title,
        author: author_name,
        createDate: moment().format('L'),
        width,
        height,
        duration: json.duration,
        keyWords: []
      };
    } else if (json.type === 'photo') {
      bookmarkObject = {
        url: json.url,
        type,
        title,
        author: author_name,
        createDate: moment().format('L'),
        width,
        height,
        keyWords: []
      };
    } else {
      log.error('Trying to add unknown type bookmark; doing nothing.');
      return;
    }
    // Insert in DB
    if (mongoid) {
      bookmarkObject._id = dbHelper.ObjectId(mongoid);
    }
    await dbHelper.insertInDB('bookmarks', bookmarkObject);
  },

  /**
   *
   * @param id
   * @param keyWords
   * @param overwrite
   * @returns {Promise<void>}
   */
  async updateBookmark (id, keyWords, overwrite) {
    const bookmark = await dbHelper.findOneInDB('bookmarks', {_id: dbHelper.ObjectId(id)});
    if (!bookmark) {
      const error = new Error('Bookmark not found');
      error.code = 404;
      throw error;
    }
    return dbHelper.updateInDB('bookmarks', {
      _id: dbHelper.ObjectId(id)},
      {$set: {
        keyWords: overwrite ? keyWords : bookmark.keyWords.concat(keyWords)
      }}
      );
  },

  /**
   *
   * @param id
   * @returns {Promise<void>}
   */
  async deleteBookmark (id) {
    const bookmark = await dbHelper.findOneInDB('bookmarks', {_id: dbHelper.ObjectId(id)});
    if (!bookmark) {
      const error = new Error('Bookmark not found');
      error.code = 404;
      throw error;
    }
    return dbHelper.removeInDB('bookmarks', {_id: dbHelper.ObjectId(id)});
  }
};
