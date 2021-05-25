// Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import nock from 'nock';

import * as ReactVA from '../src';

const { Should, expect } = chai;

chai.use(chaiHttp);

describe('First test', () => {
  it('Should assert true to be true', () => {
    expect(true).to.be.true;
  });
});
