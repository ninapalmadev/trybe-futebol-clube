import * as chai from 'chai';
import * as sinon from 'sinon';
import { app } from '../app';
// @ts-ignore
import chaiHttp = require('chai-http');
import Team from '../database/models/SequelizeTeams'
import { mockAllTeams, mockIdTeam } from './mocks/team.mocks';

chai.use(chaiHttp);
const { expect } = chai;


describe('Teams', () => {
  it('should return all teams', async () => {
    const stub = sinon.stub(Team, 'findAll').resolves(mockAllTeams as any);
    const response = await chai.request(app).get('/teams');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockAllTeams);
    stub.restore();
  });

  it('should return a team by id', async () => {
    const stub = sinon.stub(Team, 'findByPk').resolves(mockIdTeam as any);
    const response = await chai.request(app).get('/teams/5');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockIdTeam);
    stub.restore();
  });
});

