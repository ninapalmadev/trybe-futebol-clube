import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/IMatch';
import { IMatchModel } from '../Interfaces/IMatchModel';
import { ITeamsModel } from '../Interfaces/ITeamsModel';
import { ILeaderBoard } from '../Interfaces/ILeaderBoard';
import MatchModel from '../models/matchModel';
import TeamsModel from '../models/teamModel';

export default class LeaderBoardService {
  private matchModel: IMatchModel;
  private teamModel: ITeamsModel;

  constructor() {
    this.matchModel = new MatchModel();
    this.teamModel = new TeamsModel();
  }

  public async leaderBoard(local: string): Promise<ServiceResponse<ILeaderBoard[]>> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll();
    const leaderBoard = teams.map((team) => {
      const { id, teamName } = team;

      const teamMatches = (matches ?? []).filter((match) =>
        (match.homeTeamId === id || match.awayTeamId === id) && match.inProgress === false);
      return LeaderBoardService.teamPoints(teamName, teamMatches, id, local);
    });

    const sortedLeaderBoard = LeaderBoardService.sortLeaderBoard(leaderBoard);
    return {
      status: 'SUCCESSFUL',
      data: sortedLeaderBoard,
    };
  }

  public static totalPoints(match: IMatch[], id: number, local: string): number {
    const result = match.reduce((acc, curr) => {
      const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = curr;
      if (homeTeamId === id && local === 'home') {
        if (homeTeamGoals > awayTeamGoals) return acc + 3;
        if (homeTeamGoals === awayTeamGoals) return acc + 1;
      }
      if (awayTeamId === id && local === 'away') {
        if (awayTeamGoals > homeTeamGoals) return acc + 3;
        if (homeTeamGoals === awayTeamGoals) return acc + 1;
      }
      return acc;
    }, 0);
    return result;
  }

  public static totalVictories(match: IMatch[], id: number, local: string): number {
    const result = match.reduce((acc, curr) => {
      const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = curr;
      if (homeTeamId === id && local === 'home' && homeTeamGoals > awayTeamGoals) return acc + 1;
      if (awayTeamId === id && local === 'away' && homeTeamGoals < awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return result;
  }

  public static totalDraws(match: IMatch[], id: number, local: string): number {
    const result = match.reduce((acc, curr) => {
      const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = curr;
      if (homeTeamId === id && local === 'home' && homeTeamGoals === awayTeamGoals) return acc + 1;
      if (awayTeamId === id && local === 'away' && homeTeamGoals === awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return result;
  }

  public static totalLosses(match: IMatch[], id: number, local: string): number {
    const result = match.reduce((acc, curr) => {
      const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = curr;
      if (homeTeamId === id && local === 'home' && homeTeamGoals < awayTeamGoals) return acc + 1;
      if (awayTeamId === id && local === 'away' && homeTeamGoals > awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return result;
  }

  public static goalsFavor(match: IMatch[], id: number, local: string): number {
    const result = match.reduce((acc, curr) => {
      const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = curr;
      if (homeTeamId === id && local === 'home') return acc + homeTeamGoals;
      if (awayTeamId === id && local === 'away') return acc + awayTeamGoals;
      return acc;
    }, 0);
    return result;
  }

  public static goalsOwn(match: IMatch[], id: number, local: string): number {
    const result = match.reduce((acc, curr) => {
      const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = curr;
      if (homeTeamId === id && local === 'home') return acc + awayTeamGoals;
      if (awayTeamId === id && local === 'away') return acc + homeTeamGoals;
      return acc;
    }, 0);
    return result;
  }

  public static totalGames(match: IMatch[], id: number, local: string): number {
    const result = match.reduce((acc, curr) => {
      const { homeTeamId, awayTeamId } = curr;
      if (homeTeamId === id && local === 'home') return acc + 1;
      if (awayTeamId === id && local === 'away') return acc + 1;
      return acc;
    }, 0);
    return result;
  }

  public static teamPoints(name: string, matches: IMatch[], id: number, local: string):
  ILeaderBoard {
    const points = LeaderBoardService.totalPoints(matches, id, local);
    const totalGames = LeaderBoardService.totalGames(matches, id, local);
    const goalsFavor = LeaderBoardService.goalsFavor(matches, id, local);
    const goalsOwn = LeaderBoardService.goalsOwn(matches, id, local);
    return {
      name,
      totalPoints: points,
      totalGames,
      totalVictories: LeaderBoardService.totalVictories(matches, id, local),
      totalDraws: LeaderBoardService.totalDraws(matches, id, local),
      totalLosses: LeaderBoardService.totalLosses(matches, id, local),
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: Number(((points / (totalGames * 3)) * 100).toFixed(2)),
    };
  }

  public static sortLeaderBoard(leaderBoard: ILeaderBoard[]): ILeaderBoard[] {
    return leaderBoard.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      return 0;
    });
  }
}
