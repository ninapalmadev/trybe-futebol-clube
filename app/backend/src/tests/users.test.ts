import * as chai from 'chai';
import * as sinon from 'sinon';
import { app } from '../app';
// @ts-ignore
import chaiHttp = require('chai-http');
import User from '../database/models/SequelizeUser';
import { 
  userMock,
  tokenMock,
  userWithoutEmail,
  userWithoutPassword
} from './mocks/user.mocks';

chai.use(chaiHttp);
const { expect } = chai;

describe('Users', () => {
  beforeEach(() => {
    sinon.restore();
  });
  it('should return a error when without email ', async () => {
    sinon.stub(User, 'findAll').returns(userWithoutEmail as any);
    const res = await chai.request(app).post('/login');
    expect(res.status).to.equal(400);
    expect(res.body).to.deep.equal({"message": "All fields must be filled" });
  });
  it('should return a error when without password ', async () => {
    sinon.stub(User, 'findAll').returns(userWithoutPassword as any);
    const res = await chai.request(app).post('/login');
    expect(res.status).to.equal(400);
    expect(res.body).to.deep.equal({"message": "All fields must be filled" });
  });
});
