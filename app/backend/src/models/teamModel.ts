import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeams } from '../Interfaces/ITeams';
import { ITeamsModel } from '../Interfaces/ITeamsModel';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeams[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findById(id: number): Promise<ITeams | null> {
    const team = await this.model.findByPk(id);
    return team;
  }
}
