import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]> | null;
  findInProgress(inProgress: boolean): Promise<IMatch[] | null>;
  finishedMatches(id: IMatch['id']): Promise<IMatch | null>
  updateMatches(id: IMatch['id'], homeTeam: number, awayTeam: number): Promise<IMatch | null>
  createMatch(body: IMatch): Promise<IMatch | null>;
}
