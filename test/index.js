// Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import nock from 'nock';

import ReactVA from '../src';

const { Should, expect } = chai;

chai.use(chaiHttp);

describe('First test', () => {
  it('Should assert true to be true', () => {
    expect(true).to.be.true;
  });
});

// const expect = require('chai').expect;
// const nock = require('nock');

// const getUser = require('../index').getUser;
// const response = require('./response');

// describe('Get User tests', () => {
//   beforeEach(() => {
//     nock('https://api.github.com')
//       .get('/users/octocat')
//       .reply(200, response);
//   });

//   it('Get a user by username', () => getUser('octocat')
//     .then((response) => {
//       // expect an object back
//       expect(typeof response).to.equal('object');

//       // Test result of name, company and location for the response
//       expect(response.name).to.equal('The Octocat');
//       expect(response.company).to.equal('GitHub');
//       expect(response.location).to.equal('San Francisco');
//     }));
// });
