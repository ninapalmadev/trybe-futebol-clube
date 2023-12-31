import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeams } from '../Interfaces/ITeams';
import { ITeamsModel } from '../Interfaces/ITeamsModel';
import TeamsModel from '../models/teamModel';

export default class TeamsService {
  private teamsModel: ITeamsModel;

  constructor() {
    this.teamsModel = new TeamsModel();
  }

  async findAll(): Promise<ServiceResponse<ITeams[]>> {
    const teams = await this.teamsModel.findAll();
    return {
      status: 'SUCCESSFUL',
      data: teams,
    };
  }

  async findById(id: number): Promise<ServiceResponse<ITeams | null>> {
    const team = await this.teamsModel.findById(id);
    if (!team) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'Team not found' },
      };
    }

    return {
      status: 'SUCCESSFUL',
      data: team,
    };
  }
}
