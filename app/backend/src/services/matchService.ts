import MatchesModel from '../models/matchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/IMatch';
import { IMatchModel } from '../Interfaces/IMatchModel';

export default class MatchesService {
  private matchesModel: IMatchModel;

  constructor() {
    this.matchesModel = new MatchesModel();
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
}
