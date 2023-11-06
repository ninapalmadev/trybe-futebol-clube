import * as chai from 'chai';
import * as sinon from 'sinon';
import { app } from '../app';
// @ts-ignore
import chaiHttp = require('chai-http');
import Team from '../database/models/SequelizeTeam';
import { mockAllTeams, mockIdTeam } from './mocks/team.mocks';

chai.use(chaiHttp);
const { expect } = chai;

describe('Teams', () => {
  it('should return all teams', async () => {
    const stub = sinon.stub(Team, 'findAll').returns(mockAllTeams as any);
    const res = await chai.request(app).get('/teams');
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(mockAllTeams);
    stub.restore();
  })

  it('should return a team by id', async () => {
    const stub = sinon.stub(Team, 'findByPk').returns(mockIdTeam as any);
    const res = await chai.request(app).get('/teams/1');
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(mockIdTeam);
    stub.restore();
  })
});

