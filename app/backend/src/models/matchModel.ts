import { IMatch, IMatchModelCreate } from '../Interfaces/IMatch';
import { IMatchModel } from '../Interfaces/IMatchModel';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class MatchesModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  async findInProgress(inProgress: boolean): Promise<IMatch[] | null> {
    const matches = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  async finishedMatches(id: IMatch['id']): Promise<IMatch | null> {
    const match = await this.model.findByPk(id);
    if (!match) return null;
    match.inProgress = false;
    await match.save();
    return match;
  }

  async updateMatches(id: IMatch['id'], homeTeamGoals: number, awayTeamGoals: number) {
    const match = await this.model.findByPk(id);
    if (!match) return null;
    match.homeTeamGoals = homeTeamGoals;
    match.awayTeamGoals = awayTeamGoals;
    await match.save();
    return match;
  }

  async createMatch(body: IMatchModelCreate): Promise<IMatch> {
    const match = await this.model.create({ ...body, inProgress: true });
    return match;
  }
}
