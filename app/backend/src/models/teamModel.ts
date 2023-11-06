import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import ITeam from '../Interfaces/Teams/ITeams';
import SequelizeTeams from '../database/models/SequelizeTeams';

export default class Teams implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);
    return team;
  }
}
