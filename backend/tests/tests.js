/* global describe it before after */
'use strict';
const chai = require('chai');
const supertest = require('supertest');
const expect = chai.expect;
const appjs = require('../app.js');
const tools = require('./tools');

let agent;

describe('Bookmarks tests:', function () {
  let objectID1, objectID2;

  before(() => {
    return tools.openDB()
      .then(tools.clearDB)
      .then(() => appjs.init(8082, true))
      .then(app => {
        agent = supertest.agent(app.app);
        objectID1 = tools.ObjectID();
        objectID2 = tools.ObjectID();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // after(() => {
  //   tools.closeDB();
  // });

  it('Get the welcome API method', () => {
    return agent
      .get('/')
      .expect(200)
      .then(res => {
        expect(res).to.exists;
      });
  });

  /*
  GET: fail to read (empty DB)
   */
  it('should fail to get all bookmarks: no bookmark', () => {
    return agent
      .get('/bookmarks')
      .expect(200)
      .then(res => {
        expect(res.body.bookmarks).to.be.empty;
      });
  });

  /*
   POST: add
   */
  it('should create the bookmark', () => {
    return agent
      .post(`/bookmarks?mongoid=${objectID1}`)
      .send({bookmarkUrl: 'http%3A%2F%2Fflickr.com%2Fphotos%2Fbees%2F2362225867%2F'})
      .expect(201);
  });

  /*
  GET all: 1 bookmark
 */
  it('should get all bookmarks: 1 bookmark', () => {
    return agent
      .get('/bookmarks')
      .expect(200)
      .then(res => {
        expect(res.body.bookmarks.length).to.equal(1);
      });
  });

  /*
 PUT: update
 */
  it('should update the bookmark keywords', () => {
    return agent
      .put(`/bookmarks/${objectID1}`)
      .send(['toto'])
      .expect(200);
  });

  /*
  GET
  */
  it('should get the updated bookmark : has good keyWords', () => {
    return agent
      .get(`/bookmarks/${objectID1}`)
      .expect(200)
      .then(res => {
        expect(res.body.keyWords[0]).equal('toto');
        expect(res.body.keyWords.length).equal(1);
      });
  });

  /*
  PUT: update
  */
  it('should update the bookmark keywords', () => {
    return agent
      .put(`/bookmarks/${objectID1}?overwrite=false`)
      .send(['titi'])
      .expect(200);
  });

  /*
  GET
  */
  it('should get the updated bookmark: has good keyWords', () => {
    return agent
      .get(`/bookmarks/${objectID1}`)
      .expect(200)
      .then(res => {
        expect(res.body.keyWords[0]).equal('toto');
        expect(res.body.keyWords.length).equal(2);
        expect(res.body.keyWords[1]).equal('titi');
      });
  });

  /*
  PUT: update
  */
  it('should update the bookmark keywords', () => {
    return agent
      .put(`/bookmarks/${objectID1}?overwrite=true`)
      .send(['tata'])
      .expect(200);
  });

  /*
  GET
  */
  it('should get the updated bookmark: has good keyWordsc', () => {
    return agent
      .get(`/bookmarks/${objectID1}`)
      .expect(200)
      .then(res => {
        expect(res.body.keyWords[0]).equal('tata');
        expect(res.body.keyWords.length).equal(1);
      });
  });

  /*
  DELETE
  */
  it('should delete the bookmark', () => {
    return agent
      .delete(`/bookmarks/${objectID1}`)
      .expect(204);
  });

  /*
  DELETE
  */
  it('should fail to delete: not good path: method not allowed', () => {
    return agent
      .delete(`/bookmarks/`)
      .expect(405);
  });
});
