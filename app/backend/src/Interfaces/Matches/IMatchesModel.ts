import { IMatches } from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]> | null;
  findInProgress(inProgress: boolean): Promise<IMatches[] | null>;
  // findFinished(): Promise<IMatches[]> | null;
}
