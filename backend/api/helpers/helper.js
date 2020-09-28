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
    const videos = await dbHelper.findInDB('videos', {}).toArray();
    const photos = await dbHelper.findInDB('photos', {}).toArray();
    return videos.concat(photos)
  },

  /**
   *
   * @param id
   * @param type
   * @returns {Promise<*|Promise>}
   */
  async getBookmark (id, type) {
    log.debug('getBookmark');
    return dbHelper.findOneInDB(`${type}s`, {_id: dbHelper.ObjectId(id)})
  },

  /**
   *
   * @param encodedUrl
   * @returns {Promise<void>}
   */
  async createBookmark (encodedUrl) {
    log.debug('createBookmark');

    const urlToGet = encodedUrl.includes('vimeo.com')
      ? `https://vimeo.com/api/oembed.json?url=${encodedUrl}`
      : `https://www.flickr.com/services/oembed/?format=json&url=${encodedUrl}`;

    const json = await (await fetch(urlToGet)).json();
    if (!json) { throw new Error('Error while getting content with oembed.') }

    const {type, title, author_name, width, height} = json;

    if (json.type === 'video') {
      const html = json.html;
      const slicedHtml = html.slice(html.indexOf('https:'));
      await dbHelper.insertInDB('videos', {
        url: slicedHtml.slice(0, slicedHtml.indexOf('\"')),
        type,
        title,
        author: author_name,
        createDate: moment().format('L'),
        width,
        height,
        duration: json.duration,
        keyWords: []
    })
    } else if (json.type === 'photo') {
      await dbHelper.insertInDB('photos', {
        url: json.url,
        type,
        title,
        author: author_name,
        createDate: moment().format('L'),
        width,
        height,
        keyWords: []
      })
    } else {
      log.error('Trying to add unknown type bookmark; doing nothing.');
    }
  },

  /**
   *
   * @param id
   * @param type
   * @param keyWords
   * @returns {Promise<void>}
   */
  async updateBookmark (id, type, keyWords) {
    const bookmark = await dbHelper.findOneInDB(`${type}s`, {_id: dbHelper.ObjectId(id)});
    return dbHelper.updateInDB(`${type}s`, {
      _id: dbHelper.ObjectId(id)},
      {$set: {
        keyWords: keyWords.concat(bookmark.keyWords)
      }}
      )
  },

  /**
   *
   * @param id
   * @param type
   * @returns {Promise<void>}
   */
  async deleteBookmark (id, type) {
    return dbHelper.removeInDB(`${type}s`, {_id: dbHelper.ObjectId(id)});
  }
};
