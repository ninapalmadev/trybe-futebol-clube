import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import ITeams from '../Interfaces/Teams/ITeams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamModel from '../models/teamModel';

export default class TeamService {
  private teamModel: ITeamsModel;

  constructor() {
    this.teamModel = new TeamModel();
  }

  async findAll(): Promise<ServiceResponse<ITeams[]>> {
    const teams = await this.teamModel.findAll();
    return {
      status: 'SUCCESSFUL',
      data: teams,
    };
  }

  async findById(id: number): Promise<ServiceResponse<ITeams>> {
    const team = await this.teamModel.findById(id);
    if (!team) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'Team not found' } };
    }
    return {
      status: 'SUCCESSFUL',
      data: team,
    };
  }
}
