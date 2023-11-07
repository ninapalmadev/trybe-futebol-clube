import MatchesModel from '../models/matchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch, IMatchModelCreate } from '../Interfaces/IMatch';
import { IMatchModel } from '../Interfaces/IMatchModel';
import TeamsModel from '../models/teamModel';
import { ITeamsModel } from '../Interfaces/ITeamsModel';

export default class MatchesService {
  private matchesModel: IMatchModel;
  private teamsModel: ITeamsModel;

  constructor() {
    this.matchesModel = new MatchesModel();
    this.teamsModel = new TeamsModel();
  }

  async findAll(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchesModel.findAll();
    if (!matches) {
      return { status: 'NOT_FOUND', data: { message: 'Matches not found' } };
    }
    return { status: 'SUCCESSFUL', data: matches };
  }

  async findInProgress(inProgress: boolean): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchesModel.findInProgress(inProgress);
    if (!matches) {
      return { status: 'NOT_FOUND', data: { message: 'Matches not found' } };
    }
    return { status: 'SUCCESSFUL', data: matches };
  }

  async finishedMatches(id: IMatch['id']): Promise<ServiceResponse<{ message: string }>> {
    await this.matchesModel.finishedMatches(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  async updateMatches(id: IMatch['id'], homeTeamGoals: number, awayTeamGoals: number):
  Promise<ServiceResponse<{ message: string }>> {
    await this.matchesModel.updateMatches(id, homeTeamGoals, awayTeamGoals);
    return { status: 'SUCCESSFUL', data: { message: 'Updated matches' } };
  }

  async createMatch(body: IMatchModelCreate): Promise<ServiceResponse<IMatch>> {
    const match = await this.matchesModel.createMatch(body);
    if (match.awayTeamId === match.homeTeamId) {
      return { status: 'UNPROCESSABLE_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }

    const homeTeam = await this.teamsModel.findById(match.homeTeamId);
    const awayTeam = await this.teamsModel.findById(match.awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    return { status: 'CREATED', data: match };
  }
}
