// Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const should = chai.should();

chai.use(chaiHttp);
