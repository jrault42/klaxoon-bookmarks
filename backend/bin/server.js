/**
 * @author Jeanne Rault <jeanne.rault@telecomsante.com>
 * @date 21/02/2017
 */
'use strict';

const bunyan = require('bunyan');
const log = bunyan.createLogger({name: 'klaxoon-bookmarks server'});
const db = require('../api/database');
const config = require('../config/config');
const app = require('../app');

// opening connection to db
db.connect(config.mongodb)
  .then(() => {
    log.info('[ ----------- klaxoon-bookmarks-backend ----------- ]');
  })
  .then(() => {
    return app.init();
  })
  .then(app => app.app.listen(config.port))
  .then(() => {
    log.info('Listening on port', config.port);
  })
  .catch(e => {
    log.error(e);
    process.exit(1);
  });

